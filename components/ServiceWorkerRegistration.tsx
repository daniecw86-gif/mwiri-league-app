'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
    useEffect(() => {
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then((registration) => {
                        console.log('[SW] Service Worker registered:', registration.scope);

                        // Check for updates
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            if (newWorker) {
                                newWorker.addEventListener('statechange', () => {
                                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                        // New content available
                                        console.log('[SW] New content available, please refresh.');
                                    }
                                });
                            }
                        });
                    })
                    .catch((error) => {
                        console.log('[SW] Service Worker registration failed:', error);
                    });
            });
        }
    }, []);

    // This component doesn't render anything
    return null;
}
