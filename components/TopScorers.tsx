import React from 'react';
import { players } from '../data/players';

const TopScorers = () => {
    // Sort players by goals descending
    const sortedPlayers = [...players].sort((a, b) => b.goals - a.goals).slice(0, 15);

    const getMedalIcon = (position: number) => {
        if (position === 1) return '🥇';
        if (position === 2) return '🥈';
        if (position === 3) return '🥉';
        return null;
    };

    return (
        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden">
            {/* Gradient Header */}
            <div className="gradient-blue p-5 border-b border-blue-800">
                <h3 className="font-black text-white text-xl tracking-tight flex items-center gap-2">
                    <span>⚽</span> Top Scorers
                </h3>
                <p className="text-blue-100 text-xs mt-1 font-medium">Leading goal scorers this season</p>
            </div>

            <div className="divide-y divide-gray-100">
                {sortedPlayers.map((player, index) => {
                    const position = index + 1;
                    const medal = getMedalIcon(position);
                    const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50';

                    return (
                        <div
                            key={player.id}
                            className={`row-hover px-5 py-4 flex items-center justify-between ${rowBg}`}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                {/* Position/Medal */}
                                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                    {medal ? (
                                        <span className="text-2xl">{medal}</span>
                                    ) : (
                                        <span className="text-sm font-bold text-gray-400">{position}</span>
                                    )}
                                </div>

                                {/* Player Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 truncate">{player.name}</p>
                                    <p className="text-xs text-gray-500 font-medium">{player.teamName}</p>
                                </div>
                            </div>

                            {/* Goals Badge */}
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-lg bg-gradient-to-br from-mwiri-yellow to-mwiri-gold text-mwiri-blue-dark font-black text-lg shadow-sm">
                                    {player.goals}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <a href="/stats" className="text-sm font-bold text-mwiri-blue hover:text-mwiri-blue-dark transition-colors flex items-center justify-end gap-1">
                    View Full Stats <span>→</span>
                </a>
            </div>
        </div>
    );
};

export default TopScorers;
