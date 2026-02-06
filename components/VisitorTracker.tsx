'use client';

import { useEffect } from 'react';
import { trackStat } from '@/lib/stats';

export default function VisitorTracker() {
    useEffect(() => {
        const trackVisit = async () => {
            const today = new Date().toISOString().split('T')[0];
            const sessionKey = `visited_${today}`;
            
            // Only count once per session per day to avoid inflating numbers
            if (!sessionStorage.getItem(sessionKey)) {
                try {
                    await trackStat('visitor');
                    sessionStorage.setItem(sessionKey, 'true');
                    console.log('Session tracked for:', today);
                } catch (e) {
                    console.error('Tracking failed', e);
                }
            }
        };

        trackVisit();
    }, []);

    return null;
}
