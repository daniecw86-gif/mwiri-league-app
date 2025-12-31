export interface MatchEvent {
    time: string;
    type: string;
    player: string;
    team: string;
    detail: string;
    cardType?: string;
}

export interface Player {
    id: number;
    number: number;
    name: string;
    position: string;
    teamId: number;
    teamName?: string;
    goals?: number;
    assists?: number;
    cleanSheets?: number;
    yellowCards?: number;
    redCards?: number;
    appearances?: number;
    image?: string | null;
}

export interface StatComparison {
    home: number;
    away: number;
}

export interface MatchStats {
    possession: StatComparison;
    shots: StatComparison;
    shotsOnTarget: StatComparison;
    corners: StatComparison;
    fouls: StatComparison;
    yellowCards: StatComparison;
    redCards: StatComparison;
    [key: string]: StatComparison; // Index signature for dynamic access
}

export interface LeagueTeamStats {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    gf: number;
    ga: number;
    points: number;
    form: string[];
}

export interface Team extends LeagueTeamStats {
    id: number;
    name: string;
    logo: string | null;
    primaryColor: string;
    group: string;
    manager: string;
    stadium: string;
    capacity: string;
    nickname: string;
    founded: string;
    website: string;
    description: string;
    home: LeagueTeamStats;
    away: LeagueTeamStats;
}

export interface Lineups {
    home: Player[];
    away: Player[];
}

export interface Match {
    id: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamLogo?: string | null;
    awayTeamLogo?: string | null;
    homeTeamColor?: string;
    awayTeamColor?: string;
    date: string;
    time: string;
    venue: string;
    status: string;
    score: {
        home: number;
        away: number;
    };
    events: MatchEvent[];
    stats: MatchStats;
    lineups: Lineups;
}

export interface MatchData {
    id: number;
    homeTeam: string;
    awayTeam: string;
    time?: string;
    venue: string;
    homeScore?: number;
    awayScore?: number;
}

export interface FixtureGroup {
    id: number;
    date: string;
    matches: MatchData[];
}
