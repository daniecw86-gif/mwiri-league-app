"use client";

import React, { useState } from 'react';
import MatchHero from './MatchHero';
import MatchTabs from './MatchTabs';
import LineupView from './LineupView';
import StatsComparison from './StatsComparison';
import { teams } from '../data/teams';

interface MatchCentreClientProps {
    match: any;
}

const HeadToHeadView = ({ homeTeam, awayTeam }: { homeTeam: any, awayTeam: any }) => {
    if (!homeTeam || !awayTeam) return null;

    const ComparisonRow = ({ label, homeValue, awayValue }: { label: string, homeValue: any, awayValue: any }) => {
        const homeBetter = typeof homeValue === 'number' && typeof awayValue === 'number' && homeValue > awayValue;
        const awayBetter = typeof awayValue === 'number' && typeof homeValue === 'number' && awayValue > homeValue;

        return (
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className={`w-1/3 text-center font-bold text-lg ${homeBetter ? 'text-mwiri-blue' : 'text-gray-600'}`}>{homeValue}</div>
                <div className="w-1/3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</div>
                <div className={`w-1/3 text-center font-bold text-lg ${awayBetter ? 'text-mwiri-blue' : 'text-gray-600'}`}>{awayValue}</div>
            </div>
        );
    }

    // Calculate form string for display
    const homeForm = homeTeam.form.join(' - ');
    const awayForm = awayTeam.form.join(' - ');

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="w-16 h-16 relative">
                        {homeTeam.logo ? (
                            <img src={homeTeam.logo} alt={homeTeam.name} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">{homeTeam.name.charAt(0)}</div>
                        )}
                    </div>
                    <span className="font-bold text-gray-900 text-center">{homeTeam.name}</span>
                </div>
                <div className="font-black text-4xl text-gray-200">VS</div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="w-16 h-16 relative">
                        {awayTeam.logo ? (
                            <img src={awayTeam.logo} alt={awayTeam.name} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">{awayTeam.name.charAt(0)}</div>
                        )}
                    </div>
                    <span className="font-bold text-gray-900 text-center">{awayTeam.name}</span>
                </div>
            </div>

            <div className="space-y-1">
                <ComparisonRow label="Points" homeValue={homeTeam.points} awayValue={awayTeam.points} />
                <ComparisonRow label="Played" homeValue={homeTeam.played} awayValue={awayTeam.played} />
                <ComparisonRow label="Won" homeValue={homeTeam.won} awayValue={awayTeam.won} />
                <ComparisonRow label="Drawn" homeValue={homeTeam.drawn} awayValue={awayTeam.drawn} />
                <ComparisonRow label="Lost" homeValue={homeTeam.lost} awayValue={awayTeam.lost} />
                <ComparisonRow label="Goals For" homeValue={homeTeam.gf} awayValue={awayTeam.gf} />
                <ComparisonRow label="Goals Against" homeValue={homeTeam.ga} awayValue={awayTeam.ga} />
                <div className="flex items-center justify-between py-4 border-t border-gray-100 mt-4">
                    <div className="w-1/3 flex justify-center gap-1">
                        {homeTeam.form.map((r: string, i: number) => (
                            <span key={i} className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${r === 'W' ? 'bg-green-500' : r === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}>{r}</span>
                        ))}
                    </div>
                    <div className="w-1/3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Form</div>
                    <div className="w-1/3 flex justify-center gap-1">
                        {awayTeam.form.map((r: string, i: number) => (
                            <span key={i} className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${r === 'W' ? 'bg-green-500' : r === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}>{r}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MatchCentreClient: React.FC<MatchCentreClientProps> = ({ match }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const homeTeam = teams.find((t: any) => t.id === match.homeTeamId);
    const awayTeam = teams.find((t: any) => t.id === match.awayTeamId);

    const renderContent = () => {
        switch (activeTab) {
            case 'lineups':
                return (
                    <LineupView
                        homeTeamName={match.homeTeamName}
                        awayTeamName={match.awayTeamName}
                        lineups={match.lineups}
                    />
                );
            case 'stats':
                return (
                    <StatsComparison
                        stats={match.stats}
                        homeTeamName={match.homeTeamName}
                        awayTeamName={match.awayTeamName}
                        homeColor={homeTeam?.primaryColor}
                        awayColor={awayTeam?.primaryColor}
                    />
                );
            case 'h2h':
                return <HeadToHeadView homeTeam={homeTeam} awayTeam={awayTeam} />;
            case 'overview':
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Match Events */}
                        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Match Events</h3>
                            <div className="space-y-6 relative">
                                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2"></div>
                                {match.events.map((event: any, index: number) => (
                                    <div key={index} className={`flex items-center ${event.team === 'home' ? 'justify-start' : 'justify-end'} relative`}>
                                        <div className={`w-[45%] ${event.team === 'home' ? 'text-right pr-4' : 'text-left pl-4 order-last'}`}>
                                            <span className="font-bold text-gray-900 block text-lg leading-none">{event.player}</span>
                                            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1 block">{event.detail}</span>
                                        </div>
                                        <div className={`absolute left-1/2 -translate-x-1/2 w-10 h-10 border-2 rounded-full flex items-center justify-center z-10 text-sm font-bold shadow-sm ${event.team === 'home' ? 'bg-white border-mwiri-blue text-mwiri-blue' : 'bg-white border-mwiri-gold text-mwiri-gold-dark'
                                            }`}>
                                            {event.time}'
                                        </div>
                                        <div className={`w-[45%] ${event.team === 'home' ? 'pl-4' : 'pr-4 text-right'}`}>
                                            {event.type === 'goal' && <span className="text-2xl">⚽</span>}
                                            {event.type === 'card' && (event.cardType === 'yellow' ? <span className="text-2xl">🟨</span> : <span className="text-2xl">🟥</span>)}
                                            {event.type === 'sub' && <span className="text-2xl">🔄</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mini Stats Summary */}
                        <div className="md:col-span-1">
                            <StatsComparison
                                stats={match.stats}
                                homeTeamName={match.homeTeamName}
                                awayTeamName={match.awayTeamName}
                                homeColor={homeTeam?.primaryColor}
                                awayColor={awayTeam?.primaryColor}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen pb-12">
            <MatchHero match={match} />
            <MatchTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default MatchCentreClient;
