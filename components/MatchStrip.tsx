import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { results } from '../data/results';
import { fixtures } from '../data/fixtures';
import { teams } from '../data/teams';

const MatchStrip = () => {
    // Quick team lookup
    const teamMap = new Map();
    teams.forEach(t => teamMap.set(t.name, t));

    const latestResults = results.length > 0 ? results[0].matches.slice(0, 5) : [];
    const upcomingFixtures = fixtures.length > 0 ? fixtures[0].matches.slice(0, 5) : [];

    // Combine for the strip
    const stripItems = [
        ...latestResults.map(m => ({ ...m, type: 'result' })),
        ...upcomingFixtures.map(m => ({ ...m, type: 'fixture' }))
    ];

    return (
        <div className="crystal-glass border-b border-white/10 overflow-x-auto scrollbar-hide">
            <div className="flex divide-x divide-white/5 min-w-max">
                {stripItems.map((match: any) => {
                    const homeTeam = teamMap.get(match.homeTeam);
                    const awayTeam = teamMap.get(match.awayTeam);
                    const isLive = match.isLive;

                    return (
                        <Link
                            key={`${match.type}-${match.id}`}
                            href={`/matches/${match.id}`}
                            className="group flex flex-col items-center justify-center min-w-[140px] py-2.5 px-4 hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            {/* Match Status / Time */}
                            <div className="mb-2">
                                {isLive ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        LIVE
                                    </span>
                                ) : match.type === 'result' ? (
                                    <span className="text-[10px] font-bold text-white bg-mwiri-green/50 px-2 py-0.5 rounded-full">FT</span>
                                ) : (
                                    <span className="text-[10px] font-bold text-white/50 bg-white/10 px-2 py-0.5 rounded-full">{match.time || '16:00'}</span>
                                )}
                            </div>

                            {/* Teams & Score */}
                            <div className="flex items-center gap-2 w-full justify-center">
                                {/* Home */}
                                <div className="flex flex-col items-center gap-1 w-8">
                                    <div className="relative w-6 h-6 bg-white/10 rounded-lg p-0.5">
                                        {homeTeam?.logo ? (
                                            <Image src={homeTeam.logo} alt={match.homeTeam} fill className="object-contain" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-white/50">{match.homeTeam.charAt(0)}</div>
                                        )}
                                    </div>
                                    <span className="text-[9px] font-bold text-white/70 truncate w-full text-center">{match.homeTeam.substring(0, 3).toUpperCase()}</span>
                                </div>

                                {/* Score/VS */}
                                <div className={`text-xs font-bold px-2 py-0.5 rounded-md min-w-[36px] text-center ${match.type === 'result'
                                        ? 'bg-mwiri-gold/20 text-mwiri-gold'
                                        : 'bg-white/10 text-white/40'
                                    }`}>
                                    {match.type === 'result' ? (
                                        `${match.homeScore}-${match.awayScore}`
                                    ) : (
                                        <span>vs</span>
                                    )}
                                </div>

                                {/* Away */}
                                <div className="flex flex-col items-center gap-1 w-8">
                                    <div className="relative w-6 h-6 bg-white/10 rounded-lg p-0.5">
                                        {awayTeam?.logo ? (
                                            <Image src={awayTeam.logo} alt={match.awayTeam} fill className="object-contain" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-white/50">{match.awayTeam.charAt(0)}</div>
                                        )}
                                    </div>
                                    <span className="text-[9px] font-bold text-white/70 truncate w-full text-center">{match.awayTeam.substring(0, 3).toUpperCase()}</span>
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
