
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { results } from '../data/results';
import { fixtures } from '../data/fixtures';
import { teams } from '../data/teams';

const MatchStrip = () => {
    // 1. Gather meaningful matches to show (e.g., last 5 results + next 5 fixtures)
    // For simplicity, we'll take the latest result group and the first upcoming fixture group

    // Quick team lookup
    const teamMap = new Map();
    teams.forEach(t => teamMap.set(t.name, t));

    const latestResults = results.length > 0 ? results[0].matches : [];
    const upcomingFixtures = fixtures.length > 0 ? fixtures[0].matches.slice(0, 5) : [];

    // Combine for the strip
    const stripItems = [
        ...latestResults.map(m => ({ ...m, type: 'result' })),
        ...upcomingFixtures.map(m => ({ ...m, type: 'fixture' }))
    ];

    return (
        <div className="bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide">
            <div className="flex divide-x divide-gray-100 min-w-max">
                {stripItems.map((match: any) => {
                    const homeTeam = teamMap.get(match.homeTeam);
                    const awayTeam = teamMap.get(match.awayTeam);

                    return (
                        <Link
                            key={`${match.type}-${match.id}`}
                            href={`/matches/${match.id}`}
                            className="group flex flex-col items-center justify-center min-w-[140px] py-2 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            {/* Match Status / Time */}
                            <div className="mb-2">
                                {match.type === 'result' ? (
                                    <span className="text-[10px] font-bold text-white bg-mwiri-blue px-1.5 py-0.5 rounded">FT</span>
                                ) : (
                                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{match.time || '16:00'}</span>
                                )}
                            </div>

                            {/* Teams & Score */}
                            <div className="flex items-center gap-3 w-full justify-center">
                                {/* Home */}
                                <div className="flex flex-col items-center gap-1 w-8">
                                    <div className="relative w-6 h-6">
                                        {homeTeam?.logo ? (
                                            <Image src={homeTeam.logo} alt={match.homeTeam} fill className="object-contain" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-[8px] font-bold text-gray-500">{match.homeTeam.charAt(0)}</div>
                                        )}
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-700 truncate w-full text-center">{match.homeTeam.substring(0, 3).toUpperCase()}</span>
                                </div>

                                {/* Score/VS */}
                                <div className="bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded-sm min-w-[32px] text-center">
                                    {match.type === 'result' ? (
                                        `${match.homeScore} - ${match.awayScore}`
                                    ) : (
                                        <span className="text-gray-400">vs</span>
                                    )}
                                </div>

                                {/* Away */}
                                <div className="flex flex-col items-center gap-1 w-8">
                                    <div className="relative w-6 h-6">
                                        {awayTeam?.logo ? (
                                            <Image src={awayTeam.logo} alt={match.awayTeam} fill className="object-contain" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-[8px] font-bold text-gray-500">{match.awayTeam.charAt(0)}</div>
                                        )}
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-700 truncate w-full text-center">{match.awayTeam.substring(0, 3).toUpperCase()}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MatchStrip;
