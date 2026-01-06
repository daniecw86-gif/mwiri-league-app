/**
 * Tests for data modules
 */
import { teams } from '../data/teams';
import { players } from '../data/players';
import { newsItems } from '../data/news';

describe('Teams Data', () => {
    it('should have teams array', () => {
        expect(Array.isArray(teams)).toBe(true);
    });

    it('should have at least one team', () => {
        expect(teams.length).toBeGreaterThan(0);
    });

    it('each team should have required properties', () => {
        teams.forEach(team => {
            expect(team.id).toBeDefined();
            expect(typeof team.id).toBe('number');
            expect(team.name).toBeDefined();
            expect(typeof team.name).toBe('string');
            expect(team.played).toBeDefined();
            expect(typeof team.played).toBe('number');
            expect(team.points).toBeDefined();
            expect(typeof team.points).toBe('number');
        });
    });

    it('each team should have valid stats (non-negative)', () => {
        teams.forEach(team => {
            expect(team.played).toBeGreaterThanOrEqual(0);
            expect(team.won).toBeGreaterThanOrEqual(0);
            expect(team.drawn).toBeGreaterThanOrEqual(0);
            expect(team.lost).toBeGreaterThanOrEqual(0);
            expect(team.gf).toBeGreaterThanOrEqual(0);
            expect(team.ga).toBeGreaterThanOrEqual(0);
            expect(team.points).toBeGreaterThanOrEqual(0);
        });
    });

    it('team stats should be consistent (played = won + drawn + lost)', () => {
        teams.forEach(team => {
            expect(team.played).toBe(team.won + team.drawn + team.lost);
        });
    });

    it('team points should be consistent with results', () => {
        teams.forEach(team => {
            const expectedPoints = (team.won * 3) + (team.drawn * 1);
            expect(team.points).toBe(expectedPoints);
        });
    });

    it('each team should have home and away splits', () => {
        teams.forEach(team => {
            expect(team.home).toBeDefined();
            expect(team.away).toBeDefined();
        });
    });

    it('all team IDs should be unique', () => {
        const ids = teams.map(t => t.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(teams.length);
    });
});

describe('Players Data', () => {
    it('should have players array', () => {
        expect(Array.isArray(players)).toBe(true);
    });

    it('should have at least one player', () => {
        expect(players.length).toBeGreaterThan(0);
    });

    it('each player should have required properties', () => {
        players.forEach(player => {
            expect(player.id).toBeDefined();
            expect(player.name).toBeDefined();
            expect(typeof player.name).toBe('string');
        });
    });

    it('players with goals should have non-negative values', () => {
        players.forEach(player => {
            if (player.goals !== undefined) {
                expect(player.goals).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('players with yellow cards should have non-negative values', () => {
        players.forEach(player => {
            if (player.yellowCards !== undefined) {
                expect(player.yellowCards).toBeGreaterThanOrEqual(0);
            }
        });
    });
});

describe('News Data', () => {
    it('should have news items array', () => {
        expect(Array.isArray(newsItems)).toBe(true);
    });

    it('should have at least one news item', () => {
        expect(newsItems.length).toBeGreaterThan(0);
    });

    it('each news item should have required properties', () => {
        newsItems.forEach(item => {
            expect(item.id).toBeDefined();
            expect(item.title).toBeDefined();
            expect(typeof item.title).toBe('string');
            expect(item.category).toBeDefined();
            expect(item.date).toBeDefined();
            expect(item.link).toBeDefined();
        });
    });

    it('news links should be valid paths', () => {
        newsItems.forEach(item => {
            expect(item.link).toMatch(/^\/news\/\d+$/);
        });
    });

    it('all news IDs should be unique', () => {
        const ids = newsItems.map(n => n.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(newsItems.length);
    });
});
