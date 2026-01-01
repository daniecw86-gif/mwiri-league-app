
import { results } from '../data/results';
import { matchDetails } from '../data/matchDetails';
import { Match, MatchEvent } from '../types';

export const generateMatchDayReport = (fixtureId: number): string => {
    // 1. Find the fixture group
    const fixtureGroup = results.find(r => r.id === fixtureId);
    if (!fixtureGroup) {
        return "Error: Fixture not found.";
    }

    const matches = fixtureGroup.matches;
    const date = fixtureGroup.date;

    // 2. Aggregate Stats
    let totalGoals = 0;
    let homeWins = 0;
    let awayWins = 0;
    let draws = 0;
    let biggestWin = { margin: -1, match: null as any };
    let highestScoringMatch = { goals: -1, match: null as any };
    let allScorers: { player: string, team: string, goals: number }[] = [];

    matches.forEach(matchBase => {
        // Detailed match info (for events)
        const detailedMatch = (matchDetails[matchBase.id.toString() as keyof typeof matchDetails] || null) as unknown as Match;

        const hScore = matchBase.homeScore ?? 0;
        const aScore = matchBase.awayScore ?? 0;
        const total = hScore + aScore;
        const margin = Math.abs(hScore - aScore);

        totalGoals += total;

        if (hScore > aScore) homeWins++;
        else if (aScore > hScore) awayWins++;
        else draws++;

        if (margin > biggestWin.margin) {
            biggestWin = { margin, match: matchBase };
        }
        if (total > highestScoringMatch.goals) {
            highestScoringMatch = { goals: total, match: matchBase };
        }

        // Collect scorers from details
        if (detailedMatch && detailedMatch.events) {
            detailedMatch.events.forEach((Event: MatchEvent) => {
                if (Event.type === 'goal') {
                    const existing = allScorers.find(s => s.player === Event.player);
                    if (existing) existing.goals++;
                    else allScorers.push({ player: Event.player, team: Event.team === 'home' ? matchBase.homeTeam : matchBase.awayTeam, goals: 1 });
                }
            });
        }
    });

    const goalsPerGame = (totalGoals / matches.length).toFixed(2);

    // Sort top scorers
    allScorers.sort((a, b) => b.goals - a.goals);
    const topScorer = allScorers.length > 0 ? allScorers[0] : null;

    // 3. Generate Narrative
    const title = `# ${date} Report: ${totalGoals} Goals Galore!`;

    let summary = `## Overview\n`;
    summary += `It was an action-packed ${date} in the Mwiri League, with a total of **${totalGoals} goals** scored across ${matches.length} matches, averaging **${goalsPerGame} goals per game**.\n\n`;

    summary += `## Key Stats\n`;
    summary += `- **Home Wins**: ${homeWins}\n`;
    summary += `- **Away Wins**: ${awayWins}\n`;
    summary += `- **Draws**: ${draws}\n\n`;

    summary += `## Match of the Day\n`;
    if (highestScoringMatch.match) {
        const m = highestScoringMatch.match;
        summary += `The most entertaining clash saw **${m.homeTeam}** and **${m.awayTeam}** light up the **${m.venue}**, ending in a **${m.homeScore}-${m.awayScore}** thriller.\n\n`;
    }

    if (topScorer) {
        summary += `## Player of the Day\n`;
        summary += `**${topScorer.player}** (${topScorer.team}) stole the show with **${topScorer.goals} goals**, proving to be a nightmare for defenders.\n\n`;
    }

    summary += `## Full Results\n`;
    matches.forEach(m => {
        summary += `- **${m.homeTeam}** ${m.homeScore} - ${m.awayScore} **${m.awayTeam}**\n`;
    });

    return `${title}\n\n${summary}`;
};
