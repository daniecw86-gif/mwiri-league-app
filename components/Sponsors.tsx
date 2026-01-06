'use client';

import React from 'react';

const sponsors = [
    { name: 'Guinness', logo: '/sponsors/guinness.png' },
    { name: 'MTN MoMo', logo: '/sponsors/mtn-momo.png' },
    { name: 'SafeBoda', logo: '/sponsors/safeboda.png' },
    { name: 'Marie Stopes', logo: '/sponsors/marie-stopes.png' },
    { name: 'Tents4U', logo: '/sponsors/tents4u.png' },
    { name: 'Kenbright', logo: 'data:image/jpeg;base64,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' },
    { name: 'Jonakee Holdings Ltd', logo: 'https://jonakeeholdings.com/wp-content/uploads/2023/02/jonakee.png' },
    { name: 'MOBA', logo: 'https://mwiri.sc.ug/wp-content/uploads/2021/09/BCM-Logo2-150x150.png' },
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
                            className="group w-full h-28 flex items-center justify-center p-4 bg-white/95 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 crystal-hover"
                        >
                            {sponsor.logo ? (
                                <img
                                    src={sponsor.logo}
                                    alt={`${sponsor.name} logo`}
                                    className="max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        // Fallback to text if image fails
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                            ) : null}
                            <span className={`text-gray-800 font-bold text-center text-lg ${sponsor.logo ? 'hidden' : ''}`}>
                                {sponsor.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
