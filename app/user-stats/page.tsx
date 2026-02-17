'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Calendar, ChevronDown, Clock, Filter, Globe, MousePointer2, TrendingUp, Users } from 'lucide-react';

const PIN = process.env.NEXT_PUBLIC_STATS_PIN || '134679'; // Fallback to default if not set

const ActionPath = ({ data, dataKey, color, max, fill }: any) => {
    if (!data.length) return null;
    const points = data.map((d: any, i: number) => {
        const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
        const y = 100 - ((d[dataKey] || 0) / max) * 100;
        return `${x},${y}`;
    }).join(' ');

    if (fill) {
        const fillPoints = `0,100 ${points} 100,100`;
        return (
            <g>
                <path 
                    d={`M ${points.split(' ').map((p: string, i: number) => (i === 0 ? p : `L ${p}`)).join(' ')} L 100 100 L 0 100 Z`} 
                    fill={color} 
                    fillOpacity="0.2" 
                />
                <path 
                    d={`M ${points.split(' ').map((p: string, i: number) => (i === 0 ? p : `L ${p}`)).join(' ')}`} 
                    fill="none" 
                    stroke={color} 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
            </g>
        );
    }

    return (
        <path 
            d={`M ${points.split(' ').map((p: string, i: number) => (i === 0 ? p : `L ${p}`)).join(' ')}`} 
            fill="none" 
            stroke={color} 
            strokeWidth="1" 
            strokeDasharray="2 2"
            strokeLinecap="round" 
        />
    );
};

const LegendItem = ({ label, color }: { label: string; color: string }) => (
    <div className="flex items-center gap-2">
        <div className={cn("h-2 w-2 rounded-full", color)} />
        <span className="text-[9px] font-anton uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
);

