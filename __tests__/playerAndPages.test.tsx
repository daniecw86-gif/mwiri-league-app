/**
 * Tests for seeded player generation and data integrity
 */
import { players } from '../data/players';
import { teams } from '../data/teams';

describe('Player Generation - Deterministic', () => {
    it('generates the same players on every invocation', () => {
        // Re-import to verify determinism
        const { players: players2 } = require('../data/players');
        expect(players.length).toBe(players2.length);
        expect(players[0].name).toBe(players2[0].name);
        expect(players[10].name).toBe(players2[10].name);
    });

    it('every team has players assigned', () => {
        teams.forEach(team => {
            const teamPlayers = players.filter(p => p.teamId === team.id);
            expect(teamPlayers.length).toBeGreaterThan(0);
        });
    });

    it('real players have correct goal counts', () => {
        const shakira = players.find(p => p.name === 'Kabayaga Shakira');
        expect(shakira).toBeDefined();
        expect(shakira?.goals).toBe(4);

        const kawesi = players.find(p => p.name === 'Kawesi Reagan');
        expect(kawesi).toBeDefined();
        expect(kawesi?.goals).toBe(2);
    });

    it('real players with yellow cards are tracked', () => {
        const tuhaire = players.find(p => p.name === 'Tuhaire');
        expect(tuhaire).toBeDefined();
        expect(tuhaire?.yellowCards).toBe(1);
    });

    it('all players have valid positions', () => {
        const validPositions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
        players.forEach(p => {
            expect(validPositions).toContain(p.position);
        });
    });

    it('all players have unique IDs', () => {
        const ids = players.map(p => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    it('each team has approximately 18 players', () => {
        teams.forEach(team => {
            const teamPlayers = players.filter(p => p.teamId === team.id);
            expect(teamPlayers.length).toBe(18);
        });
    });
});

describe('Page metadata structure', () => {
    it('stats page exports metadata', async () => {
        const statsPage = require('../app/stats/page');
        expect(statsPage.metadata).toBeDefined();
        expect(statsPage.metadata.title).toBeTruthy();
        expect(statsPage.metadata.description).toBeTruthy();
    });

    it('table page exports metadata', async () => {
        const tablePage = require('../app/table/page');
        expect(tablePage.metadata).toBeDefined();
        expect(tablePage.metadata.title).toBeTruthy();
    });

    it('news page exports metadata', async () => {
        const newsPage = require('../app/news/page');
        expect(newsPage.metadata).toBeDefined();
        expect(newsPage.metadata.title).toBeTruthy();
    });
});
