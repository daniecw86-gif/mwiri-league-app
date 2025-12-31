// Formation configurations
export const formations = {
    "4-4-2": {
        name: "4-4-2",
        positions: {
            GK: 1,
            DEF: 4,
            MID: 4,
            FWD: 2
        },
        layout: [
            { position: "FWD", count: 2, row: 0 },
            { position: "MID", count: 4, row: 1 },
            { position: "DEF", count: 4, row: 2 },
            { position: "GK", count: 1, row: 3 }
        ]
    },
    "4-3-3": {
        name: "4-3-3",
        positions: {
            GK: 1,
            DEF: 4,
            MID: 3,
            FWD: 3
        },
        layout: [
            { position: "FWD", count: 3, row: 0 },
            { position: "MID", count: 3, row: 1 },
            { position: "DEF", count: 4, row: 2 },
            { position: "GK", count: 1, row: 3 }
        ]
    },
    "3-5-2": {
        name: "3-5-2",
        positions: {
            GK: 1,
            DEF: 3,
            MID: 5,
            FWD: 2
        },
        layout: [
            { position: "FWD", count: 2, row: 0 },
            { position: "MID", count: 5, row: 1 },
            { position: "DEF", count: 3, row: 2 },
            { position: "GK", count: 1, row: 3 }
        ]
    },
    "4-5-1": {
        name: "4-5-1",
        positions: {
            GK: 1,
            DEF: 4,
            MID: 5,
            FWD: 1
        },
        layout: [
            { position: "FWD", count: 1, row: 0 },
            { position: "MID", count: 5, row: 1 },
            { position: "DEF", count: 4, row: 2 },
            { position: "GK", count: 1, row: 3 }
        ]
    },
    "3-4-3": {
        name: "3-4-3",
        positions: {
            GK: 1,
            DEF: 3,
            MID: 4,
            FWD: 3
        },
        layout: [
            { position: "FWD", count: 3, row: 0 },
            { position: "MID", count: 4, row: 1 },
            { position: "DEF", count: 3, row: 2 },
            { position: "GK", count: 1, row: 3 }
        ]
    }
};

export type FormationKey = keyof typeof formations;

// Position colors
export const positionColors = {
    GK: {
        bg: "bg-yellow-500",
        border: "border-yellow-600",
        text: "text-yellow-700",
        lightBg: "bg-yellow-50"
    },
    DEF: {
        bg: "bg-blue-500",
        border: "border-blue-600",
        text: "text-blue-700",
        lightBg: "bg-blue-50"
    },
    MID: {
        bg: "bg-green-500",
        border: "border-green-600",
        text: "text-green-700",
        lightBg: "bg-green-50"
    },
    FWD: {
        bg: "bg-red-500",
        border: "border-red-600",
        text: "text-red-700",
        lightBg: "bg-red-50"
    }
};

// Helper to get total team stats
export function calculateTeamStats(players: any[]) {
    return {
        totalGoals: players.reduce((sum, p) => sum + (p.goals || 0), 0),
        totalAssists: players.reduce((sum, p) => sum + (p.assists || 0), 0),
        totalCards: players.reduce((sum, p) => sum + (p.yellowCards || 0) + (p.redCards || 0) * 2, 0),
        averageGoals: (players.reduce((sum, p) => sum + (p.goals || 0), 0) / players.length).toFixed(1),
    };
}

// Save dream team to localStorage
export function saveDreamTeam(teamName: string, formation: FormationKey, players: any[]) {
    const dreamTeam = {
        teamName,
        formation,
        players,
        created: new Date().toISOString()
    };

    localStorage.setItem('mwiri_dream_team', JSON.stringify(dreamTeam));

    // Also save to list of all teams
    const allTeams = JSON.parse(localStorage.getItem('mwiri_all_dream_teams') || '[]');
    allTeams.push(dreamTeam);
    localStorage.setItem('mwiri_all_dream_teams', JSON.stringify(allTeams));

    return dreamTeam;
}

// Load dream team from localStorage
export function loadDreamTeam() {
    const saved = localStorage.getItem('mwiri_dream_team');
    return saved ? JSON.parse(saved) : null;
}

// Get all dream teams
export function getAllDreamTeams() {
    const saved = localStorage.getItem('mwiri_all_dream_teams');
    return saved ? JSON.parse(saved) : [];
}
