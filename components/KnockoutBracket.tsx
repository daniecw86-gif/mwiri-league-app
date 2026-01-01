'use client';

import React from 'react';
import { knockoutMatches, getMatchesByRound } from '../data/knockout';
import KnockoutMatchCard from './KnockoutMatchCard';

const KnockoutBracket: React.FC = () => {
    const quarterFinals = getMatchesByRound('quarter');
    const semiFinals = getMatchesByRound('semi');
    const final = getMatchesByRound('final')[0];

    // Split quarters into left (1,3) and right (2,4) sides
    const leftQuarters = quarterFinals.filter(m => m.position === 1 || m.position === 3);
    const rightQuarters = quarterFinals.filter(m => m.position === 2 || m.position === 4);

    return (
        <div className="w-full overflow-x-auto pb-8">
            <div className="min-w-[900px] px-4">
                {/* Bracket Container */}
                <div className="flex items-center justify-center gap-4">
                    {/* Left Side - Quarter Finals */}
                    <div className="flex flex-col gap-16">
                        {leftQuarters.map(match => (
                            <div key={match.id} className="relative">
                                <KnockoutMatchCard match={match} compact />
                                {/* Connector to Semi */}
                                <div className="absolute top-1/2 -right-4 w-4 h-px bg-gray-300"></div>
                            </div>
                        ))}
                    </div>

                    {/* Connector Lines Left */}
                    <div className="flex flex-col items-center">
                        <div className="w-px h-16 bg-gray-300"></div>
                        <div className="w-4 h-px bg-gray-300"></div>
                        <div className="w-px h-16 bg-gray-300"></div>
                    </div>

                    {/* Left Semi Final */}
                    <div className="relative">
                        <KnockoutMatchCard match={semiFinals[0]} compact />
                        <div className="absolute top-1/2 -right-4 w-4 h-px bg-gray-300"></div>
                    </div>

                    {/* Connector to Final */}
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-px bg-gray-300"></div>
                    </div>

                    {/* Final */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-center mb-2">
                            <span className="inline-block px-4 py-1 bg-gradient-to-r from-mwiri-yellow to-mwiri-gold text-mwiri-blue-dark font-black text-sm rounded-full shadow-md">
                                🏆 FINAL
                            </span>
                        </div>
                        <KnockoutMatchCard match={final} />

                        {/* Champion Display */}
                        {final.winner && (
                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Champion</p>
                                <p className="text-xl font-black text-mwiri-blue">{final.winner}</p>
                                <span className="text-3xl">🏆</span>
                            </div>
                        )}
                    </div>

                    {/* Connector from Final */}
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-px bg-gray-300"></div>
                    </div>

                    {/* Right Semi Final */}
                    <div className="relative">
                        <div className="absolute top-1/2 -left-4 w-4 h-px bg-gray-300"></div>
                        <KnockoutMatchCard match={semiFinals[1]} compact />
                    </div>

                    {/* Connector Lines Right */}
                    <div className="flex flex-col items-center">
                        <div className="w-px h-16 bg-gray-300"></div>
                        <div className="w-4 h-px bg-gray-300"></div>
                        <div className="w-px h-16 bg-gray-300"></div>
                    </div>

                    {/* Right Side - Quarter Finals */}
                    <div className="flex flex-col gap-16">
                        {rightQuarters.map(match => (
                            <div key={match.id} className="relative">
                                <div className="absolute top-1/2 -left-4 w-4 h-px bg-gray-300"></div>
                                <KnockoutMatchCard match={match} compact />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Round Labels */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <div className="w-40 text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quarter-Finals</span>
                    </div>
                    <div className="w-20"></div>
                    <div className="w-40 text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Semi-Finals</span>
                    </div>
                    <div className="w-4"></div>
                    <div className="w-56 text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Final</span>
                    </div>
                    <div className="w-4"></div>
                    <div className="w-40 text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Semi-Finals</span>
                    </div>
                    <div className="w-20"></div>
                    <div className="w-40 text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quarter-Finals</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnockoutBracket;
