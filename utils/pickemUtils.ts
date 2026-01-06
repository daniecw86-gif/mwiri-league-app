/**
 * Fantasy Pick'em Game Utilities
 * Handles localStorage persistence and points calculation
 */

import { FantasyGameState, FantasyTeam, FantasyPick, FANTASY_POINTS, FANTASY_CONFIG } from '../types/fantasy';
import { Player } from '../types';
import { players } from '../data/players';

const STORAGE_KEY = 'mwiri_fantasy_pickem';

// =====================================================
// LOCAL STORAGE HELPERS
// =====================================================

export function loadPickemState(): FantasyGameState {
    if (typeof window === 'undefined') {
        return getInitialGameState();
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error('Failed to load fantasy game state:', error);
    }

    return getInitialGameState();
}

export function savePickemState(state: FantasyGameState): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save fantasy game state:', error);
    }
}

export function getInitialGameState(): FantasyGameState {
    return {
        currentMatchweek: 1,
        teams: [],
        totalPoints: 0,
        bestWeekPoints: 0,
        bestWeek: null,
    };
}

export function resetPickemState(): FantasyGameState {
    const initial = getInitialGameState();
    savePickemState(initial);
    return initial;
}

// =====================================================
// PLAYER COST CALCULATION
// =====================================================

export function calculatePlayerCost(player: Player): number {
    let cost = FANTASY_CONFIG.minPlayerCost;

    // Add based on goals
    if (player.goals && player.goals > 0) {
        cost += Math.min(player.goals * 2, 10);
    }

    // Add based on assists
    if (player.assists && player.assists > 0) {
        cost += Math.min(player.assists, 5);
    }

    return Math.min(cost, FANTASY_CONFIG.maxPlayerCost);
}

// =====================================================
// POINTS CALCULATION
// =====================================================

export function calculatePlayerPoints(player: Player): number {
    let points = 0;

    if (player.goals && player.goals > 0) {
        points += player.goals * FANTASY_POINTS.goal;
    }

    if (player.assists && player.assists > 0) {
        points += player.assists * FANTASY_POINTS.assist;
    }

    if (player.cleanSheets && player.cleanSheets > 0) {
        if (player.position === 'GK' || player.position === 'DEF') {
            points += player.cleanSheets * FANTASY_POINTS.cleanSheet;
        }
    }

    if (player.yellowCards && player.yellowCards > 0) {
        points += player.yellowCards * FANTASY_POINTS.yellowCard;
    }

    if (player.redCards && player.redCards > 0) {
        points += player.redCards * FANTASY_POINTS.redCard;
    }

    return points;
}

export function calculateTeamPoints(picks: FantasyPick[]): number {
    return picks.reduce((total, pick) => {
        const player = players.find(p => p.id === pick.playerId);
        return total + (player ? calculatePlayerPoints(player) : 0);
    }, 0);
}

// =====================================================
// TEAM MANAGEMENT
// =====================================================

export function canAddPlayer(currentPicks: FantasyPick[], player: Player, cost: number): { canAdd: boolean; reason?: string } {
    if (currentPicks.length >= FANTASY_CONFIG.maxPicks) {
        return { canAdd: false, reason: 'Maximum 5 players selected' };
    }

    if (currentPicks.some(p => p.playerId === player.id)) {
        return { canAdd: false, reason: 'Player already selected' };
    }

    const currentCost = currentPicks.reduce((sum, p) => sum + p.cost, 0);
    if (currentCost + cost > FANTASY_CONFIG.budget) {
        return { canAdd: false, reason: 'Not enough budget' };
    }

    return { canAdd: true };
}

export function saveTeam(matchweek: number, picks: FantasyPick[]): FantasyGameState {
    const state = loadPickemState();

    const totalCost = picks.reduce((sum, p) => sum + p.cost, 0);
    const totalPoints = calculateTeamPoints(picks);

    const newTeam: FantasyTeam = {
        matchweek,
        picks,
        totalCost,
        totalPoints,
        createdAt: new Date().toISOString(),
    };

    const existingIndex = state.teams.findIndex(t => t.matchweek === matchweek);
    if (existingIndex >= 0) {
        state.teams[existingIndex] = newTeam;
    } else {
        state.teams.push(newTeam);
    }

    state.totalPoints = state.teams.reduce((sum, t) => sum + t.totalPoints, 0);

    if (totalPoints > state.bestWeekPoints) {
        state.bestWeekPoints = totalPoints;
        state.bestWeek = matchweek;
    }

    savePickemState(state);
    return state;
}

export function getTeamForMatchweek(matchweek: number): FantasyTeam | null {
    const state = loadPickemState();
    return state.teams.find(t => t.matchweek === matchweek) || null;
}

// =====================================================
// GET AVAILABLE PLAYERS
// =====================================================

export function getAvailablePlayers(): Array<Player & { cost: number; fantasyPoints: number }> {
    return players.map(player => ({
        ...player,
        cost: calculatePlayerCost(player),
        fantasyPoints: calculatePlayerPoints(player),
    }));
}
