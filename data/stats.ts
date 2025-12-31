import { Player, Team } from '../types';
import { players } from './players';
import { teams } from './teams';

interface TopPlayerStat {
    rank: number;
    name: string;
    team: string;
    teamId: number;
    teamLogo: string | null;
    value: number;
    played: number;
}

interface ClubStat {
    rank: number;
    name: string;
    teamId: number;
    stat: string;
    value: number;
}

interface StatsData {
    topScorers: TopPlayerStat[];
    topAssists: TopPlayerStat[];
    cleanSheets: TopPlayerStat[];
    clubStats: ClubStat[];
}

// Helper to sort and map players
const getTopPlayers = (metric: keyof Player, limit = 5): TopPlayerStat[] => {
    return players
        .filter(p => (p[metric] as number) > 0)
        .sort((a, b) => (b[metric] as number) - (a[metric] as number))
        .slice(0, limit)
        .map((p, index) => {
            const team = teams.find(t => t.id === p.teamId);
            return {
                rank: index + 1,
                name: p.name,
                team: p.teamName || '',
                teamId: p.teamId || 0,
                teamLogo: team?.logo || null,
                value: (p[metric] as number) || 0,
                played: p.appearances || 0
            };
        });
};

// Helper to get top clubs by goals
const getClubGoals = (limit = 5): ClubStat[] => {
    return teams
        .filter(t => t.played > 0)
        .sort((a, b) => b.gf - a.gf)
        .slice(0, limit)
        .map((t, index) => ({
            rank: index + 1,
            name: t.name,
            teamId: t.id,
            stat: "Goals Scored",
            value: t.gf
        }));
};

export const statsData: StatsData = {
    topScorers: getTopPlayers('goals'),
    topAssists: getTopPlayers('assists'),
    cleanSheets: getTopPlayers('cleanSheets'),
    clubStats: getClubGoals()
};
