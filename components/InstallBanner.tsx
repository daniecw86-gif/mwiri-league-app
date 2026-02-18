'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const InstallBanner: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed (standalone mode)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            return;
        }

        // Check if dismissed before (within last 7 days)
        const dismissed = localStorage.getItem('installBannerDismissed');
        if (dismissed) {
            const dismissedTime = parseInt(dismissed);
            if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
                return;
            }
        }

        // Detect iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(isIOSDevice);

        // Show banner for iOS devices
        if (isIOSDevice) {
            setTimeout(() => setShowBanner(true), 2000);
            return;
        }

        // Listen for the install prompt (Android/Chrome)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setTimeout(() => setShowBanner(true), 2000);
        };

        // Listen for successful installation
        const handleAppInstalled = () => {
            setShowBanner(false);
            setIsInstalled(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShowBanner(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowBanner(false);
        localStorage.setItem('installBannerDismissed', Date.now().toString());
    };

    if (isInstalled || !showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-mwiri-blue-deep via-mwiri-blue to-mwiri-blue-dark text-white shadow-2xl animate-slide-up">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                {/* Icon & Text */}
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-white rounded-xl p-2 flex-shrink-0 shadow-lg">
                        <Image src="/images/mwiri-logo.png" alt="Mwiri League" width={48} height={48} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm sm:text-base">Install Mwiri League App</p>
                        {isIOS ? (
                            <p className="text-xs text-blue-200 mt-0.5">
                                Tap <span className="inline-flex items-center"><svg className="w-4 h-4 mx-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L12 14M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M4 14v6h16v-6" stroke="currentColor" strokeWidth="2" fill="none" /></svg></span> then &quot;Add to Home Screen&quot;
                            </p>
                        ) : (
                            <p className="text-xs text-blue-200 mt-0.5">Get quick access on your home screen!</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {!isIOS && deferredPrompt && (
                        <button
                            onClick={handleInstallClick}
                            className="bg-mwiri-yellow text-mwiri-blue-dark px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors"
                        >
                            Install
                        </button>
                    )}
                    <button
                        onClick={handleDismiss}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Dismiss"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallBanner;
