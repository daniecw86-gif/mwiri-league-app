import React from 'react';
import { teams } from '../../../data/teams';
import { players } from '../../../data/players';
import Link from 'next/link';
import Image from 'next/image';
import SquadTable from '../../../components/SquadTable';
import TopPerformers from '../../../components/club/TopPerformers';
import TeamFixtures from '../../../components/club/TeamFixtures';
import TeamResults from '../../../components/club/TeamResults';
import TeamStatsVisual from '../../../components/club/TeamStatsVisual';
import {
    getTeamFixtures,
    getTeamResults,
    getTeamTopScorer,
    getTeamMostCarded,
    calculateWinRate,
    calculateGoalsPerGame,
    calculateCleanSheets,
    getTeamPosition,
} from '../../../utils/teamUtils';

export async function generateStaticParams() {
    return teams.map((team) => ({
        id: team.id.toString(),
    }));
}

const ClubProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const team = teams.find((t) => t.id === parseInt(id));
    const teamPlayers = players.filter(p => p.teamId === parseInt(id));

    if (!team) {
        return <div>Team not found</div>;
    }

    // Calculate team statistics
    const topScorer = getTeamTopScorer(team.id);
    const mostCarded = getTeamMostCarded(team.id);
    const upcomingFixtures = getTeamFixtures(team.name, 5);
    const recentResults = getTeamResults(team.name, 5);
    const winRate = calculateWinRate(team);
    const goalsPerGame = calculateGoalsPerGame(team);
    const cleanSheets = calculateCleanSheets(team.name);
    const position = getTeamPosition(team.id);

    return (
        <div className="min-h-screen bg-transparent pb-12">
            {/* Enhanced Hero Section */}
            <div className="relative overflow-hidden">
                {/* Gradient Background */}
                <div
                    className="absolute inset-0 opacity-90"
                    style={{
                        background: `linear-gradient(135deg, ${team.primaryColor || '#002845'} 0%, #001529 100%)`
                    }}
                ></div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="2" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                    </svg>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Hero Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
                    <div className="flex flex-col md:flex-row items-end gap-8">
                        {/* Logo */}
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-4 shadow-premium-xl relative z-10 border-4 border-white flex-shrink-0">
                            {team.logo ? (
                                <Image
                                    src={team.logo}
                                    alt={team.name}
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div
                                    className="w-full h-full rounded-full flex items-center justify-center text-4xl font-bold text-white"
                                    style={{ backgroundColor: team.primaryColor || '#002845' }}
                                >
                                    {team.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 text-white mb-4 md:mb-0">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3">{team.name}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium text-gray-200">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-mwiri-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {team.stadium}
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-mwiri-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    Manager: {team.manager}
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-mwiri-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    Est. {team.founded}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Ribbon */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl shadow-premium-xl p-4 text-center border-t-4" style={{ borderTopColor: team.primaryColor || '#005696' }}>
                            <div className="text-3xl font-black" style={{ color: team.primaryColor || '#005696' }}>#{position}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Position</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-premium-xl p-4 text-center border-t-4" style={{ borderTopColor: team.primaryColor || '#005696' }}>
                            <div className="text-3xl font-black text-green-600">{team.points}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Points</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-premium-xl p-4 text-center border-t-4" style={{ borderTopColor: team.primaryColor || '#005696' }}>
                            <div className="text-3xl font-black text-orange-600">{team.gf}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Goals</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-premium-xl p-4 text-center border-t-4" style={{ borderTopColor: team.primaryColor || '#005696' }}>
                            <div className="text-3xl font-black text-purple-600">{winRate}%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Win Rate</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Top Performers */}
                        <TopPerformers
                            topScorer={topScorer}
                            mostCarded={mostCarded}
                            teamId={team.id}
                        />

                        {/* Club Overview */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                <span className="text-2xl">📖</span>
                                Club Overview
                            </h2>
                            <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 p-8">
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                                    {team.description}
                                </p>
                            </div>
                        </section>

                        {/* Form Guide */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                <span className="text-2xl">📈</span>
                                Recent Form
                            </h2>
                            <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 p-8">
                                <div className="flex gap-3 flex-wrap">
                                    {team.form.map((result, index) => (
                                        <div
                                            key={index}
                                            className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black text-white shadow-sm
                                                ${result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}
                                            title={result === 'W' ? 'Win' : result === 'D' ? 'Draw' : 'Loss'}
                                        >
                                            {result}
                                        </div>
                                    ))}
                                    {team.form.length === 0 && (
                                        <p className="text-gray-500">No matches played yet</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Squad List */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                <span className="text-2xl">👥</span>
                                Squad List
                            </h2>
                            <SquadTable players={teamPlayers} />
                        </section>
                    </div>

                    {/* Right Column: Stats & Fixtures */}
                    <div className="space-y-8">
                        {/* Visual Statistics */}
                        <TeamStatsVisual
                            team={team}
                            winRate={winRate}
                            goalsPerGame={goalsPerGame}
                            cleanSheets={cleanSheets}
                            position={position}
                        />

                        {/* Upcoming Fixtures */}
                        <TeamFixtures
                            fixtures={upcomingFixtures}
                            teamName={team.name}
                        />

                        {/* Recent Results */}
                        <TeamResults
                            results={recentResults}
                            teamName={team.name}
                        />

                        {/* Club Details */}
                        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4" style={{ background: `linear-gradient(135deg, ${team.primaryColor || '#C5A028'} 0%, ${team.primaryColor || '#C5A028'}dd 100%)` }}>
                                <h3 className="font-black text-white flex items-center gap-2">
                                    <span>ℹ️</span>
                                    Club Details
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Nickname</span>
                                    <span className="font-black text-gray-900">{team.nickname}</span>
                                </div>
                                <div className="h-px bg-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Capacity</span>
                                    <span className="font-black text-gray-900">{team.capacity}</span>
                                </div>
                                <div className="h-px bg-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Founded</span>
                                    <span className="font-black text-gray-900">{team.founded}</span>
                                </div>
                                <div className="h-px bg-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Website</span>
                                    <a href={`http://${team.website}`} target="_blank" rel="noopener noreferrer" className="font-black text-mwiri-blue hover:underline">
                                        {team.website}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClubProfile;
