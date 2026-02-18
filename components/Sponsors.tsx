'use client';

import React from 'react';
import Image from 'next/image';

const sponsors = [
    { name: 'Guinness', logo: '/sponsors/guinness.png' },
    { name: 'MTN MoMo', logo: '/sponsors/mtn-momo.png' },
    { name: 'SafeBoda', logo: '/sponsors/safeboda.png' },
    { name: 'Marie Stopes', logo: '/sponsors/marie-stopes.png' },
    { name: 'Tents4U', logo: '/sponsors/tents4u.png' },
    { name: 'Kenbright', logo: '/sponsors/kenbright.jpg' },
    { name: 'Jonakee Holdings Ltd', logo: '/sponsors/jonakee.png' },
    { name: 'MOBA', logo: '/sponsors/moba.png' },
];

export default function Sponsors() {
    return (
        <section className="py-12 mt-8 crystal-glass border-t border-mwiri-gold/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="font-barlow text-2xl md:text-3xl font-bold text-white mb-3">
                        Our Partners & Sponsors
                    </h2>
                    <div className="w-20 h-1 bg-mwiri-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-items-center">
                    {sponsors.map((sponsor, index) => (
                        <div
                            key={index}
                            className="group w-full h-28 flex items-center justify-center p-4 bg-white/95 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 crystal-hover relative"
                        >
                            <Image
                                src={sponsor.logo}
                                alt={`${sponsor.name} logo`}
                                width={160}
                                height={64}
                                className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                    // Hide image on error, show text fallback
                                    e.currentTarget.style.display = 'none';
                                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                    if (fallback) fallback.classList.remove('hidden');
                                }}
                            />
                            <span className="hidden text-gray-800 font-bold text-center text-lg">
                                {sponsor.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
