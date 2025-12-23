'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof Link> {}

gsap.registerPlugin(useGSAP);

const TransitionLink = ({
    href,
    onClick,
    children,
    ...rest
}: Props) => {
    const router = useRouter();

    const { contextSafe } = useGSAP(() => {});

    const handleLinkClick = contextSafe(
        async (e: React.MouseEvent<HTMLAnchorElement>) => {
            const toString = href?.toString();
            const isHash = toString?.includes('#');
            const targetPath = toString?.split('#')[0];
            const isSamePage = !targetPath || targetPath === window.location.pathname;

            if (isHash && isSamePage) {
                return;
            }
            
            e.preventDefault();

            gsap.set('.page-transition', { yPercent: 100 });
            gsap.set('.page-transition--inner', { yPercent: 100 });

            const tl = gsap.timeline();

            tl.to('.page-transition', {
                yPercent: 0,
                duration: 0.3,
                ease: 'power2.inOut',
            });

            tl.then(() => {
                if (href) {
                    router.push(href.toString());
                } else if (onClick) {
                    onClick(e);
                }
            });
        },
    );

    return (
        <Link href={href} {...rest} onClick={handleLinkClick}>
            {children}
        </Link>
    );
};

export default TransitionLink;
