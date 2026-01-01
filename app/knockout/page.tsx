import React from 'react';
import KnockoutBracket from '../../components/KnockoutBracket';

export const metadata = {
    title: 'Knockout Stage | Mwiri League',
    description: 'View the knockout stage bracket for the Mwiri League playoffs',
};

export default function KnockoutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-mwiri-blue via-mwiri-blue-dark to-mwiri-blue-deep text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="knockout-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#knockout-grid)" />
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <span className="text-2xl">🏆</span>
                        <span className="text-sm font-bold uppercase tracking-wider text-mwiri-yellow">Knockout Stage</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Road to the <span className="text-mwiri-yellow">Championship</span>
                    </h1>

                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        The top teams from each group battle it out in the elimination rounds.
                        One defeat and you&apos;re out. Only the best will lift the trophy!
                    </p>

                    {/* Format Info */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                            <p className="text-2xl font-black text-mwiri-yellow">8</p>
                            <p className="text-xs text-blue-100 uppercase tracking-wider">Teams</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                            <p className="text-2xl font-black text-mwiri-yellow">7</p>
                            <p className="text-xs text-blue-100 uppercase tracking-wider">Matches</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                            <p className="text-2xl font-black text-mwiri-yellow">1</p>
                            <p className="text-xs text-blue-100 uppercase tracking-wider">Champion</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bracket Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Tournament Bracket</h2>
                        <p className="text-gray-500 text-sm">Scroll horizontally on mobile to view the full bracket</p>
                    </div>

                    <KnockoutBracket />
                </div>
            </div>

            {/* Format Explanation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                    <h3 className="text-xl font-black text-gray-900 mb-4">📋 Tournament Format</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                <span className="text-xl">🎯</span>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Quarter-Finals</h4>
                            <p className="text-sm text-gray-600">Top 4 teams from each group qualify. Single elimination matches determine who advances.</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                                <span className="text-xl">⚔️</span>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">Semi-Finals</h4>
                            <p className="text-sm text-gray-600">The remaining 4 teams compete for a spot in the grand final. High stakes, no second chances.</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                                <span className="text-xl">🏆</span>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">The Final</h4>
                            <p className="text-sm text-gray-600">Two best teams battle for the championship. Glory awaits the victor!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
