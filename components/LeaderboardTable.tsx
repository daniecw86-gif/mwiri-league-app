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
        <div className="crystal-glass rounded-2xl overflow-hidden crystal-float">
            <div className="gradient-mwiri px-6 py-4 border-b border-white/10">
                <h3 className="font-barlow font-black text-white text-lg">{title}</h3>
                <p className="text-white/60 text-xs mt-1">Top {data.length} performers</p>
            </div>
            <div className="p-5 space-y-3">
                {data.map((item) => {
                    const percentage = (item.value / maxValue) * 100;
                    const medal = getMedalIcon(item.rank);

                    return (
                        <div key={item.rank} className="group row-hover cursor-pointer p-3 rounded-xl transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3 flex-1">
                                    {/* Rank/Medal */}
                                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                        {medal ? (
                                            <span className="text-2xl">{medal}</span>
                                        ) : (
                                            <span className="text-sm font-bold text-white/40">{item.rank}</span>
                                        )}
                                    </div>

                                    {/* Player Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-white truncate">{item.name}</p>
                                        <p className="text-xs text-white/50 font-medium">{item.team}</p>
                                    </div>
                                </div>

                                {/* Value Badge */}
                                <div className="flex-shrink-0">
                                    <span className="inline-flex items-center justify-center min-w-[3rem] h-10 px-3 rounded-lg bg-mwiri-gold text-mwiri-blue-deep font-black text-base shadow-sm">
                                        {item.value}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-mwiri-gold to-mwiri-yellow transition-all duration-500 rounded-full"
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
