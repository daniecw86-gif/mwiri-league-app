/**
 * Tests for results, gallery, and matchDetails data modules
 */
import { results } from '../data/results';
import { galleryAlbums, getAllImages, getAlbumById } from '../data/gallery';
import { matchDetails } from '../data/matchDetails';

describe('Results Data', () => {
    it('should have results array', () => {
        expect(Array.isArray(results)).toBe(true);
    });

    it('should have at least one result group', () => {
        expect(results.length).toBeGreaterThan(0);
    });

    it('each result group should have an id and date', () => {
        results.forEach(group => {
            expect(group.id).toBeDefined();
            expect(typeof group.id).toBe('number');
            expect(group.date).toBeDefined();
            expect(typeof group.date).toBe('string');
        });
    });

    it('each match in a result should have required fields', () => {
        results.forEach(group => {
            group.matches.forEach(match => {
                expect(match.id).toBeDefined();
                expect(match.homeTeam).toBeDefined();
                expect(match.awayTeam).toBeDefined();
                expect(typeof match.homeTeam).toBe('string');
                expect(typeof match.awayTeam).toBe('string');
            });
        });
    });

    it('match scores should be non-negative numbers', () => {
        results.forEach(group => {
            group.matches.forEach(match => {
                if (match.homeScore !== undefined) {
                    expect(match.homeScore).toBeGreaterThanOrEqual(0);
                }
                if (match.awayScore !== undefined) {
                    expect(match.awayScore).toBeGreaterThanOrEqual(0);
                }
            });
        });
    });

    it('all match IDs across groups should be unique', () => {
        const ids = results.flatMap(g => g.matches.map(m => m.id));
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    it('home team and away team should never be the same', () => {
        results.forEach(group => {
            group.matches.forEach(match => {
                expect(match.homeTeam).not.toBe(match.awayTeam);
            });
        });
    });
});

describe('Gallery Data', () => {
    it('should have gallery albums array', () => {
        expect(Array.isArray(galleryAlbums)).toBe(true);
    });

    it('should have at least one album', () => {
        expect(galleryAlbums.length).toBeGreaterThan(0);
    });

    it('each album should have required properties', () => {
        galleryAlbums.forEach(album => {
            expect(album.id).toBeDefined();
            expect(album.title).toBeDefined();
            expect(album.description).toBeDefined();
            expect(album.coverImage).toBeDefined();
            expect(album.date).toBeDefined();
            expect(Array.isArray(album.images)).toBe(true);
        });
    });

    it('each image should have required properties', () => {
        galleryAlbums.forEach(album => {
            album.images.forEach(image => {
                expect(image.id).toBeDefined();
                expect(image.src).toBeDefined();
                expect(image.alt).toBeDefined();
                expect(image.category).toBeDefined();
            });
        });
    });

    it('image sources should be valid paths', () => {
        galleryAlbums.forEach(album => {
            album.images.forEach(image => {
                expect(image.src).toMatch(/^\//);
            });
        });
    });

    describe('getAllImages', () => {
        it('should return all images from all albums', () => {
            const all = getAllImages();
            const totalInAlbums = galleryAlbums.reduce((sum, a) => sum + a.images.length, 0);
            expect(all.length).toBe(totalInAlbums);
        });

        it('should return a flat array of GalleryImage', () => {
            const all = getAllImages();
            all.forEach(img => {
                expect(img.id).toBeDefined();
                expect(img.src).toBeDefined();
            });
        });
    });

    describe('getAlbumById', () => {
        it('should find an existing album by id', () => {
            const album = getAlbumById('season-2024');
            expect(album).toBeDefined();
            expect(album?.title).toContain('2024');
        });

        it('should return undefined for non-existent album', () => {
            const album = getAlbumById('non-existent');
            expect(album).toBeUndefined();
        });
    });
});

describe('Match Details Data', () => {
    it('should be a non-empty object', () => {
        expect(typeof matchDetails).toBe('object');
        expect(Object.keys(matchDetails).length).toBeGreaterThan(0);
    });

    it('each match detail should have core properties', () => {
        Object.values(matchDetails).forEach((match: any) => {
            expect(match.id).toBeDefined();
            expect(match.homeTeamName).toBeDefined();
            expect(match.awayTeamName).toBeDefined();
            expect(match.score).toBeDefined();
            expect(match.score.home).toBeDefined();
            expect(match.score.away).toBeDefined();
        });
    });

    it('each match should have stats with all required stat categories', () => {
        const requiredStats = ['possession', 'shots', 'shotsOnTarget', 'corners', 'fouls', 'yellowCards', 'redCards'];
        Object.values(matchDetails).forEach((match: any) => {
            requiredStats.forEach(stat => {
                expect(match.stats[stat]).toBeDefined();
                expect(match.stats[stat].home).toBeDefined();
                expect(match.stats[stat].away).toBeDefined();
            });
        });
    });

    it('each match should have lineups object with home and away arrays', () => {
        Object.values(matchDetails).forEach((match: any) => {
            expect(match.lineups).toBeDefined();
            expect(Array.isArray(match.lineups.home)).toBe(true);
            expect(Array.isArray(match.lineups.away)).toBe(true);
        });
    });

    it('the fallback match "1" should exist', () => {
        expect(matchDetails["1"]).toBeDefined();
        expect(matchDetails["1"].status).toBe("Full Time");
    });

    it('match IDs from results should all be present in matchDetails', () => {
        const { results: resultsData } = require('../data/results');
        resultsData.forEach((group: any) => {
            group.matches.forEach((match: any) => {
                expect(matchDetails[match.id.toString()]).toBeDefined();
            });
        });
    });
});
