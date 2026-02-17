'use client';

import React, { useEffect, useRef } from 'react';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { EMAIL_LINK, GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { trackStat } from '@/lib/stats';

interface HireMeModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    showBadge?: boolean;
    onInteracted?: () => void;
}

const HireMeModal = ({ isOpen, onClose, title, description, showBadge = true, onInteracted }: HireMeModalProps) => {
    const [shouldRender, setShouldRender] = React.useState(isOpen);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const whatsappUrl = SOCIAL_LINKS.find(link => link.name === 'whatsapp')?.url || '';

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            document.body.style.overflow = 'hidden';
            
            const tl = gsap.timeline();
            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            })
            .fromTo(contentRef.current, 
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' },
                '-=0.2'
            );
        } else if (shouldRender) {
            document.body.style.overflow = 'unset';
            const tl = gsap.timeline({
                onComplete: () => setShouldRender(false)
            });
            
            tl.to(contentRef.current, {
                scale: 0.9,
                opacity: 0,
                y: 10,
                duration: 0.2,
                ease: 'power2.in'
            })
            .to(overlayRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            }, '-=0.1');
        }
    }, [isOpen, shouldRender]);

    if (!shouldRender) return null;

    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            {/* Overlay */}
            <div 
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0"
                onClick={onClose}
            />

            {/* Content */}
            <div 
                ref={contentRef}
                className="relative w-full max-w-md bg-background-light border border-white/10 rounded-2xl p-8 shadow-2xl opacity-0 overflow-hidden"
            >
                {/* Accent Background Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    {showBadge && (
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                            Available for Hire
                        </div>
                    )}
                    <h2 className="text-3xl font-anton text-foreground uppercase tracking-tight mb-3">
                        {title || (
                            <>
                                Ready to <span className="text-primary">Elevate</span> Your Team?
                            </>
                        )}
                    </h2>
                    <div className="text-muted-foreground text-pretty">
                        {description || (
                            <p>
                                I&apos;m currently scouting for exciting frontend opportunities. If you&apos;re looking for a developer who blends <span className="text-foreground font-medium">creativity with performance</span>, let&apos;s talk!
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Email Option */}
                    <a 
                        href={EMAIL_LINK}
                        onClick={() => {
                            trackStat('email_click');
                            onInteracted?.();
                        }}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                    >
                        <div className="flex-shrink-0 size-12 flex items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                            <Mail size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-lg text-foreground">Send an Email</h3>
                            <p className="text-sm text-muted-foreground">For professional inquiries & collaboration</p>
                        </div>
                    </a>

                    {/* WhatsApp Option */}
                    <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            trackStat('whatsapp_click');
                            onInteracted?.();
                        }}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300"
                    >
                        <div className="flex-shrink-0 size-12 flex items-center justify-center rounded-lg bg-green-500/20 text-green-500 group-hover:scale-110 transition-transform">
                            <MessageCircle size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-lg text-foreground">WhatsApp Me</h3>
                            <p className="text-sm text-muted-foreground">For quick chats and instant replies</p>
                        </div>
                    </a>

                    {/* Call Option - Mobile only */}
                    {isMobile && (
                        <a 
                            href={`tel:${GENERAL_INFO.phone.replace(/\s/g, '')}`}
                            onClick={() => {
                                trackStat('call_click');
                                onInteracted?.();
                            }}
                            className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 size-12 flex items-center justify-center rounded-lg bg-secondary/20 text-secondary group-hover:scale-110 transition-transform">
                                <Phone size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-foreground">Call Now</h3>
                                <p className="text-sm text-muted-foreground">{GENERAL_INFO.phone}</p>
                            </div>
                        </a>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground/50 italic underline decoration-primary/30">
                        Based in Kerala, India (GMT+5:30)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HireMeModal;
