import React from 'react';
import { players } from '../data/players';

const RedCards = () => {
    // Sort players by red cards descending
    const sortedPlayers = [...players]
        .filter(p => (p.redCards ?? 0) > 0)
        .sort((a, b) => (b.redCards ?? 0) - (a.redCards ?? 0))
        .slice(0, 10);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-premium-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 p-5 border-b border-red-800">
                <h3 className="font-black text-white text-xl tracking-tight flex items-center gap-2">
                    <span>🟥</span> Red Cards
                </h3>
                <p className="text-red-100 text-xs mt-1 font-medium">Players sent off this season</p>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {sortedPlayers.length > 0 ? (
                    sortedPlayers.map((player, index) => {
                        const rowBg = index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/50 dark:bg-slate-800/50';

                        return (
                            <div
                                key={player.id}
                                className={`row-hover px-5 py-4 flex items-center justify-between ${rowBg}`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Position */}
                                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                        <span className="text-sm font-bold text-gray-400 dark:text-gray-500">{index + 1}</span>
                                    </div>

                                    {/* Player Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 dark:text-white truncate">{player.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{player.teamName}</p>
                                    </div>
                                </div>

                                {/* Red Cards Badge */}
                                <div className="flex-shrink-0">
                                    <span className="inline-flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-lg bg-gradient-to-br from-red-500 to-red-700 text-white font-black text-lg shadow-sm">
                                        {player.redCards ?? 0}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="px-5 py-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">No red cards recorded yet. 🎉</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RedCards;