export default function StatsPage() {
    const [pinEntry, setPinEntry] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [stats, setStats] = useState<{ date: string; visitors: number }[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [timeRange, setTimeRange] = useState('1W');
    const [isChartLoading, setIsChartLoading] = useState(false);
    const [recentEvents, setRecentEvents] = useState<any[]>([]);
    const [engagement, setEngagement] = useState({
        email: 0,
        phone: 0,
        whatsapp: 0,
        github: 0,
        linkedin: 0,
        ownerAccess: 0
    });
    const [statsSummary, setStatsSummary] = useState({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0
    });
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isFetchingGlobal, setIsFetchingGlobal] = useState(false);
    const [error, setError] = useState('');
    const [today, setToday] = useState('');

    const fetchGlobalStats = async () => {
        const supabaseClient = supabase;
        if (!supabaseClient) return;
        
        setIsFetchingGlobal(true);
        setIsChartLoading(true);
        try {
            const getCount = async (event: string) => {
                const { count } = await supabaseClient
                    .from('portfolio_events')
                    .select('*', { count: 'exact', head: true })
                    .eq('event_name', event);
                return count || 0;
            };

            const getTimeRangeCount = async (start: string) => {
                const { count } = await supabaseClient
                    .from('portfolio_events')
                    .select('*', { count: 'exact', head: true })
                    .eq('event_name', 'visitor')
                    .gte('created_at', start);
                return count || 0;
            };

            const now = new Date();
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
            
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0,0,0,0);
            
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

            const [v, e, p, w, g, l, o, cToday, cWeek, cMonth] = await Promise.all([
                getCount('visitor'),
                getCount('email_click'),
                getCount('call_click'),
                getCount('whatsapp_click'),
                getCount('github_click'),
                getCount('linkedin_click'),
                getCount('owner_access_attempt'),
                getTimeRangeCount(startOfToday),
                getTimeRangeCount(startOfWeek.toISOString()),
                getTimeRangeCount(startOfMonth.toISOString())
            ]);

            setEngagement({
                email: e,
                phone: p,
                whatsapp: w,
                github: g,
                linkedin: l,
                ownerAccess: o
            });

            setStatsSummary({
                today: cToday,
                thisWeek: cWeek,
                thisMonth: cMonth,
                total: v
            });

            // Timeline Fetching Logic
            let daysToFetch = 7;
            if (timeRange === '1D') daysToFetch = 1;
            else if (timeRange === '1W') daysToFetch = 7;
            else if (timeRange === '1M') daysToFetch = 30;
            else if (timeRange === '3M') daysToFetch = 90;
            else if (timeRange === '6M') daysToFetch = 180;
            else if (timeRange === '1Y') daysToFetch = 365;
            else if (timeRange === '5Y') daysToFetch = 1825;

            const startDate = new Date();
            startDate.setDate(startDate.getDate() - daysToFetch);
            
            const { data: timelineEvents } = await supabaseClient
                .from('portfolio_events')
                .select('event_name, created_at')
                .gte('created_at', startDate.toISOString())
                .order('created_at', { ascending: true });

            // Process Timeline Data
            const dayMap: Record<string, any> = {};

            if (timeRange === '1D') {
                for (let i = 0; i < 24; i++) {
                    const h = i.toString().padStart(2, '0');
                    const key = `${h}:00`;
                    dayMap[key] = { 
                        date: key, 
                        displayDate: key,
                        Visitors: 0, 
                        Inquiries: 0, 
                        Social: 0 
                    };
                }
                
                if (timelineEvents && timelineEvents.length > 0) {
                    timelineEvents.forEach(evt => {
                        const d = new Date(evt.created_at);
                        const key = `${d.getHours().toString().padStart(2, '0')}:00`;
                        if (dayMap[key]) {
                            if (evt.event_name === 'visitor') dayMap[key].Visitors++;
                            else if (evt.event_name.includes('click') || evt.event_name.includes('call')) {
                                if (evt.event_name.includes('github') || evt.event_name.includes('linkedin')) dayMap[key].Social++;
                                else dayMap[key].Inquiries++;
                            }
                        }
                    });
                }
            } else {
                // Initialize daily/monthly buckets
                for (let i = 0; i <= daysToFetch; i++) {
                    const d = new Date(startDate);
                    d.setDate(d.getDate() + i);
                    const key = d.toISOString().split('T')[0];
                    dayMap[key] = { 
                        date: key, 
                        displayDate: new Date(key).toLocaleDateString([], { month: 'short', day: 'numeric' }),
                        Visitors: 0, 
                        Inquiries: 0, 
                        Social: 0 
                    };
                }

                if (timelineEvents && timelineEvents.length > 0) {
                    timelineEvents.forEach(evt => {
                        const key = evt.created_at.split('T')[0];
                        if (dayMap[key]) {
                            if (evt.event_name === 'visitor') dayMap[key].Visitors++;
                            else if (evt.event_name.includes('click') || evt.event_name.includes('call')) {
                                if (evt.event_name.includes('github') || evt.event_name.includes('linkedin')) dayMap[key].Social++;
                                else dayMap[key].Inquiries++;
                            }
                        }
                    });
                }
            }

            setChartData(Object.values(dayMap));

            // Fetch events for selected date
            const startOfDay = `${selectedDate}T00:00:00.000Z`;
            const endOfDay = `${selectedDate}T23:59:59.999Z`;

            const { data: dateEvents } = await supabaseClient
                .from('portfolio_events')
                .select('*')
                .gte('created_at', startOfDay)
                .lte('created_at', endOfDay)
                .order('created_at', { ascending: false });
            
            setRecentEvents(dateEvents || []);

        } catch (err) {
            console.error('Failed to fetch analytics:', err);
        } finally {
            setIsFetchingGlobal(false);
            setIsChartLoading(false);
        }
    };

    useEffect(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        setToday(todayStr);

        if (supabase) {
            fetchGlobalStats();
            const interval = setInterval(fetchGlobalStats, 30000);
            return () => clearInterval(interval);
        }
    }, [selectedDate, timeRange]);

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pinEntry === PIN) {
            setIsAuthorized(true);
            localStorage.setItem('is_owner', 'true');
            setError('');
        } else {
            setError('Invalid PIN. Please try again.');
            setPinEntry('');
        }
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="max-w-md w-full space-y-8 p-10 bg-card rounded-2xl border border-border/50 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col items-center">
                        <SectionTitle 
                            title="SECURE ACCESS" 
                        />
                        <p className="text-muted-foreground font-roboto-flex -mt-6">
                            Please enter your security PIN to view portfolio statistics.
                        </p>
                    </div>
                    <form onSubmit={handlePinSubmit} className="mt-8 space-y-6">
                        <div className="relative">
                            <input
                                type="password"
                                value={pinEntry}
                                onChange={(e) => setPinEntry(e.target.value)}
                                placeholder="ENTER PIN"
                                className="w-full bg-background-light border border-border rounded-lg px-4 py-4 text-center text-2xl tracking-[0.5em] font-anton focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                maxLength={6}
                                autoFocus
                            />
                        </div>
                        {error && (
                            <p className="text-destructive text-center text-sm font-medium animate-bounce">
                                {error}
                            </p>
                        )}
                        <Button 
                            as="button" 
                            type="submit" 
                            className="w-full"
                        >
                            VERIFY ACCESS
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <SectionTitle 
                            title="PEFORMANCE INSIGHTS" 
                        />
                        <div className="flex gap-2 mt-4 bg-background-light p-1 rounded-lg w-fit border border-border/50">
                            <div className="px-4 py-1 text-[10px] font-anton tracking-widest uppercase bg-primary text-white rounded-md flex items-center gap-2">
                                Global Live
                                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <Button 
                            variant="secondary" 
                            as="button" 
                            onClick={() => fetchGlobalStats()}
                            className={cn(isFetchingGlobal && "animate-pulse")}
                        >
                            {isFetchingGlobal ? "REFRESHING..." : "REFRESH DATA"}
                        </Button>
                        <Button variant="secondary" as="link" href="/">
                            BACK TO PORTFOLIO
                        </Button>
                    </div>
                </div>
                
                {/* Main Metrics */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-lg group hover:border-primary/50 transition-all border-l-4 border-l-primary">
                        <h3 className="text-muted-foreground text-xs font-roboto-flex uppercase tracking-widest">Today&apos;s Visitors</h3>
                        <p className={cn("text-4xl font-anton mt-3 text-primary transition-opacity", isFetchingGlobal && "opacity-50")}>
                            {statsSummary.today}
                        </p>
                        <p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-tighter">
                            New visitors since midnight
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-lg group hover:border-blue-500/50 transition-all border-l-4 border-l-blue-500">
                        <h3 className="text-muted-foreground text-xs font-roboto-flex uppercase tracking-widest">This Week</h3>
                        <p className="text-4xl font-anton mt-3 text-blue-500">{statsSummary.thisWeek}</p>
                        <p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-tighter">Last 7 days growth</p>
                    </div>

                    <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-lg group hover:border-purple-500/50 transition-all border-l-4 border-l-purple-500">
                        <h3 className="text-muted-foreground text-xs font-roboto-flex uppercase tracking-widest">This Month</h3>
                        <p className="text-4xl font-anton mt-3 text-purple-500">{statsSummary.thisMonth}</p>
                        <p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-tighter">Current month total</p>
                    </div>

                    <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-lg group hover:border-amber-500/50 transition-all border-l-4 border-l-amber-500">
                        <h3 className="text-muted-foreground text-xs font-roboto-flex uppercase tracking-widest">Total Reach</h3>
                        <p className="text-4xl font-anton mt-3 text-amber-500">{statsSummary.total}</p>
                        <p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-tighter">Lifetime portfolio hits</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Visitor History Chart */}
                    <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-primary/5">
                            <div>
                                <h2 className="text-xl font-anton tracking-wider uppercase">Engagement Timeline</h2>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Visitors vs Actionable Clicks</p>
                            </div>
                            <div className="flex bg-background-light p-1 rounded-lg border border-border/50 flex-wrap gap-1">
                                {['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={cn(
                                            "px-3 py-1 text-[10px] font-anton tracking-widest uppercase rounded-md transition-all",
                                            timeRange === range 
                                                ? "bg-primary text-white shadow-lg" 
                                                : "text-muted-foreground hover:bg-background hover:text-foreground"
                                        )}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="p-8 h-[450px] w-full mt-auto relative group/chart">
                            {isChartLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        <p className="text-xs font-anton tracking-[.3em] text-primary uppercase">Syncing Live Data...</p>
                                    </div>
                                </div>
                            ) : null}

                            {!isChartLoading && chartData.length === 0 ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center p-8 border border-dashed border-white/10 rounded-2xl bg-white/5">
                                        <Users className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-20" />
                                        <p className="text-[10px] uppercase font-anton tracking-widest text-muted-foreground">No Traffic Recorded for this Period</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full w-full relative flex flex-col">
                                    {/* SVG Chart Container */}
                                    <div className="flex-grow relative">
                                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                            {/* Grid Lines */}
                                            {[0, 25, 50, 75, 100].map((tick) => (
                                                <line 
                                                    key={tick}
                                                    x1="0" y1={tick} x2="100" y2={tick}
                                                    stroke="white" strokeOpacity="0.05" strokeWidth="0.1"
                                                />
                                            ))}

                                            {/* Action Series (Inquiries) */}
                                            <ActionPath 
                                                data={chartData} 
                                                dataKey="Inquiries" 
                                                color="#3b82f6" 
                                                max={chartData.length > 0 ? Math.max(...chartData.map(d => (d.Visitors || 0) + 10), 10) : 10}
                                            />
                                            
                                            {/* Social Series */}
                                            <ActionPath 
                                                data={chartData} 
                                                dataKey="Social" 
                                                color="#8b5cf6" 
                                                max={chartData.length > 0 ? Math.max(...chartData.map(d => (d.Visitors || 0) + 10), 10) : 10}
                                            />

                                            {/* Visitor Series */}
                                            <ActionPath 
                                                data={chartData} 
                                                dataKey="Visitors" 
                                                color="var(--primary)" 
                                                max={chartData.length > 0 ? Math.max(...chartData.map(d => (d.Visitors || 0) + 10), 10) : 10}
                                                fill
                                            />
                                        </svg>
                                        
                                        {/* Hover Interactive Layer */}
                                        <div className="absolute inset-0 flex">
                                            {chartData.map((d, i) => (
                                                <div 
                                                    key={i}
                                                    className="group/point flex-grow h-full relative cursor-pointer"
                                                >
                                                    {/* Tooltip on hover */}
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/point:opacity-100 transition-all z-20 pointer-events-none">
                                                        <div className="bg-background-light border border-white/10 p-3 rounded-xl shadow-2xl min-w-[120px] backdrop-blur-md">
                                                            <p className="text-[10px] text-muted-foreground uppercase font-anton tracking-tight mb-2 border-b border-white/5 pb-1">
                                                                {d.displayDate}
                                                            </p>
                                                            <div className="space-y-1.5">
                                                                <div className="flex justify-between items-center gap-4">
                                                                    <span className="text-[9px] uppercase tracking-wider text-primary font-bold">Visitors</span>
                                                                    <span className="text-sm font-anton">{d.Visitors}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center gap-4">
                                                                    <span className="text-[9px] uppercase tracking-wider text-blue-500 font-bold">Inquiries</span>
                                                                    <span className="text-sm font-anton">{d.Inquiries}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center gap-4">
                                                                    <span className="text-[9px] uppercase tracking-wider text-purple-500 font-bold">Social</span>
                                                                    <span className="text-sm font-anton">{d.Social}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-px h-24 bg-gradient-to-t from-transparent via-primary/50 to-transparent mx-auto mt-2" />
                                                    </div>

                                                    {/* Vertical marker line */}
                                                    <div className="absolute inset-y-0 left-1/2 w-px bg-white/5 opacity-0 group-hover/point:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Legend & X-Axis */}
                                    <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-4">
                                        <div className="flex gap-6">
                                            <LegendItem label="Visitors" color="bg-primary" />
                                            <LegendItem label="Inquiries" color="bg-blue-500" />
                                            <LegendItem label="Social" color="bg-purple-500" />
                                        </div>
                                        <div className="flex gap-1">
                                            <TrendingUp size={12} className="text-primary" />
                                            <span className="text-[9px] font-anton uppercase tracking-widest text-muted-foreground">Traffic Analytics</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Channels Card */}
                    <div className="bg-card rounded-2xl border border-border/50 shadow-xl p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-anton tracking-wider uppercase mb-6">Contact Channels</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-roboto-flex text-muted-foreground">Email Inquiries</span>
                                    <span className="font-anton text-xl">{engagement.email}</span>
                                </div>
                                <div className="h-1.5 w-full bg-background-light rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${(engagement.email / Math.max(1, engagement.email + engagement.whatsapp + engagement.phone + engagement.github + engagement.linkedin)) * 100}%` }} />
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-roboto-flex text-muted-foreground">WhatsApp Chats</span>
                                    <span className="font-anton text-xl">{engagement.whatsapp}</span>
                                </div>
                                <div className="h-1.5 w-full bg-background-light rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: `${(engagement.whatsapp / Math.max(1, engagement.email + engagement.whatsapp + engagement.phone + engagement.github + engagement.linkedin)) * 100}%` }} />
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-roboto-flex text-muted-foreground">GitHub Profile</span>
                                    <span className="font-anton text-xl">{engagement.github}</span>
                                </div>
                                <div className="h-1.5 w-full bg-background-light rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-500" style={{ width: `${(engagement.github / Math.max(1, engagement.email + engagement.whatsapp + engagement.phone + engagement.github + engagement.linkedin)) * 100}%` }} />
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-roboto-flex text-muted-foreground">LinkedIn Profile</span>
                                    <span className="font-anton text-xl">{engagement.linkedin}</span>
                                </div>
                                <div className="h-1.5 w-full bg-background-light rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-700" style={{ width: `${(engagement.linkedin / Math.max(1, engagement.email + engagement.whatsapp + engagement.phone + engagement.github + engagement.linkedin)) * 100}%` }} />
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-roboto-flex text-muted-foreground">Phone Calls</span>
                                    <span className="font-anton text-xl">{engagement.phone}</span>
                                </div>
                                <div className="h-1.5 w-full bg-background-light rounded-full overflow-hidden">
                                    <div className="h-full bg-secondary" style={{ width: `${(engagement.phone / Math.max(1, engagement.email + engagement.whatsapp + engagement.phone + engagement.github + engagement.linkedin)) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                                Most preferred channel:<br/>
                                <strong className="text-primary text-xs mt-1 block">
                                    {engagement.email >= engagement.whatsapp && engagement.email >= engagement.phone ? 'Email (Professional)' : 
                                     engagement.whatsapp >= engagement.phone ? 'WhatsApp (Social)' : 'Phone (Direct)'}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Live Activity Feed */}
                    <div className="mt-8 bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-border/50 flex justify-between items-center bg-primary/5">
                            <h2 className="text-xl font-anton tracking-wider uppercase">Activity Details</h2>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="date" 
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="bg-background border border-border/50 rounded-lg px-3 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                />
                                <span className="text-[10px] font-mono text-primary animate-pulse uppercase tracking-[0.2em] font-bold">● Live Feed</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-background-light/50">
                                        <th className="px-6 py-4 text-[10px] font-roboto-flex text-muted-foreground uppercase tracking-widest">Time</th>
                                        <th className="px-6 py-4 text-[10px] font-roboto-flex text-muted-foreground uppercase tracking-widest">Event</th>
                                        <th className="px-6 py-4 text-[10px] font-roboto-flex text-muted-foreground uppercase tracking-widest">Location</th>
                                        <th className="px-6 py-4 text-[10px] font-roboto-flex text-muted-foreground uppercase tracking-widest">Device</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/20">
                                    {recentEvents.map((event, i) => (
                                        <tr key={i} className="hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-4 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                                                {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-[10px] font-anton uppercase tracking-widest",
                                                    event.event_name === 'visitor' ? "bg-primary/10 text-primary" : 
                                                    event.event_name === 'email_click' ? "bg-blue-500/10 text-blue-500" :
                                                    event.event_name === 'whatsapp_click' ? "bg-green-500/10 text-green-500" :
                                                    event.event_name === 'github_click' ? "bg-gray-500/10 text-gray-400" :
                                                    event.event_name === 'linkedin_click' ? "bg-blue-700/10 text-blue-600" :
                                                    "bg-secondary/10 text-secondary"
                                                )}>
                                                    {event.event_name.replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">
                                                        {event.country_code === 'IN' ? '🇮🇳' : 
                                                         event.country_code === 'US' ? '🇺🇸' : 
                                                         event.country_code === 'GB' ? '🇬🇧' : '🌐'}
                                                    </span>
                                                    <span className="text-xs font-medium">{event.city}, {event.country}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[10px] font-bold uppercase text-foreground/80">{event.device} • {event.browser}</span>
                                                    <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap">{event.os} ({event.screen_resolution})</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentEvents.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground italic text-sm">
                                                {isFetchingGlobal ? 'Fetching data...' : 'No live events tracked yet. Connect your Supabase keys to see the magic.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
    );
}
