import { Match, MatchEvent, MatchStats, Lineups, Player } from '../types';
import { results } from './results';
import { teams } from './teams';

interface RichMatchDetail {
    events: MatchEvent[];
    stats: MatchStats;
    lineups: Lineups;
}

type RichMatchDetailsMap = {
    [key: string]: RichMatchDetail;
};

// Hardcoded rich details for specific matches (e.g. Featured matches)
const richMatchDetails: RichMatchDetailsMap = {
    // Makaya'08 vs Shadow'09 (ID 101 from results.ts)
    "101": {
        events: [
            { time: "12'", type: "goal", player: "Kabayaga Shakira", team: "home", detail: "Assist by Edube" },
            { time: "34'", type: "goal", player: "Kabayaga Shakira", team: "home", detail: "Header" },
            { time: "55'", type: "goal", player: "Kabayaga Shakira", team: "home", detail: "Hat-trick" },
            { time: "78'", type: "goal", player: "Kabayaga Shakira", team: "home", detail: "Solo run" },
        ],
        stats: {
            possession: { home: 60, away: 40 },
            shots: { home: 15, away: 3 },
            shotsOnTarget: { home: 8, away: 1 },
            corners: { home: 6, away: 2 },
            fouls: { home: 8, away: 10 },
            yellowCards: { home: 0, away: 1 },
            redCards: { home: 0, away: 0 },
        },
        lineups: {
            home: [
                { number: 1, name: "Jonah", position: "GK" },
                { number: 4, name: "Edube", position: "DEF" },
                { number: 10, name: "Kabayaga Shakira", position: "FWD" },
            ],
            away: [
                { number: 1, name: "Ghost Walker", position: "GK" },
            ]
        }
    }
};

const generateMatchDetails = (): { [key: string]: Match } => {
    const details: { [key: string]: Match } = {};

    // Map for quick team lookup
    const teamMap = new Map<string, typeof teams[0]>();
    teams.forEach(t => teamMap.set(t.name, t));

    // 1. Flatten all matches from all fixtures
    results.forEach(fixture => {
        fixture.matches.forEach(match => {
            const id = match.id.toString();
            const richData = richMatchDetails[id];

            // Resolve Team Data
            const homeTeamData = teamMap.get(match.homeTeam);
            const awayTeamData = teamMap.get(match.awayTeam);

            details[id] = {
                id: match.id,
                homeTeamId: homeTeamData?.id || 0,
                awayTeamId: awayTeamData?.id || 0,

                homeTeamName: match.homeTeam,
                awayTeamName: match.awayTeam,

                homeTeamLogo: homeTeamData?.logo || null,
                awayTeamLogo: awayTeamData?.logo || null,

                homeTeamColor: homeTeamData?.primaryColor || '#0070C0',
                awayTeamColor: awayTeamData?.primaryColor || '#020617',

                date: fixture.date,
                time: "16:00",
                venue: match.venue || "IUEA Sports Ground",
                status: "Full Time",
                score: { home: match.homeScore || 0, away: match.awayScore || 0 },

                events: richData?.events || [],
                stats: richData?.stats || {
                    possession: { home: 50, away: 50 },
                    shots: { home: 0, away: 0 },
                    shotsOnTarget: { home: 0, away: 0 },
                    corners: { home: 0, away: 0 },
                    fouls: { home: 0, away: 0 },
                    yellowCards: { home: 0, away: 0 },
                    redCards: { home: 0, away: 0 },
                },
                lineups: richData?.lineups || { home: [], away: [] }
            };
        });
    });

    // Add the default fallback "1" for testing
    const fallbackHome = teamMap.get("Ruga-Ruga'88");
    const fallbackAway = teamMap.get("Mbawo'91");

    details["1"] = {
        id: 1,
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamName: "Ruga-Ruga'88",
        awayTeamName: "Mbawo'91",
        homeTeamLogo: fallbackHome?.logo || null,
        awayTeamLogo: fallbackAway?.logo || null,
        homeTeamColor: fallbackHome?.primaryColor || '#1a472a',
        awayTeamColor: fallbackAway?.primaryColor || '#8b4513',
        date: "Saturday, 18th Nov",
        time: "16:00",
        venue: "Hilltop Arena",
        status: "Full Time",
        score: { home: 2, away: 2 },
        events: [],
        stats: {
            possession: { home: 50, away: 50 },
            shots: { home: 5, away: 5 },
            shotsOnTarget: { home: 2, away: 2 },
            corners: { home: 3, away: 3 },
            fouls: { home: 10, away: 10 },
            yellowCards: { home: 1, away: 1 },
            redCards: { home: 0, away: 0 },
        },
        lineups: { home: [], away: [] }
    };

    return details;
};

export const matchDetails = generateMatchDetails();
