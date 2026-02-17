'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackStat } from '@/lib/stats';

function TrackerLogic() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const isOwnerParam = searchParams.get('is_owner');
        
        if (isOwnerParam === 'true') {
            localStorage.setItem('is_owner', 'true');
            console.log('[Stats] Owner mode activated via URL');
        }

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

        // Cleanup on unmount
        return () => {
            localStorage.removeItem('is_owner');
            console.log('[Stats] Owner mode deactivated on unmount');
        };
    }, [searchParams]);

    return null;
}

export default function VisitorTracker() {
    return (
        <Suspense fallback={null}>
            <TrackerLogic />
        </Suspense>
    );
}
