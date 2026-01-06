import Link from 'next/link';

export default function FantasyHub() {
    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern.png')] bg-cover"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 flex items-center gap-3">
                        <span className="text-5xl">🎮</span>
                        Fantasy Games
                    </h1>
                    <p className="text-xl text-purple-100 max-w-2xl">
                        Build your dream team, predict match results, and compete with friends in the Mwiri League Fantasy Hub!
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-16 relative z-10">
                    <div className="bg-white rounded-2xl shadow-premium-xl p-6 text-center border border-gray-100">
                        <div className="text-4xl mb-2">🏆</div>
                        <div className="text-3xl font-black text-purple-600">0</div>
                        <div className="text-sm text-gray-600 font-medium mt-1">Dream Teams Created</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-premium-xl p-6 text-center border border-gray-100">
                        <div className="text-4xl mb-2">🎯</div>
                        <div className="text-3xl font-black text-green-600">0</div>
                        <div className="text-sm text-gray-600 font-medium mt-1">Predictions Made</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-premium-xl p-6 text-center border border-gray-100">
                        <div className="text-4xl mb-2">⚽</div>
                        <div className="text-3xl font-black text-blue-600">#-</div>
                        <div className="text-sm text-gray-600 font-medium mt-1">Fantasy Rank</div>
                    </div>
                </div>

                {/* Game Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Dream Team Builder */}
                    <Link href="/fantasy/dream-team">
                        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden hover-lift cursor-pointer group">
                            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-center">
                                <div className="text-6xl mb-4">🏆</div>
                                <h2 className="text-2xl font-black text-white">Dream Team Builder</h2>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Build your ultimate XI from all Mwiri League players. Choose your formation, pick the best players, and create your dream team!
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">✓</span>
                                        <span>Multiple formations available</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">✓</span>
                                        <span>Beautiful pitch visualization</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">✓</span>
                                        <span>Save & share your team</span>
                                    </div>
                                </div>
                                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-sm group-hover:shadow-lg">
                                    Build Dream Team →
                                </button>
                            </div>
                        </div>
                    </Link>

                    {/* Match Predictor */}
                    <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden opacity-60">
                        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 text-center">
                            <div className="text-6xl mb-4">🎯</div>
                            <h2 className="text-2xl font-black text-white">Match Predictor</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Predict upcoming match results and compete on the leaderboard. Earn points for accurate predictions!
                            </p>
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="text-gray-400">○</span>
                                    <span>Points for correct scores</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="text-gray-400">○</span>
                                    <span>Weekly leaderboards</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="text-gray-400">○</span>
                                    <span>Track prediction accuracy</span>
                                </div>
                            </div>
                            <button disabled className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-xl cursor-not-allowed">
                                Coming Soon
                            </button>
                        </div>
                    </div>

                    {/* Fantasy Pick'em */}
                    <Link href="/fantasy/pickem">
                        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden hover-lift cursor-pointer group">
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-center">
                                <div className="text-6xl mb-4">⚽</div>
                                <h2 className="text-2xl font-black text-white">Fantasy Pick&apos;em</h2>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Pick your weekly squad within budget. Earn points based on player performance and track your progress!
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">✓</span>
                                        <span>100 coin budget system</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">✓</span>
                                        <span>Pick 5 players each week</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-green-500">✓</span>
                                        <span>Points for goals, assists & more</span>
                                    </div>
                                </div>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm group-hover:shadow-lg">
                                    Play Now →
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* How It Works */}
                <div className="mt-16 bg-white rounded-2xl shadow-premium-lg border border-gray-100 p-8">
                    <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">How Fantasy Games Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">1️⃣</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Choose Your Game</h3>
                            <p className="text-gray-600 text-sm">
                                Pick from Dream Team Builder, Match Predictor, or Fantasy League
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">2️⃣</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Make Your Picks</h3>
                            <p className="text-gray-600 text-sm">
                                Select players, predict scores, or build your dream formation
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">3️⃣</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Compete & Win</h3>
                            <p className="text-gray-600 text-sm">
                                Share your team, climb leaderboards, and prove you're the best!
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
