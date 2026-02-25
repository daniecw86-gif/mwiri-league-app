import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import StatsCard from '../../components/StatsCard';
import LeaderboardTable from '../../components/LeaderboardTable';
import RedCards from '../../components/RedCards';
import { statsData } from '../../data/stats';

export const metadata: Metadata = {
    title: 'Stats Centre',
    description: 'Player and club statistics for the Mwiri League — top scorers, assists, clean sheets, and more.',
};

const StatsPage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="crystal-glass border-b border-mwiri-gold/20 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-barlow text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
                        📊 Stats Centre
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl">
                        Dive deep into the numbers. Explore comprehensive statistics for players and clubs in the Mwiri League.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-14 relative z-10">
                    {statsData.topScorers.length > 0 && (
                        <StatsCard
                            title="Golden Boot"
                            player={statsData.topScorers[0]}
                            statLabel="Goals"
                            linkHref="#"
                        />
                    )}
                    {statsData.topAssists.length > 0 && (
                        <StatsCard
                            title="Playmaker"
                            player={statsData.topAssists[0]}
                            statLabel="Assists"
                            linkHref="#"
                        />
                    )}
                    {statsData.cleanSheets.length > 0 && (
                        <StatsCard
                            title="Golden Glove"
                            player={statsData.cleanSheets[0]}
                            statLabel="Clean Sheets"
                            linkHref="#"
                        />
                    )}
                </div>

                {/* Leaderboards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LeaderboardTable
                        title="Top Scorers"
                        data={statsData.topScorers}
                        valueLabel="Goals"
                    />
                    <LeaderboardTable
                        title="Most Assists"
                        data={statsData.topAssists}
                        valueLabel="Assists"
                    />
                    <LeaderboardTable
                        title="Clean Sheets"
                        data={statsData.cleanSheets}
                        valueLabel="Clean Sheets"
                    />

                    {/* Red Cards */}
                    <RedCards />

                    {/* Club Stats Table */}
                    <div className="crystal-glass rounded-2xl overflow-hidden crystal-float">
                        <div className="gradient-gold px-6 py-4 flex justify-between items-center">
                            <h3 className="font-barlow font-bold text-mwiri-blue-deep">Club Goals</h3>
                            <span className="text-xs font-bold text-mwiri-blue-deep/60 uppercase tracking-wider">Top 5</span>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="text-white/50 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-3 font-medium w-12">Pos</th>
                                    <th className="px-6 py-3 font-medium">Club</th>
                                    <th className="px-6 py-3 font-medium text-right">Goals</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {statsData.clubStats.map((item) => (
                                    <tr key={item.rank} className="row-hover">
                                        <td className="px-6 py-4 font-bold text-white">{item.rank}</td>
                                        <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                                        <td className="px-6 py-4 font-bold text-mwiri-gold text-right">{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-white/5 px-6 py-3 border-t border-white/10 text-center">
                            <Link href="/table" className="text-sm font-bold text-mwiri-gold hover:text-white transition-colors">
                                View Full Table
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StatsPage;
