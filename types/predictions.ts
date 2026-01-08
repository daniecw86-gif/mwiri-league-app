// Types for the Match Predictions feature

export interface Prediction {
    matchId: number;
    homeTeam: string;
    awayTeam: string;
    predictedOutcome: 'home' | 'draw' | 'away';
    predictedHomeScore?: number;
    predictedAwayScore?: number;
    timestamp: number;
}

export interface MatchResult {
    matchId: number;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    actualOutcome: 'home' | 'draw' | 'away';
}

export interface PredictionResult extends Prediction {
    isCorrect: boolean;
    actualOutcome?: 'home' | 'draw' | 'away';
    actualHomeScore?: number;
    actualAwayScore?: number;
    points: number;
}

export interface UserPredictionStats {
    totalPredictions: number;
    correctPredictions: number;
    accuracy: number;
    totalPoints: number;
    streak: number;
    bestStreak: number;
}
