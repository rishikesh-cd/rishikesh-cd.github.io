import { supabase } from './supabase';

export type StatEvent = 
    | 'visitor' 
    | 'email_click' 
    | 'call_click' 
    | 'whatsapp_click' 
    | 'github_click'
    | 'linkedin_click'
    | 'owner_access_attempt' 
    | 'owner_access_denied';

const getDeviceInfo = () => {
    if (typeof window === 'undefined') return {};
    const ua = navigator.userAgent;
    let browser = "Unknown";
    let os = "Unknown";

    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Edge")) browser = "Edge";

    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone")) os = "iOS";

    return {
        browser,
        os,
        device: /Mobile|Android|iPhone/i.test(ua) ? "Mobile" : "Desktop",
        screen_resolution: `${window.screen.width}x${window.screen.height}`
    };
};

export const trackStat = async (event: StatEvent) => {
    // 0. Check if owner mode is active
    if (typeof window !== 'undefined' && localStorage.getItem('is_owner') === 'true') {
        console.log(`[Stats] Owner mode active. Skipping: ${event}`);
        return;
    }

    // 1. Gather Basic Info (Synchronous)
    const deviceInfo = getDeviceInfo();
    const timestamp = new Date().toISOString();

    // 2. Start Background Location Fetch (Non-blocking)
    // We'll proceed with tracking even if this takes time
    const getLocation = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout
            
            const res = await fetch('https://freeipapi.com/api/json', { 
                signal: controller.signal 
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                return {
                    city: data.cityName || 'Unknown',
                    country: data.countryName || 'Unknown',
                    country_code: data.countryCode || '??'
                };
            }
        } catch (e) {
            // Silently fail, it's just metadata
        }
        return { city: 'Unknown', country: 'Unknown', country_code: '??' };
    };

    // Trigger tracking
    (async () => {
        const locationData = await getLocation();

        // 3. Supabase Tracking
        if (supabase) {
            const { error: supabaseError } = await supabase
                .from('portfolio_events')
                .insert([{ 
                    event_name: event,
                    ...locationData,
                    ...deviceInfo,
                    created_at: timestamp
                }]);
            
            if (supabaseError) {
                console.error('Track failed:', supabaseError.message);
            } else {
                console.log(`[Stats] Recorded: ${event}`);
            }
        }

        // 4. Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', event, {
                event_category: 'engagement',
                location: locationData.city,
                device: deviceInfo.device
            });
        }
    })();

    // 5. Local Feedback (Instant)
    if (typeof window !== 'undefined') {
        const key = `stat_${event}`;
        const current = parseInt(localStorage.getItem(key) || '0');
        localStorage.setItem(key, (current + 1).toString());
        
        if (event === 'visitor') {
            const hits = parseInt(localStorage.getItem('portfolio_hits_today') || '0');
            localStorage.setItem('portfolio_hits_today', (hits + 1).toString());
        }
    }
};
