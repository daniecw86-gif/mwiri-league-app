/**
 * Tests for the centralized configuration
 */
import { LEAGUE, POINTS, UI, MATCH, COLORS, SEO, FEATURES } from '../config';

describe('Configuration', () => {
    describe('LEAGUE', () => {
        it('should have correct league name', () => {
            expect(LEAGUE.name).toBe('Mwiri League');
        });

        it('should have current season defined', () => {
            expect(LEAGUE.currentSeason).toBeDefined();
            expect(typeof LEAGUE.currentSeason).toBe('string');
        });

        it('should have both groups defined', () => {
            expect(LEAGUE.groups.A).toBeDefined();
            expect(LEAGUE.groups.B).toBeDefined();
        });
    });

    describe('POINTS', () => {
        it('should have correct points for win', () => {
            expect(POINTS.win).toBe(3);
        });

        it('should have correct points for draw', () => {
            expect(POINTS.draw).toBe(1);
        });

        it('should have correct points for loss', () => {
            expect(POINTS.loss).toBe(0);
        });
    });

    describe('UI', () => {
        it('should have reasonable form entries limit', () => {
            expect(UI.maxFormEntries).toBeGreaterThan(0);
            expect(UI.maxFormEntries).toBeLessThanOrEqual(10);
        });

        it('should have reasonable top scorers limit', () => {
            expect(UI.topScorersLimit).toBeGreaterThan(0);
        });

        it('should have valid table positions config', () => {
            expect(UI.tablePositions.champion).toBe(1);
            expect(UI.tablePositions.top4).toBe(4);
        });
    });

    describe('MATCH', () => {
        it('should have valid default time format', () => {
            expect(MATCH.defaultTime).toMatch(/^\d{2}:\d{2}$/);
        });

        it('should have all status labels', () => {
            expect(MATCH.statusLabels.upcoming).toBeDefined();
            expect(MATCH.statusLabels.live).toBeDefined();
            expect(MATCH.statusLabels.finished).toBeDefined();
            expect(MATCH.statusLabels.postponed).toBeDefined();
        });
    });

    describe('COLORS', () => {
        it('should have brand colors as valid hex codes', () => {
            const hexPattern = /^#[0-9A-Fa-f]{6}$/;
            expect(COLORS.brand.blue).toMatch(hexPattern);
            expect(COLORS.brand.yellow).toMatch(hexPattern);
            expect(COLORS.brand.gold).toMatch(hexPattern);
        });

        it('should have semantic colors defined', () => {
            expect(COLORS.semantic.success).toBeDefined();
            expect(COLORS.semantic.warning).toBeDefined();
            expect(COLORS.semantic.error).toBeDefined();
        });
    });

    describe('SEO', () => {
        it('should have site name matching league name', () => {
            expect(SEO.siteName).toBe(LEAGUE.name);
        });

        it('should have title template with placeholder', () => {
            expect(SEO.titleTemplate).toContain('%s');
        });

        it('should have keywords array', () => {
            expect(Array.isArray(SEO.keywords)).toBe(true);
            expect(SEO.keywords.length).toBeGreaterThan(0);
        });
    });

    describe('FEATURES', () => {
        it('should have all feature flags as booleans', () => {
            expect(typeof FEATURES.enableLiveScores).toBe('boolean');
            expect(typeof FEATURES.enableDarkMode).toBe('boolean');
            expect(typeof FEATURES.enablePWA).toBe('boolean');
        });

        it('should have dark mode enabled by default', () => {
            expect(FEATURES.enableDarkMode).toBe(true);
        });
    });
});
