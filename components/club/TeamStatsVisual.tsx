import React from 'react';
import { Team } from '../../types';

interface TeamStatsVisualProps {
    team: Team;
    winRate: number;
    goalsPerGame: number;
    cleanSheets: number;
    position: number;
}

const TeamStatsVisual: React.FC<TeamStatsVisualProps> = ({
    team,
    winRate,
    goalsPerGame,
    cleanSheets,
    position
}) => {
    // Calculate percentages for visual bars
    const goalsForPercentage = Math.min(100, (team.gf / 50) * 100); // Assuming 50 as max
    const goalsConcededPercentage = Math.min(100, (team.ga / 50) * 100);
    const winRatePercentage = winRate;

    return (
        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden">
            <div className="gradient-blue px-6 py-4">
                <h3 className="font-black text-white flex items-center gap-2">
                    <span>📊</span>
                    Team Statistics
                </h3>
            </div>

            <div className="p-6 space-y-6">
                {/* League Position */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-600">League Position</span>
                        <span className="text-3xl font-black text-mwiri-blue">#{position}</span>
                    </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Win Rate */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-gray-600">Win Rate</span>
                        <span className="text-lg font-black text-green-600">{winRate}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                            style={{ width: `${winRatePercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Goals Scored */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-gray-600">Goals Scored</span>
                        <span className="text-lg font-black text-orange-600">{team.gf}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                            style={{ width: `${goalsForPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Goals Conceded */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-gray-600">Goals Conceded</span>
                        <span className="text-lg font-black text-red-600">{team.ga}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                            style={{ width: `${goalsConcededPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Goals Per Game */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-gray-600">Goals/Game</span>
                        <span className="text-lg font-black text-purple-600">{goalsPerGame}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (goalsPerGame / 5) * 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Clean Sheets */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-gray-600">Clean Sheets</span>
                        <span className="text-lg font-black text-blue-600">{cleanSheets}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (cleanSheets / team.played) * 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-2xl font-black text-gray-900">{team.won}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Won</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-2xl font-black text-gray-900">{team.drawn}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Drawn</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-2xl font-black text-gray-900">{team.lost}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Lost</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamStatsVisual;
