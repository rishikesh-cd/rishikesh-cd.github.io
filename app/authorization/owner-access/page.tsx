'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import { cn } from '@/lib/utils';
import { trackStat } from '@/lib/stats';

export default function FakePage() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'failed' | 'authorized'>('idle');
    const [pinEntry, setPinEntry] = useState('');
    const [isExploding, setIsExploding] = useState(false);
    const [error, setError] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const pinInputRef = useRef<HTMLInputElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const startScan = async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            
            // Only start scanning UI if permission is granted
            setIsScanning(true);
            setScanStatus('scanning');
            setScanProgress(0);
        } catch (err) {
            console.error("Camera access denied:", err);
            setError('Camera permission required for Face ID scanning');
            setIsScanning(false);
            setScanStatus('idle');
        }
    };

    useEffect(() => {
        if (scanStatus === 'scanning') {
            const interval = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setScanStatus('failed');
                            stopCamera();
                        }, 500);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 150);
            return () => clearInterval(interval);
        }
    }, [scanStatus]);

    useEffect(() => {
        if (scanStatus === 'failed') {
            // small timeout to ensure field is visible and not disabled
            const timer = setTimeout(() => {
                pinInputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [scanStatus]);

    useEffect(() => {
        return () => stopCamera();
    }, []);

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsExploding(true);
        setError('CRITICAL: IDENTITY REJECTED. SYSTEM LOCKDOWN.');
        trackStat('owner_access_denied');
        
        setTimeout(() => {
            setIsExploding(false);
            setPinEntry('');
        }, 4000);
    };

    return (
        <div className={cn(
            "min-h-screen flex items-center justify-center transition-colors duration-700 px-4 py-20 relative",
            isExploding ? "bg-red-950" : "bg-background"
        )}>
            {/* Simple Top Left Back Button - Styled like reference */}
            <div className="absolute top-8 left-8 z-[100]">
                <a 
                    href="/" 
                    className="flex flex-row items-center gap-3 group transition-all font-roboto-flex text-base text-white hover:opacity-80"
                >
                    <svg 
                        className="w-6 h-6 text-[#22c55e] group-hover:-translate-x-1 transition-transform shrink-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-medium">Back</span>
                </a>
            </div>
            <div className={cn(
                "max-w-md w-full p-8 rounded-[2.5rem] border transition-all duration-500 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center",
                isExploding 
                    ? "bg-red-900/20 border-red-500 shadow-[0_0_80px_rgba(239,68,68,0.4)] animate-shake" 
                    : "bg-card border-border/50"
            )}>
                
                {/* FaceID Style Scanner */}
                <div className="relative mb-8 mt-2">
                    <div className={cn(
                        "w-32 h-32 rounded-[2rem] border-2 relative overflow-hidden transition-all duration-500 flex items-center justify-center bg-black/40",
                        scanStatus === 'scanning' ? "border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" : 
                        scanStatus === 'failed' ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]" : "border-border/30"
                    )}>
                        {/* Video Feed */}
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-500",
                                scanStatus === 'scanning' ? "opacity-60" : "opacity-20"
                            )} 
                        />

                        {/* Scanning HUD */}
                        {scanStatus === 'scanning' && (
                            <>
                                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                                <div className="absolute left-0 right-0 h-[2px] bg-primary shadow-[0_0_15px_#fff] z-20 animate-face-scan" />
                                <div className="absolute inset-4 border border-primary/20 rounded-[1.5rem] animate-ping opacity-20" />
                            </>
                        )}

                        {/* Icon Overlays */}
                        {scanStatus === 'idle' && (
                            <svg className="w-12 h-12 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {scanStatus === 'failed' && (
                            <svg className="w-12 h-12 text-red-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Status Label */}
                <div className="text-center mb-8">
                    <h2 className={cn(
                        "font-anton tracking-widest text-lg uppercase transition-colors",
                        scanStatus === 'failed' || isExploding ? "text-red-500" : "text-foreground"
                    )}>
                        {scanStatus === 'idle' && "Authentication Required"}
                        {scanStatus === 'scanning' && `Scanning... ${scanProgress}%`}
                        {scanStatus === 'failed' && !isExploding && "Face ID Mismatch"}
                        {isExploding && "Unauthorized User"}
                    </h2>
                    <p className="text-[10px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase mt-1">
                        {scanStatus === 'idle' && "BioPass v0.1"}
                        {scanStatus === 'scanning' && "Analyzing Facial Geometry"}
                        {scanStatus === 'failed' && !isExploding && "Security Error: Profile Not Found"}
                        {isExploding && "Protocol: Alert Level Alpha"}
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="w-full space-y-6">
                    {scanStatus === 'idle' ? (
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-muted-foreground text-center mb-6 font-roboto-flex">
                                Please scan your face to access the owner portal.
                            </p>
                            <Button as="button" onClick={startScan} className="w-full">
                                START FACE ID
                            </Button>
                            {error && (
                                <p className="text-red-500 text-center text-[10px] font-mono uppercase tracking-widest animate-pulse mt-6">
                                    {error}
                                </p>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handlePinSubmit} className={cn(
                            "space-y-6 transition-all duration-700 w-full flex flex-col items-center",
                            scanStatus === 'scanning' ? "opacity-30 pointer-events-none blur-sm" : "opacity-100"
                        )}>
                            <div className="relative w-full">
                                <input
                                    inputMode="numeric"
                                    ref={pinInputRef}
                                    type="password"
                                    value={pinEntry}
                                    onChange={(e) => setPinEntry(e.target.value)}
                                    placeholder="ENTER PIN"
                                    disabled={scanStatus === 'scanning' || isExploding}
                                    className={cn(
                                        "w-full bg-background-light border rounded-2xl px-4 py-6 text-center text-2xl tracking-[0.3em] font-anton focus:outline-none transition-all placeholder:text-muted-foreground/30 placeholder:tracking-normal",
                                        isExploding ? "border-red-500 text-red-500 bg-red-950/20" : "border-border/50 focus:border-primary/50"
                                    )}
                                    maxLength={6}
                                />
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-muted-foreground/30 tracking-widest uppercase">
                                    Override PIN
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-center text-[10px] font-mono uppercase tracking-widest animate-pulse">
                                    {error}
                                </p>
                            )}

                            <div className="w-full flex justify-center">
                                <Button 
                                    as="button" 
                                    type="submit" 
                                    disabled={scanStatus === 'scanning' || isExploding}
                                    className={cn("w-full py-4 text-center", isExploding ? "bg-red-600 hover:bg-red-600" : "")}
                                >
                                    {isExploding ? "LOCKED" : "VERIFY IDENTITY"}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer Trace */}
                {isExploding && (
                    <div className="mt-8 pt-4 border-t border-red-900/20 w-full text-center">
                        <span className="text-[9px] text-red-500/40 font-mono animate-pulse tracking-tighter">
                            LATENCY: 14ms | POS: 9.32.1 | TRACE: 88%
                        </span>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes face-scan {
                    0%, 100% { top: 0%; }
                    50% { top: 100%; }
                }
                .animate-face-scan {
                    animation: face-scan 2.5s ease-in-out infinite;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                .animate-shake {
                    animation: shake 0.1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
