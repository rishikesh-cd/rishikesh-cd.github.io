'use client';

import { EMAIL_LINK, GENERAL_INFO } from '@/lib/data';
import FakePortalSection from '@/app/_components/FakePortalSection';
import { trackStat } from '@/lib/stats';

const Footer = () => {
    return (
        <footer className="text-center pb-0" id="contact">
            <div className="container px-0 max-w-none">
                <div className="pb-10">
                    <p className="text-lg">Looking to build something amazing? Let’s work together!</p>
                    <a
                        href={EMAIL_LINK}
                        onClick={() => trackStat('email_click')}
                        className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline"
                    >
                        {GENERAL_INFO.email}
                    </a>
                </div>

                <FakePortalSection />
            </div>
        </footer>
    );
};

export default Footer;
