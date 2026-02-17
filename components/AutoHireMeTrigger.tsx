'use client';

import React, { useEffect, useState } from 'react';
import HireMeModal from './HireMeModal';

const AutoHireMeTrigger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [delay, setDelay] = useState(60000); // Start at 1 minute
    const [isPermanentlyDisabled, setIsPermanentlyDisabled] = useState(false);
    const [modalContent, setModalContent] = useState<{
        title?: React.ReactNode;
        description?: React.ReactNode;
        showBadge?: boolean;
    }>({});

    useEffect(() => {
        // Check if user already interacted in previous sessions
        const interacted = localStorage.getItem('hire_me_interacted') === 'true';
        if (interacted) {
            setIsPermanentlyDisabled(true);
        }
    }, []);

    useEffect(() => {
        const handleOpenModal = (e: any) => {
            if (e.detail) {
                setModalContent(e.detail);
            } else {
                setModalContent({});
            }
            setIsOpen(true);
        };
        window.addEventListener('open-hire-me-modal', handleOpenModal as EventListener);

        let timer: NodeJS.Timeout;

        if (!isOpen && !isPermanentlyDisabled) {
            timer = setTimeout(() => {
                setIsOpen(true);
                setModalContent({}); // Use default catchy content for auto-trigger
            }, delay);
        }

        return () => {
            window.removeEventListener('open-hire-me-modal', handleOpenModal as EventListener);
            if (timer) clearTimeout(timer);
        };
    }, [isOpen, delay, isPermanentlyDisabled]);

    const handleClose = () => {
        setIsOpen(false);
        // Double the delay for the next auto-trigger after closing
        setDelay(prev => prev * 2);
    };

    const handleInteraction = () => {
        setIsPermanentlyDisabled(true);
        localStorage.setItem('hire_me_interacted', 'true');
    };

    return (
        <HireMeModal 
            isOpen={isOpen} 
            onClose={handleClose} 
            title={modalContent.title}
            description={modalContent.description}
            showBadge={modalContent.showBadge}
            onInteracted={handleInteraction}
        />
    );
};

export default AutoHireMeTrigger;
