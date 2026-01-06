"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MatchCardProps {
    match: {
        id: number;
        homeTeam: string;
        awayTeam: string;
        homeScore?: number;
        awayScore?: number;
        time?: string;
        date?: string;
        venue?: string;
        isLive?: boolean;
    };
    homeTeamLogo?: string | null;
    awayTeamLogo?: string | null;
    variant?: 'default' | 'compact' | 'featured';
}

const MatchCard: React.FC<MatchCardProps> = ({
    match,
    homeTeamLogo,
    awayTeamLogo,
    variant = 'default'
}) => {
    const isResult = match.homeScore !== undefined && match.awayScore !== undefined;
    const isLive = match.isLive;

    const isFeatured = variant === 'featured';
    const isCompact = variant === 'compact';

    return (
        <Link
            href={`/matches/${match.id}`}
            className={`block crystal-glass rounded-2xl overflow-hidden crystal-hover ${isFeatured ? 'p-6 md:p-8' : isCompact ? 'p-3' : 'p-4'
                }`}
        >
            {/* Match Status Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
                {isLive ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider live-pulse">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Live
                    </span>
                ) : isResult ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-mwiri-green/30 text-white text-xs font-bold uppercase tracking-wider">
                        FT
                    </span>
                ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-bold uppercase tracking-wider">
                        {match.time || 'TBD'}
                    </span>
                )}
            </div>

            {/* Teams & Score */}
            <div className="flex items-center justify-between gap-2">
                {/* Home Team */}
                <div className={`flex-1 text-center ${isCompact ? '' : 'min-w-[80px]'}`}>
                    <div className={`mx-auto mb-2 relative bg-white/10 rounded-xl p-1 ${isFeatured ? 'w-20 h-20 md:w-24 md:h-24' : isCompact ? 'w-10 h-10' : 'w-14 h-14'
                        }`}>
                        {homeTeamLogo ? (
                            <Image
                                src={homeTeamLogo}
                                alt={match.homeTeam}
                                fill
                                className="object-contain p-1"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl font-black text-white/50">
                                {match.homeTeam.charAt(0)}
                            </div>
                        )}
                    </div>
                    <p className={`font-barlow font-bold text-white truncate ${isFeatured ? 'text-lg md:text-xl' : isCompact ? 'text-xs' : 'text-sm'
                        }`}>
                        {isCompact ? match.homeTeam.substring(0, 3).toUpperCase() : match.homeTeam}
                    </p>
                </div>

                {/* VS Badge / Score */}
                <div className="flex flex-col items-center gap-1">
                    {isResult ? (
                        <div className={`rounded-xl bg-mwiri-green/50 text-white font-black ${isFeatured ? 'px-6 py-3 text-2xl' : isCompact ? 'px-2 py-1 text-sm' : 'px-4 py-2 text-lg'
                            }`}>
                            {match.homeScore} - {match.awayScore}
                        </div>
                    ) : (
                        <div className={`vs-badge ${isCompact ? 'w-8 h-8 text-xs' : isFeatured ? 'w-14 h-14 text-lg' : ''}`}>
                            VS
                        </div>
                    )}
                    {!isCompact && match.venue && (
                        <span className="text-white/30 text-[10px] font-medium mt-1">
                            {match.venue}
                        </span>
                    )}
                </div>

                {/* Away Team */}
                <div className={`flex-1 text-center ${isCompact ? '' : 'min-w-[80px]'}`}>
                    <div className={`mx-auto mb-2 relative bg-white/10 rounded-xl p-1 ${isFeatured ? 'w-20 h-20 md:w-24 md:h-24' : isCompact ? 'w-10 h-10' : 'w-14 h-14'
                        }`}>
                        {awayTeamLogo ? (
                            <Image
                                src={awayTeamLogo}
                                alt={match.awayTeam}
                                fill
                                className="object-contain p-1"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl font-black text-white/50">
                                {match.awayTeam.charAt(0)}
                            </div>
                        )}
                    </div>
                    <p className={`font-barlow font-bold text-white truncate ${isFeatured ? 'text-lg md:text-xl' : isCompact ? 'text-xs' : 'text-sm'
                        }`}>
                        {isCompact ? match.awayTeam.substring(0, 3).toUpperCase() : match.awayTeam}
                    </p>
                </div>
            </div>

            {/* Match Date (non-compact only) */}
            {!isCompact && match.date && (
                <div className="mt-4 pt-3 border-t border-white/10 text-center">
                    <span className="text-white/40 text-xs font-medium">{match.date}</span>
                </div>
            )}
        </Link>
    );
};

export default MatchCard;
