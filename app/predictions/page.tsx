'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fixtures } from '../../data/fixtures';
import { teams } from '../../data/teams';
import { Prediction, UserPredictionStats } from '../../types/predictions';
import {
    getPredictions,
    savePrediction,
    calculateUserStats,
    isMatchPlayed,
    getMatchResult,
    getPrediction,
} from '../../utils/predictionUtils';

// Get team logo by name
const getTeamLogo = (teamName: string) => {
    const team = teams.find(t => t.name === teamName);
    return team?.logo || null;
};

// Prediction Card Component
const PredictionCard = ({
    match,
    onPredictionChange,
    existingPrediction,
}: {
    match: { id: number; homeTeam: string; awayTeam: string; time?: string; venue?: string };
    onPredictionChange: (prediction: Prediction) => void;
    existingPrediction?: Prediction;
}) => {
    const [selected, setSelected] = useState<'home' | 'draw' | 'away' | null>(
        existingPrediction?.predictedOutcome ?? null
    );

    const played = isMatchPlayed(match.id);
    const result = played ? getMatchResult(match.id) : null;
    const homeLogo = getTeamLogo(match.homeTeam);
    const awayLogo = getTeamLogo(match.awayTeam);

    const handleSelect = (outcome: 'home' | 'draw' | 'away') => {
        if (played) return;
        setSelected(outcome);
        onPredictionChange({
            matchId: match.id,
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            predictedOutcome: outcome,
            timestamp: Date.now(),
        });
    };

    // Check if prediction was correct
    const isCorrect = played && existingPrediction && result &&
        existingPrediction.predictedOutcome === result.actualOutcome;
    const isWrong = played && existingPrediction && result &&
        existingPrediction.predictedOutcome !== result.actualOutcome;

    return (
        <div className={`crystal-glass rounded-2xl overflow-hidden transition-all ${isCorrect ? 'ring-2 ring-green-500' : isWrong ? 'ring-2 ring-red-500' : ''
            }`}>
            {/* Match Info Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/50 font-medium">{match.time || 'TBD'}</span>
                {played && result && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10">
                        {result.homeScore} - {result.awayScore}
                    </span>
                )}
                {isCorrect && <span className="text-green-400 text-xs font-bold">✓ Correct!</span>}
                {isWrong && <span className="text-red-400 text-xs font-bold">✗ Wrong</span>}
            </div>

            {/* Teams */}
            <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Home Team */}
                    <div className="flex-1 text-center">
                        <div className="w-12 h-12 mx-auto relative bg-white/10 rounded-xl p-1.5 mb-2">
                            {homeLogo ? (
                                <Image src={homeLogo} alt={match.homeTeam} fill className="object-contain p-0.5" />
                            ) : (
                                <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-lg font-bold text-white/60">
                                    {match.homeTeam.charAt(0)}
                                </div>
                            )}
                        </div>
                        <p className="text-xs font-bold text-white truncate">{match.homeTeam}</p>
                    </div>

                    {/* VS */}
                    <div className="text-white/30 font-bold text-sm">VS</div>

                    {/* Away Team */}
                    <div className="flex-1 text-center">
                        <div className="w-12 h-12 mx-auto relative bg-white/10 rounded-xl p-1.5 mb-2">
                            {awayLogo ? (
                                <Image src={awayLogo} alt={match.awayTeam} fill className="object-contain p-0.5" />
                            ) : (
                                <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-lg font-bold text-white/60">
                                    {match.awayTeam.charAt(0)}
                                </div>
                            )}
                        </div>
                        <p className="text-xs font-bold text-white truncate">{match.awayTeam}</p>
                    </div>
                </div>
            </div>

            {/* Prediction Buttons */}
            <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                <button
                    onClick={() => handleSelect('home')}
                    disabled={played}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${selected === 'home'
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50'
                        }`}
                >
                    Home
                </button>
                <button
                    onClick={() => handleSelect('draw')}
                    disabled={played}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${selected === 'draw'
                            ? 'bg-yellow-500 text-white shadow-lg'
                            : 'bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50'
                        }`}
                >
                    Draw
                </button>
                <button
                    onClick={() => handleSelect('away')}
                    disabled={played}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${selected === 'away'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50'
                        }`}
                >
                    Away
                </button>
            </div>
        </div>
    );
};

// Stats Display Component
const StatsPanel = ({ stats }: { stats: UserPredictionStats }) => {
    return (
        <div className="crystal-glass rounded-2xl p-5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <span>📊</span> Your Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-black text-mwiri-gold">{stats.totalPoints}</p>
                    <p className="text-xs text-white/50 mt-1">Points</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-black text-white">{stats.accuracy}%</p>
                    <p className="text-xs text-white/50 mt-1">Accuracy</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-black text-green-400">{stats.correctPredictions}</p>
                    <p className="text-xs text-white/50 mt-1">Correct</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-black text-blue-400">{stats.streak}</p>
                    <p className="text-xs text-white/50 mt-1">Streak 🔥</p>
                </div>
            </div>
            {stats.bestStreak > 0 && (
                <p className="text-xs text-white/40 text-center mt-3">
                    Best streak: {stats.bestStreak} correct in a row
                </p>
            )}
        </div>
    );
};

export default function PredictionsPage() {
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [stats, setStats] = useState<UserPredictionStats | null>(null);
    const [mounted, setMounted] = useState(false);

    // Load predictions on mount
    useEffect(() => {
        setMounted(true);
        setPredictions(getPredictions());
        setStats(calculateUserStats());
    }, []);

    const handlePredictionChange = useCallback((prediction: Prediction) => {
        savePrediction(prediction);
        setPredictions(getPredictions());
        setStats(calculateUserStats());
    }, []);

    // Get all matches from fixtures
    const allMatches = fixtures.flatMap(fixture => fixture.matches);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white/50">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-mwiri-blue via-mwiri-blue-dark to-mwiri-blue-deep text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="predict-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                                <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#predict-grid)" />
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <span className="text-2xl">🔮</span>
                        <span className="text-sm font-bold uppercase tracking-wider text-mwiri-yellow">Predictions</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Match <span className="text-mwiri-yellow">Predictions</span>
                    </h1>

                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Predict match outcomes and track your accuracy. Earn points for correct predictions!
                    </p>

                    {/* Points System */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                            <span className="text-mwiri-yellow font-bold">+3</span>
                            <span className="text-xs text-blue-100 ml-2">Correct Outcome</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                            <span className="text-mwiri-yellow font-bold">+8</span>
                            <span className="text-xs text-blue-100 ml-2">Exact Score</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Panel */}
                {stats && stats.totalPredictions > 0 && (
                    <div className="mb-8 -mt-8 relative z-10">
                        <StatsPanel stats={stats} />
                    </div>
                )}

                {/* Predictions Summary */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Upcoming Matches</h2>
                    <span className="text-sm text-white/50">
                        {predictions.length} predictions made
                    </span>
                </div>

                {/* Match Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allMatches.map(match => (
                        <PredictionCard
                            key={match.id}
                            match={match}
                            onPredictionChange={handlePredictionChange}
                            existingPrediction={getPrediction(match.id)}
                        />
                    ))}
                </div>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link
                        href="/fantasy"
                        className="inline-flex items-center gap-2 text-mwiri-gold hover:text-white transition-colors font-bold"
                    >
                        ← Back to Fantasy Hub
                    </Link>
                </div>
            </div>
        </div>
    );
}
