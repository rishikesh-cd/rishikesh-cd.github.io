'use client';

import React from 'react';
import Link from 'next/link';
import { trackStat } from '@/lib/stats';

export default function FakePortalSection() {
    return (
        <section className="bg-background-light/30 border-t border-border/20 py-4 w-full">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">
                            System Status: Restricted Access Tier 1
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <span className="hidden md:block text-[10px] font-roboto-flex text-muted-foreground/40 uppercase tracking-widest">
                            Authorized Personnel Only
                        </span>
                        <Link 
                            href="/authorization/owner-access"
                            onClick={() => trackStat('owner_access_attempt')}
                            className="bg-transparent border border-primary/20 hover:border-primary/60 px-6 py-2 text-[11px] font-anton tracking-[0.2em] uppercase transition-all hover:bg-primary/5 active:scale-95"
                        >
                            FOR OWNER ONLY
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
