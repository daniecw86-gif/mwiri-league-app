import React from 'react';
import Image from 'next/image';
import { teams } from '../data/teams';
import { Team } from '../types';

interface Match {
    id: number;
    homeTeam: string;
    awayTeam: string;
    time?: string;
    venue?: string;
}

interface MatchRowProps {
    match: Match;
}

const MatchRow: React.FC<MatchRowProps> = ({ match }) => {
    const homeTeamData = teams.find((t: Team) => t.name === match.homeTeam);
    const awayTeamData = teams.find((t: Team) => t.name === match.awayTeam);

    return (
        <div className="crystal-glass rounded-2xl overflow-hidden crystal-hover mb-4 relative">
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mwiri-gold text-mwiri-blue-deep text-xs font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-mwiri-blue-deep animate-pulse"></span>
                    Upcoming
                </span>
            </div>

            <div className="p-6 relative">
                <div className="flex items-center justify-between gap-6">
                    {/* Home Team */}
                    <div className="flex-1 flex items-center gap-4">
                        <div className="w-12 h-12 relative bg-white/10 rounded-xl p-2 flex-shrink-0">
                            {homeTeamData?.logo ? (
                                <Image
                                    src={homeTeamData.logo}
                                    alt={match.homeTeam}
                                    fill
                                    className="object-contain p-1"
                                />
                            ) : (
                                <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold text-white/70">
                                    {match.homeTeam.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-white text-base truncate">{match.homeTeam}</p>
                            <p className="text-xs text-white/50 font-medium">Home</p>
                        </div>
                    </div>

                    {/* Match Info */}
                    <div className="flex flex-col items-center gap-2 min-w-[120px]">
                        <div className="vs-badge">
                            {match.time || '16:00'}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/50">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">{match.venue || 'TBA'}</span>
                        </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 flex items-center gap-4 flex-row-reverse">
                        <div className="w-12 h-12 relative bg-white/10 rounded-xl p-2 flex-shrink-0">
                            {awayTeamData?.logo ? (
                                <Image
                                    src={awayTeamData.logo}
                                    alt={match.awayTeam}
                                    fill
                                    className="object-contain p-1"
                                />
                            ) : (
                                <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold text-white/70">
                                    {match.awayTeam.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 text-right">
                            <p className="font-bold text-white text-base truncate">{match.awayTeam}</p>
                            <p className="text-xs text-white/50 font-medium">Away</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchRow;
