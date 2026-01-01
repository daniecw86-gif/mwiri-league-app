import React from 'react';
import Image from 'next/image';
import { teams } from '../data/teams';

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
    const homeTeamData = teams.find((t: any) => t.name === match.homeTeam);
    const awayTeamData = teams.find((t: any) => t.name === match.awayTeam);

    return (
        <div className="bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden hover-lift mb-4">
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    Upcoming
                </span>
            </div>

            <div className="p-6 relative">
                <div className="flex items-center justify-between gap-6">
                    {/* Home Team */}
                    <div className="flex-1 flex items-center gap-4">
                        <div className="w-12 h-12 relative bg-gray-50 rounded-xl p-2 flex-shrink-0">
                            {homeTeamData?.logo ? (
                                <Image
                                    src={homeTeamData.logo}
                                    alt={match.homeTeam}
                                    fill
                                    className="object-contain p-1"
                                />
                            ) : (
                                <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                    {match.homeTeam.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-gray-900 text-base truncate">{match.homeTeam}</p>
                            <p className="text-xs text-gray-500 font-medium">Home</p>
                        </div>
                    </div>

                    {/* Match Info */}
                    <div className="flex flex-col items-center gap-2 min-w-[140px]">
                        <div className="bg-gradient-to-br from-mwiri-blue to-mwiri-blue-dark rounded-xl px-4 py-3 shadow-sm">
                            <p className="text-white font-black text-lg text-center">{match.time || '16:00'}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">{match.venue || 'TBA'}</span>
                        </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 flex items-center gap-4 flex-row-reverse">
                        <div className="w-12 h-12 relative bg-gray-50 rounded-xl p-2 flex-shrink-0">
                            {awayTeamData?.logo ? (
                                <Image
                                    src={awayTeamData.logo}
                                    alt={match.awayTeam}
                                    fill
                                    className="object-contain p-1"
                                />
                            ) : (
                                <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                    {match.awayTeam.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 text-right">
                            <p className="font-bold text-gray-900 text-base truncate">{match.awayTeam}</p>
                            <p className="text-xs text-gray-500 font-medium">Away</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchRow;
