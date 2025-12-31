import { teams } from '../data/teams';
import { players } from '../data/players';
import { fixtures } from '../data/fixtures';
import { results } from '../data/results';
import { Team, Player, MatchData } from '../types';

/**
 * Get all fixtures for a specific team
 */
export function getTeamFixtures(teamName: string, limit?: number): MatchData[] {
    const teamFixtures: MatchData[] = [];

    fixtures.forEach(group => {
        group.matches.forEach(match => {
            if (match.homeTeam === teamName || match.awayTeam === teamName) {
                teamFixtures.push({
                    ...match,
                    date: group.date
                });
            }
        });
    });

    return limit ? teamFixtures.slice(0, limit) : teamFixtures;
}

/**
 * Get all results for a specific team
 */
export function getTeamResults(teamName: string, limit?: number): MatchData[] {
    const teamResults: MatchData[] = [];

    results.forEach(group => {
        group.matches.forEach(match => {
            if (match.homeTeam === teamName || match.awayTeam === teamName) {
                teamResults.push({
                    ...match,
                    date: group.date
                });
            }
        });
    });

    // Return most recent first
    const sortedResults = teamResults.reverse();
    return limit ? sortedResults.slice(0, limit) : sortedResults;
}

/**
 * Get top scorer from a specific team
 */
export function getTeamTopScorer(teamId: number): Player | null {
    const teamPlayers = players.filter(p => p.teamId === teamId);

    if (teamPlayers.length === 0) return null;

    const topScorer = teamPlayers.reduce((max, player) => {
        const playerGoals = player.goals || 0;
        const maxGoals = max.goals || 0;
        return playerGoals > maxGoals ? player : max;
    });

    return (topScorer.goals || 0) > 0 ? topScorer : null;
}

/**
 * Get player with most yellow cards from a specific team
 */
export function getTeamMostCarded(teamId: number): Player | null {
    const teamPlayers = players.filter(p => p.teamId === teamId);

    if (teamPlayers.length === 0) return null;

    const mostCarded = teamPlayers.reduce((max, player) => {
        const playerCards = player.yellowCards || 0;
        const maxCards = max.yellowCards || 0;
        return playerCards > maxCards ? player : max;
    });

    return (mostCarded.yellowCards || 0) > 0 ? mostCarded : null;
}

/**
 * Get player with most appearances from a specific team
 */
export function getTeamMostAppearances(teamId: number): Player | null {
    const teamPlayers = players.filter(p => p.teamId === teamId);

    if (teamPlayers.length === 0) return null;

    // Assuming all players have played same games if no specific data
    // Return most experienced (could enhance with actual appearance data)
    return teamPlayers.length > 0 ? teamPlayers[0] : null;
}

/**
 * Calculate team's win rate as percentage
 */
export function calculateWinRate(team: Team): number {
    if (team.played === 0) return 0;
    return Math.round((team.won / team.played) * 100);
}

/**
 * Calculate team's goals per game
 */
export function calculateGoalsPerGame(team: Team): number {
    if (team.played === 0) return 0;
    return parseFloat((team.gf / team.played).toFixed(1));
}

/**
 * Calculate clean sheets (games without conceding)
 */
export function calculateCleanSheets(teamName: string): number {
    let cleanSheets = 0;

    results.forEach(group => {
        group.matches.forEach(match => {
            if (match.homeTeam === teamName && match.awayScore === 0) {
                cleanSheets++;
            }
            if (match.awayTeam === teamName && match.homeScore === 0) {
                cleanSheets++;
            }
        });
    });

    return cleanSheets;
}

/**
 * Get team's league rank/position
 */
export function getTeamPosition(teamId: number): number {
    // Teams array is already sorted by points
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    return sortedTeams.findIndex(t => t.id === teamId) + 1;
}

/**
 * Calculate team's goal difference percentage compared to league average
 */
export function getGoalDifferencePercentile(team: Team): number {
    const goalDiff = team.gf - team.ga;
    const allGoalDiffs = teams.map(t => t.gf - t.ga);
    const avgGoalDiff = allGoalDiffs.reduce((sum, gd) => sum + gd, 0) / teams.length;

    if (avgGoalDiff === 0) return 50;
    return Math.min(100, Math.max(0, 50 + ((goalDiff - avgGoalDiff) / Math.abs(avgGoalDiff)) * 50));
}

/**
 * Get upcoming fixtures count
 */
export function getUpcomingFixturesCount(teamName: string): number {
    return getTeamFixtures(teamName).length;
}

/**
 * Check if team won their last match
 */
export function isOnWinningStreak(teamName: string): boolean {
    const lastResult = getTeamResults(teamName, 1)[0];
    if (!lastResult) return false;

    const isHome = lastResult.homeTeam === teamName;
    if (isHome) {
        return (lastResult.homeScore || 0) > (lastResult.awayScore || 0);
    } else {
        return (lastResult.awayScore || 0) > (lastResult.homeScore || 0);
    }
}
