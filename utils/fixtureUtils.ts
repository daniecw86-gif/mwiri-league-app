import { FixtureGroup, MatchData } from '../types';

/**
 * Check if a date string represents a future date
 */
function isFutureDate(dateStr: string): boolean {
    // Parse dates like "Saturday 22 November 2025"
    try {
        const date = new Date(dateStr);
        const now = new Date();
        return date > now;
    } catch {
        // If parsing fails, assume it's future for now
        return true;
    }
}

/**
 * Get the next upcoming fixture from the fixtures array
 * @param fixtures - Array of fixture groups
 * @returns The next match or null if none available
 */
export function getNextFixture(fixtures: FixtureGroup[]): {
    match: MatchData;
    date: string;
} | null {
    // Find the first fixture group with future matches
    for (const fixtureGroup of fixtures) {
        if (isFutureDate(fixtureGroup.date) && fixtureGroup.matches.length > 0) {
            // Get the first match from this fixture group
            const match = fixtureGroup.matches[0];
            return {
                match,
                date: fixtureGroup.date
            };
        }
    }

    // If no future fixtures, return the last available match as a fallback
    if (fixtures.length > 0 && fixtures[fixtures.length - 1].matches.length > 0) {
        const lastFixture = fixtures[fixtures.length - 1];
        return {
            match: lastFixture.matches[0],
            date: lastFixture.date
        };
    }

    return null;
}

/**
 * Get the next N upcoming fixtures
 * @param fixtures - Array of fixture groups
 * @param limit - Number of fixtures to return
 * @returns Array of upcoming matches
 */
export function getUpcomingFixtures(
    fixtures: FixtureGroup[],
    limit = 5
): Array<{ match: MatchData; date: string }> {
    const upcoming: Array<{ match: MatchData; date: string }> = [];

    for (const fixtureGroup of fixtures) {
        if (isFutureDate(fixtureGroup.date)) {
            for (const match of fixtureGroup.matches) {
                upcoming.push({
                    match,
                    date: fixtureGroup.date
                });

                if (upcoming.length >= limit) {
                    return upcoming;
                }
            }
        }
    }

    return upcoming;
}

/**
 * Format a date string to a more readable format
 * @param dateStr - Date string like "Saturday 22 November 2025"
 * @returns Formatted date string
 */
export function formatMatchDate(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        };
        return date.toLocaleDateString('en-US', options);
    } catch {
        // If parsing fails, return the original string
        return dateStr;
    }
}

/**
 * Get team initials from team name
 * @param teamName - Full team name
 * @returns First letter or abbreviation
 */
export function getTeamInitial(teamName: string): string {
    // Handle special cases
    if (teamName.includes('FC')) {
        return teamName.split(' ')[0].charAt(0);
    }

    // For names with year like "Makaya'08", return first letter
    return teamName.charAt(0).toUpperCase();
}
