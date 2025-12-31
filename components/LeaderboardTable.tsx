import React from 'react';

interface LeaderboardItem {
    rank: number;
    name: string;
    team: string;
    teamId: number;
    value: number;
    played?: number;
}

interface LeaderboardTableProps {
    title: string;
    data: LeaderboardItem[];
    valueLabel: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ title, data, valueLabel }) => {
    // Get max value for progress bar calculation
    const maxValue = Math.max(...data.map(item => item.value), 1);

    const getMedalIcon = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return null;
    };

    return (
        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden">
            <div className="gradient-blue px-6 py-4 border-b border-blue-800">
                <h3 className="font-black text-white text-lg">{title}</h3>
                <p className="text-blue-100 text-xs mt-1">Top {data.length} performers</p>
            </div>
            <div className="p-6 space-y-4">
                {data.map((item) => {
                    const percentage = (item.value / maxValue) * 100;
                    const medal = getMedalIcon(item.rank);

                    return (
                        <div key={item.rank} className="group hover-lift cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3 flex-1">
                                    {/* Rank/Medal */}
                                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                        {medal ? (
                                            <span className="text-2xl">{medal}</span>
                                        ) : (
                                            <span className="text-sm font-bold text-gray-400">{item.rank}</span>
                                        )}
                                    </div>

                                    {/* Player Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500 font-medium">{item.team}</p>
                                    </div>
                                </div>

                                {/* Value Badge */}
                                <div className="flex-shrink-0">
                                    <span className="inline-flex items-center justify-center min-w-[3rem] h-10 px-3 rounded-lg bg-gradient-to-br from-mwiri-blue to-mwiri-blue-dark text-white font-black text-base shadow-sm">
                                        {item.value}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-mwiri-yellow to-mwiri-gold transition-all duration-500 group-hover:from-mwiri-blue group-hover:to-mwiri-blue-dark rounded-full"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LeaderboardTable;
