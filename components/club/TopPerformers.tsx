import React from 'react';
import { Player } from '../../types';
import Link from 'next/link';

interface TopPerformersProps {
    topScorer: Player | null;
    mostCarded: Player | null;
    teamId: number;
}

const TopPerformers: React.FC<TopPerformersProps> = ({ topScorer, mostCarded, teamId }) => {
    return (
        <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                Top Performers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Scorer */}
                {topScorer ? (
                    <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden hover-lift">
                        <div className="gradient-gold p-4">
                            <div className="flex items-center gap-2 text-white">
                                <span className="text-2xl">🥇</span>
                                <h3 className="font-black text-lg">Top Scorer</h3>
                            </div>
                        </div>
                        <div className="p-6">
                            <Link href={`/players/${topScorer.id}`} className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mwiri-yellow to-mwiri-gold flex items-center justify-center text-white font-black text-2xl shadow-lg">
                                        {topScorer.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-mwiri-blue transition-colors">
                                            {topScorer.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 font-medium">
                                            {topScorer.position}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 font-medium">Goals</span>
                                <div className="flex items-center gap-2">
                                    <div className="text-4xl font-black bg-gradient-to-r from-mwiri-yellow to-mwiri-gold bg-clip-text text-transparent">
                                        {topScorer.goals || 0}
                                    </div>
                                    <span className="text-2xl">⚽</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
                        <div className="text-4xl mb-2">⚽</div>
                        <p className="text-gray-500 font-medium">No goals scored yet</p>
                    </div>
                )}

                {/* Most Carded */}
                {mostCarded ? (
                    <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden hover-lift">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4">
                            <div className="flex items-center gap-2 text-white">
                                <span className="text-2xl">⚠️</span>
                                <h3 className="font-black text-lg">Discipline</h3>
                            </div>
                        </div>
                        <div className="p-6">
                            <Link href={`/players/${mostCarded.id}`} className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                                        {mostCarded.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-mwiri-blue transition-colors">
                                            {mostCarded.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 font-medium">
                                            {mostCarded.position}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 font-medium">Yellow Cards</span>
                                <div className="flex items-center gap-2">
                                    <div className="text-4xl font-black text-yellow-600">
                                        {mostCarded.yellowCards || 0}
                                    </div>
                                    <span className="text-2xl">🟨</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
                        <div className="text-4xl mb-2">🟨</div>
                        <p className="text-gray-500 font-medium">Clean discipline record</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopPerformers;
