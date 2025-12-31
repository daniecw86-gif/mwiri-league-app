import React from 'react';
import StatsCard from '../../components/StatsCard';
import LeaderboardTable from '../../components/LeaderboardTable';
import { statsData } from '../../data/stats';

const StatsPage = () => {
    return (
        <div className="min-h-screen bg-transparent pb-12">
            {/* Hero Section */}
            <div className="bg-mwiri-blue-deep text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Stats Centre</h1>
                    <p className="text-xl text-blue-200 max-w-2xl">
                        Dive deep into the numbers. Explore comprehensive statistics for players and clubs in the Mwiri League.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

                    {/* Club Stats Table (Reusing LeaderboardTable for simplicity, though props might need adjustment in a real app) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900">Club Goals</h3>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top 5</span>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white text-gray-500 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 font-medium w-12">Pos</th>
                                    <th className="px-6 py-3 font-medium">Club</th>
                                    <th className="px-6 py-3 font-medium text-right">Goals</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {statsData.clubStats.map((item: any) => (
                                    <tr key={item.rank} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900">{item.rank}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 font-bold text-mwiri-blue text-right">{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
                            <button className="text-sm font-bold text-mwiri-blue hover:text-mwiri-blue-dark transition-colors">
                                View Full Table
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StatsPage;
