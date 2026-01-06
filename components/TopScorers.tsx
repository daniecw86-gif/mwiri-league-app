import React from 'react';
import { players } from '../data/players';
import Link from 'next/link';

const TopScorers = () => {
    // Sort players by goals descending
    const sortedPlayers = [...players].sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0)).slice(0, 10);

    const getMedalIcon = (position: number) => {
        if (position === 1) return '🥇';
        if (position === 2) return '🥈';
        if (position === 3) return '🥉';
        return null;
    };

    return (
        <div className="crystal-glass rounded-2xl overflow-hidden">
            {/* Golden Header */}
            <div className="gradient-gold p-4 border-b border-mwiri-gold-dark/30">
                <h3 className="font-barlow font-black text-mwiri-green-deep text-lg tracking-tight flex items-center gap-2">
                    <span>⚽</span> Top Scorers
                </h3>
                <p className="text-mwiri-green-deep/70 text-xs mt-0.5 font-medium">Leading goal scorers this season</p>
            </div>

            <div className="divide-y divide-white/5">
                {sortedPlayers.map((player, index) => {
                    const position = index + 1;
                    const medal = getMedalIcon(position);
                    const isTopScorer = position === 1;

                    return (
                        <div
                            key={player.id}
                            className={`row-hover px-4 py-3 flex items-center justify-between ${isTopScorer ? 'spotlight bg-mwiri-gold/5' : ''}`}
                        >
                            <div className="flex items-center gap-3 flex-1 relative z-10">
                                {/* Position/Medal */}
                                <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                                    {medal ? (
                                        <span className="text-xl">{medal}</span>
                                    ) : (
                                        <span className="text-sm font-bold text-white/40">{position}</span>
                                    )}
                                </div>

                                {/* Player Avatar */}
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${isTopScorer
                                        ? 'bg-gradient-to-br from-mwiri-gold to-mwiri-gold-dark text-mwiri-green-deep shadow-lg'
                                        : 'bg-white/10 text-white/70'
                                    }`}>
                                    {player.name.charAt(0)}
                                </div>

                                {/* Player Info */}
                                <div className="flex-1 min-w-0">
                                    <p className={`font-bold truncate ${isTopScorer ? 'text-mwiri-gold' : 'text-white'}`}>
                                        {player.name}
                                    </p>
                                    <p className="text-xs text-white/40 font-medium">{player.teamName}</p>
                                </div>
                            </div>

                            {/* Goals Badge */}
                            <div className="flex-shrink-0 relative z-10">
                                <span className={`inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2.5 rounded-xl font-black text-base ${isTopScorer
                                        ? 'bg-gradient-to-br from-mwiri-gold to-mwiri-gold-dark text-mwiri-green-deep shadow-lg text-shadow-gold'
                                        : 'bg-white/10 text-mwiri-gold'
                                    }`}>
                                    {player.goals ?? 0}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="bg-white/5 px-4 py-3 border-t border-white/5">
                <Link href="/stats" className="text-sm font-bold text-mwiri-gold/80 hover:text-mwiri-gold transition-colors flex items-center justify-end gap-1">
                    View Full Stats <span>→</span>
                </Link>
            </div>
        </div>
    );
};

export default TopScorers;
