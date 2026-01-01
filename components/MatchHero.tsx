import React from 'react';
import { teams } from '../data/teams';

interface MatchHeroProps {
    match: any;
}

const MatchHero: React.FC<MatchHeroProps> = ({ match }) => {
    const homeTeam = teams.find(t => t.id === match.homeTeamId);
    const awayTeam = teams.find(t => t.id === match.awayTeamId);

    return (
        <div className="relative bg-mwiri-blue-deep text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid-pattern)" />
                    <defs>
                        <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                </svg>
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Home Team */}
                    <div className="flex flex-col items-center gap-4 flex-1">
                        <div
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm p-4 flex items-center justify-center shadow-2xl border-4 border-white/5"
                            style={{ borderColor: homeTeam?.primaryColor || 'transparent' }}
                        >
                            {homeTeam?.logo ? (
                                <img src={homeTeam.logo} alt={match.homeTeamName} className="w-full h-full object-contain drop-shadow-lg" />
                            ) : (
                                <span className="text-4xl font-bold">{match.homeTeamName.charAt(0)}</span>
                            )}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight">{match.homeTeamName}</h2>
                    </div>

                    {/* Score / Time */}
                    <div className="flex flex-col items-center justify-center min-w-[200px]">
                        {match.status === 'Full Time' || match.status === 'Live' ? (
                            <div className="flex items-center gap-4">
                                <span className="text-5xl md:text-7xl font-black tracking-tighter text-mwiri-yellow text-shadow-lg">
                                    {match.score.home}
                                </span>
                                <span className="text-4xl text-gray-400 font-light">-</span>
                                <span className="text-5xl md:text-7xl font-black tracking-tighter text-mwiri-yellow text-shadow-lg">
                                    {match.score.away}
                                </span>
                            </div>
                        ) : (
                            <div className="text-4xl md:text-5xl font-bold tracking-tight bg-white/10 px-6 py-2 rounded-lg backdrop-blur-md">
                                {match.time || '16:00'}
                            </div>
                        )}
                        <div className="mt-4 flex flex-col items-center gap-1">
                            <span className="text-sm font-bold uppercase tracking-widest text-mwiri-yellow bg-mwiri-blue-dark/50 px-3 py-1 rounded-full">
                                {match.status}
                            </span>
                            <span className="text-sm text-gray-300 font-medium flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {match.venue || 'TBA'}
                            </span>
                        </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center gap-4 flex-1">
                        <div
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm p-4 flex items-center justify-center shadow-2xl border-4 border-white/5"
                            style={{ borderColor: awayTeam?.primaryColor || 'transparent' }}
                        >
                            {awayTeam?.logo ? (
                                <img src={awayTeam.logo} alt={match.awayTeamName} className="w-full h-full object-contain drop-shadow-lg" />
                            ) : (
                                <span className="text-4xl font-bold">{match.awayTeamName.charAt(0)}</span>
                            )}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight">{match.awayTeamName}</h2>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MatchHero;
