/**
 * Tests for teamUtils utility functions
 */
import { teams } from '../data/teams';
import {
    getTeamFixtures,
    getTeamResults,
    getTeamTopScorer,
    getTeamMostCarded,
    calculateWinRate,
    calculateGoalsPerGame,
    calculateCleanSheets,
    getTeamPosition,
    getGoalDifferencePercentile,
    getUpcomingFixturesCount,
    isOnWinningStreak,
} from '../utils/teamUtils';

// Use a known team name from the data
const KNOWN_TEAM = teams[0]?.name || "Makaya'08";
const KNOWN_TEAM_ID = teams[0]?.id || 1;

describe('teamUtils', () => {
    describe('getTeamFixtures', () => {
        it('should return an array', () => {
            const result = getTeamFixtures(KNOWN_TEAM);
            expect(Array.isArray(result)).toBe(true);
        });

        it('should return empty array for non-existent team', () => {
            const result = getTeamFixtures('NonExistentFC');
            expect(result).toEqual([]);
        });

        it('should respect the limit parameter', () => {
            const result = getTeamFixtures(KNOWN_TEAM, 1);
            expect(result.length).toBeLessThanOrEqual(1);
        });

        it('each fixture should have the team as home or away', () => {
            const fixtures = getTeamFixtures(KNOWN_TEAM);
            fixtures.forEach(match => {
                const isInvolved =
                    match.homeTeam === KNOWN_TEAM || match.awayTeam === KNOWN_TEAM;
                expect(isInvolved).toBe(true);
            });
        });
    });

    describe('getTeamResults', () => {
        it('should return an array', () => {
            const result = getTeamResults(KNOWN_TEAM);
            expect(Array.isArray(result)).toBe(true);
        });

        it('should return empty array for non-existent team', () => {
            const result = getTeamResults('NonExistentFC');
            expect(result).toEqual([]);
        });

        it('should respect the limit parameter', () => {
            const result = getTeamResults(KNOWN_TEAM, 2);
            expect(result.length).toBeLessThanOrEqual(2);
        });
    });

    describe('getTeamTopScorer', () => {
        it('should return a player or null', () => {
            const result = getTeamTopScorer(KNOWN_TEAM_ID);
            if (result !== null) {
                expect(result.name).toBeDefined();
                expect(result.goals).toBeGreaterThan(0);
            }
        });

        it('should return null for non-existent team', () => {
            const result = getTeamTopScorer(99999);
            expect(result).toBeNull();
        });
    });

    describe('getTeamMostCarded', () => {
        it('should return a player or null', () => {
            const result = getTeamMostCarded(KNOWN_TEAM_ID);
            if (result !== null) {
                expect(result.name).toBeDefined();
            }
        });

        it('should return null for non-existent team', () => {
            const result = getTeamMostCarded(99999);
            expect(result).toBeNull();
        });
    });

    describe('calculateWinRate', () => {
        it('should return 0 for team with 0 games', () => {
            const mockTeam = { ...teams[0], played: 0, won: 0 } as any;
            expect(calculateWinRate(mockTeam)).toBe(0);
        });

        it('should return 100 for team that won all games', () => {
            const mockTeam = { ...teams[0], played: 5, won: 5 } as any;
            expect(calculateWinRate(mockTeam)).toBe(100);
        });

        it('should return a value between 0 and 100', () => {
            teams.forEach(team => {
                const rate = calculateWinRate(team as any);
                expect(rate).toBeGreaterThanOrEqual(0);
                expect(rate).toBeLessThanOrEqual(100);
            });
        });
    });

    describe('calculateGoalsPerGame', () => {
        it('should return 0 for team with 0 games', () => {
            const mockTeam = { ...teams[0], played: 0, gf: 0 } as any;
            expect(calculateGoalsPerGame(mockTeam)).toBe(0);
        });

        it('should return correct average', () => {
            const mockTeam = { ...teams[0], played: 4, gf: 8 } as any;
            expect(calculateGoalsPerGame(mockTeam)).toBe(2.0);
        });

        it('should return a non-negative number', () => {
            teams.forEach(team => {
                expect(calculateGoalsPerGame(team as any)).toBeGreaterThanOrEqual(0);
            });
        });
    });

    describe('calculateCleanSheets', () => {
        it('should return a non-negative number', () => {
            const result = calculateCleanSheets(KNOWN_TEAM);
            expect(result).toBeGreaterThanOrEqual(0);
        });

        it('should return 0 for non-existent team', () => {
            expect(calculateCleanSheets('NonExistentFC')).toBe(0);
        });
    });

    describe('getTeamPosition', () => {
        it('should return a position >= 1', () => {
            const pos = getTeamPosition(KNOWN_TEAM_ID);
            expect(pos).toBeGreaterThanOrEqual(1);
        });

        it('should return a position within team count', () => {
            const pos = getTeamPosition(KNOWN_TEAM_ID);
            expect(pos).toBeLessThanOrEqual(teams.length);
        });
    });

    describe('getGoalDifferencePercentile', () => {
        it('should return a value between 0 and 100', () => {
            teams.forEach(team => {
                const percentile = getGoalDifferencePercentile(team as any);
                expect(percentile).toBeGreaterThanOrEqual(0);
                expect(percentile).toBeLessThanOrEqual(100);
            });
        });
    });

    describe('getUpcomingFixturesCount', () => {
        it('should return a non-negative number', () => {
            expect(getUpcomingFixturesCount(KNOWN_TEAM)).toBeGreaterThanOrEqual(0);
        });
    });

    describe('isOnWinningStreak', () => {
        it('should return a boolean', () => {
            expect(typeof isOnWinningStreak(KNOWN_TEAM)).toBe('boolean');
        });

        it('should return false for non-existent team', () => {
            expect(isOnWinningStreak('NonExistentFC')).toBe(false);
        });
    });
});
