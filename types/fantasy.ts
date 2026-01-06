/**
 * Fantasy Pick'em Game Types
 */

export interface FantasyPick {
    playerId: number;
    playerName: string;
    teamName: string;
    teamId: number;
    position: string;
    cost: number;
}

export interface FantasyTeam {
    matchweek: number;
    picks: FantasyPick[];
    totalCost: number;
    totalPoints: number;
    createdAt: string;
}

export interface FantasyPlayerStats {
    playerId: number;
    goals: number;
    assists: number;
    cleanSheets: number;
    yellowCards: number;
    redCards: number;
    points: number;
}

export interface FantasyLeaderboardEntry {
    matchweek: number;
    points: number;
    picks: FantasyPick[];
}

export interface FantasyGameState {
    currentMatchweek: number;
    teams: FantasyTeam[];
    totalPoints: number;
    bestWeekPoints: number;
    bestWeek: number | null;
}

// Points configuration
export const FANTASY_POINTS = {
    goal: 5,
    assist: 3,
    cleanSheet: 4,
    yellowCard: -1,
    redCard: -3,
} as const;

// Budget configuration
export const FANTASY_CONFIG = {
    budget: 100,
    maxPicks: 5,
    minPlayerCost: 10,
    maxPlayerCost: 25,
} as const;
