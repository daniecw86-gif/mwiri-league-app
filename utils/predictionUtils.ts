import { Prediction, PredictionResult, UserPredictionStats, MatchResult } from '../types/predictions';
import { results } from '../data/results';
import { MatchData } from '../types';

const PREDICTIONS_KEY = 'mwiri_predictions';
const STATS_KEY = 'mwiri_prediction_stats';

// Get all predictions from localStorage
export const getPredictions = (): Prediction[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(PREDICTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
};

// Save prediction to localStorage
export const savePrediction = (prediction: Prediction): void => {
    const predictions = getPredictions();
    const existingIndex = predictions.findIndex(p => p.matchId === prediction.matchId);

    if (existingIndex >= 0) {
        predictions[existingIndex] = prediction;
    } else {
        predictions.push(prediction);
    }

    localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(predictions));
};

// Remove prediction
export const removePrediction = (matchId: number): void => {
    const predictions = getPredictions().filter(p => p.matchId !== matchId);
    localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(predictions));
};

// Get all played matches with their results
export const getPlayedMatches = (): MatchResult[] => {
    const playedMatches: MatchResult[] = [];

    results.forEach(fixture => {
        fixture.matches.forEach((match: MatchData) => {
            if (match.homeScore !== undefined && match.awayScore !== undefined) {
                let outcome: 'home' | 'draw' | 'away' = 'draw';
                if (match.homeScore > match.awayScore) outcome = 'home';
                else if (match.awayScore > match.homeScore) outcome = 'away';

                playedMatches.push({
                    matchId: match.id,
                    homeTeam: match.homeTeam,
                    awayTeam: match.awayTeam,
                    homeScore: match.homeScore,
                    awayScore: match.awayScore,
                    actualOutcome: outcome,
                });
            }
        });
    });

    return playedMatches;
};

// Check if a match has been played
export const isMatchPlayed = (matchId: number): boolean => {
    return getPlayedMatches().some(m => m.matchId === matchId);
};

// Get match result by ID
export const getMatchResult = (matchId: number): MatchResult | undefined => {
    return getPlayedMatches().find(m => m.matchId === matchId);
};

// Calculate prediction results
export const calculatePredictionResults = (): PredictionResult[] => {
    const predictions = getPredictions();
    const playedMatches = getPlayedMatches();

    return predictions.map(prediction => {
        const result = playedMatches.find(m => m.matchId === prediction.matchId);

        if (!result) {
            return {
                ...prediction,
                isCorrect: false,
                points: 0,
            };
        }

        const isCorrect = prediction.predictedOutcome === result.actualOutcome;

        // Points system: 3 for correct outcome, 5 bonus for exact score
        let points = 0;
        if (isCorrect) {
            points = 3;
            if (prediction.predictedHomeScore === result.homeScore &&
                prediction.predictedAwayScore === result.awayScore) {
                points = 8; // Exact score bonus
            }
        }

        return {
            ...prediction,
            isCorrect,
            actualOutcome: result.actualOutcome,
            actualHomeScore: result.homeScore,
            actualAwayScore: result.awayScore,
            points,
        };
    });
};

// Calculate user stats
export const calculateUserStats = (): UserPredictionStats => {
    const results = calculatePredictionResults();
    const completedPredictions = results.filter(r => r.actualOutcome !== undefined);

    if (completedPredictions.length === 0) {
        return {
            totalPredictions: results.length,
            correctPredictions: 0,
            accuracy: 0,
            totalPoints: 0,
            streak: 0,
            bestStreak: 0,
        };
    }

    const correct = completedPredictions.filter(r => r.isCorrect).length;
    const totalPoints = completedPredictions.reduce((sum, r) => sum + r.points, 0);

    // Calculate current streak
    let streak = 0;
    let bestStreak = 0;
    let currentStreak = 0;

    completedPredictions.forEach(r => {
        if (r.isCorrect) {
            currentStreak++;
            if (currentStreak > bestStreak) bestStreak = currentStreak;
        } else {
            currentStreak = 0;
        }
    });
    streak = currentStreak;

    return {
        totalPredictions: results.length,
        correctPredictions: correct,
        accuracy: Math.round((correct / completedPredictions.length) * 100),
        totalPoints,
        streak,
        bestStreak,
    };
};

// Get prediction for a specific match
export const getPrediction = (matchId: number): Prediction | undefined => {
    return getPredictions().find(p => p.matchId === matchId);
};
