import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PlayerHeroProps {
    player: {
        id: number;
        name: string;
        teamName: string;
        teamId: number;
        number: number;
        position: string;
        image?: string | null;
    };
    primaryColor?: string;
}

const PlayerHero: React.FC<PlayerHeroProps> = ({ player, primaryColor = '#002845' }) => {
    return (
        <div className="relative bg-mwiri-blue-deep overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: primaryColor }}>
                <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="player-hero-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="2" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#player-hero-pattern)" />
                </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-0 md:pt-20 md:pb-0 flex flex-col md:flex-row items-end">
                {/* Player Image / Placeholder */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-start -mb-4 md:-mb-8 relative z-20">
                    <div className="w-64 h-64 md:w-80 md:h-80 relative">
                        {player.image ? (
                            <Image src={player.image} alt={player.name} width={320} height={320} className="w-full h-full object-contain drop-shadow-2xl" />
                        ) : (
                            <div className="w-full h-full flex items-end justify-center">
                                <svg className="w-full h-full text-gray-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                {/* Player Info */}
                <div className="w-full md:w-2/3 pb-12 md:pb-16 text-white">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-6xl md:text-8xl font-black text-white/20 select-none">
                            {player.number}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-mwiri-yellow uppercase tracking-wider">
                                {player.position}
                            </span>
                            <Link href={`/clubs/${player.teamId}`} className="text-gray-300 hover:text-white hover:underline">
                                {player.teamName}
                            </Link>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-shadow-lg">
                        {player.name}
                    </h1>

                    <div className="flex gap-4">
                        <button className="bg-white text-mwiri-blue-deep px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                            Overview
                        </button>
                        <button className="bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                            Stats
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerHero;
