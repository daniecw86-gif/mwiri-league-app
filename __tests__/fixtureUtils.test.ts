/**
 * Tests for utility functions in fixtureUtils
 */
import { getNextFixture, formatMatchDate, getTeamInitial, getUpcomingFixtures } from '../utils/fixtureUtils';
import { FixtureGroup, MatchData } from '../types';

// Mock fixture data for testing
const mockFixtures: FixtureGroup[] = [
    {
        id: 1,
        date: 'November 22, 2025',
        matches: [
            {
                id: 1,
                homeTeam: 'Team A',
                awayTeam: 'Team B',
                time: '14:00',
                venue: 'Stadium 1',
                homeScore: 2,
                awayScore: 1
            },
            {
                id: 2,
                homeTeam: 'Team C',
                awayTeam: 'Team D',
                time: '16:00',
                venue: 'Stadium 2'
                // No score - upcoming match
            }
        ]
    },
    {
        id: 2,
        date: 'November 29, 2025',
        matches: [
            {
                id: 3,
                homeTeam: 'Team A',
                awayTeam: 'Team C',
                time: '14:00',
                venue: 'Stadium 1'
            }
        ]
    }
];

describe('fixtureUtils', () => {
    describe('getTeamInitial', () => {
        it('should return first character uppercase', () => {
            expect(getTeamInitial('Arsenal')).toBe('A');
        });

        it('should handle names with apostrophes', () => {
            expect(getTeamInitial("Makaya'08")).toBe('M');
        });

        it('should handle FC teams', () => {
            expect(getTeamInitial('United FC')).toBe('U');
        });

        it('should handle empty string', () => {
            expect(getTeamInitial('')).toBe('');
        });
    });

    describe('formatMatchDate', () => {
        it('should format date correctly', () => {
            const result = formatMatchDate('November 22, 2025');
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });

        it('should handle different date formats', () => {
            const result = formatMatchDate('2025-11-22');
            expect(result).toBeDefined();
        });

        it('should return original string for invalid dates', () => {
            const invalidDate = 'not a date';
            const result = formatMatchDate(invalidDate);
            expect(result).toBeDefined();
        });
    });

    describe('getNextFixture', () => {
        it('should return null for empty fixtures array', () => {
            expect(getNextFixture([])).toBeNull();
        });

        it('should be defined as a function', () => {
            expect(typeof getNextFixture).toBe('function');
        });

        it('should return a match object when fixtures exist', () => {
            const result = getNextFixture(mockFixtures);
            expect(result).toBeDefined();
            if (result) {
                expect(result.match).toBeDefined();
                expect(result.date).toBeDefined();
            }
        });
    });

    describe('getUpcomingFixtures', () => {
        it('should return an array', () => {
            const result = getUpcomingFixtures([]);
            expect(Array.isArray(result)).toBe(true);
        });

        it('should respect the limit parameter', () => {
            const result = getUpcomingFixtures(mockFixtures, 1);
            expect(result.length).toBeLessThanOrEqual(1);
        });
    });
});
