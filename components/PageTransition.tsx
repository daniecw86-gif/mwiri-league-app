'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(false);
        // Trigger animation on next frame
        const raf = requestAnimationFrame(() => {
            setIsVisible(true);
        });
        return () => cancelAnimationFrame(raf);
    }, [pathname]);

    return (
        <div className={isVisible ? 'page-enter' : 'opacity-0'}>
            {children}
        </div>
    );
}
