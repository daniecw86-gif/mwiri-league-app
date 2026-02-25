import { teams } from './teams';
import { Player } from '../types';

interface RealPlayerData {
    name: string;
    teamName: string;
    goals?: number;
    yellowCards?: number;
}

// Seeded PRNG (mulberry32) for deterministic player generation
function createSeededRandom(seed: number) {
    let state = seed;
    return () => {
        state |= 0;
        state = (state + 0x6D2B79F5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Real players data from Match Day 1
const realPlayers: RealPlayerData[] = [
    // Top Scorers
    { name: "Kabayaga Shakira", teamName: "Makaya'08", goals: 4 },
    { name: "Kawesi Reagan", teamName: "Winter'94", goals: 2 },
    { name: "Sizomu Aaron", teamName: "Wampa Fc", goals: 1 },
    { name: "Kamba", teamName: "Muniga'02", goals: 1 },
    { name: "Edube", teamName: "Makaya'08", goals: 1 },
    { name: "Samali", teamName: "Top Layer'97", goals: 1 },
    { name: "Okello Okello", teamName: "Lukambwe'05", goals: 1 },
    { name: "Jenkins", teamName: "Lukambwe'05", goals: 1 },
    { name: "Ajuna", teamName: "Suici'06", goals: 1 },
    { name: "Madina", teamName: "Suici'06", goals: 1 },
    { name: "Trevor Lubega", teamName: "Winter'94", goals: 1 },
    { name: "Reagan Kasuti", teamName: "Winter'94", goals: 1 },
    { name: "Kinya", teamName: "Divers'13", goals: 1 },
    { name: "Jonah", teamName: "Makaya'08", goals: 1 },
    // Yellow Cards
    { name: "Tuhaire", teamName: "Solida'95", yellowCards: 1 },
    { name: "Ssemakula", teamName: "Buliti'01", yellowCards: 1 },
    { name: "Solomon", teamName: "Buliti'01", yellowCards: 1 },
    { name: "Kiiza Chris", teamName: "Bluedollar'04", yellowCards: 1 },
];

const firstNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Daniel", "Matthew", "Anthony", "Donald", "Mark", "Paul", "Steven", "Andrew", "Kenneth", "Joshua"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

const generatePlayers = (): Player[] => {
    const random = createSeededRandom(42);
    const players: Player[] = [];
    let id = 1;

    teams.forEach(team => {
        // 1. Add real players for this team first
        const teamRealPlayers = realPlayers.filter(p => p.teamName === team.name);

        teamRealPlayers.forEach(realPlayer => {
            players.push({
                id: id++,
                name: realPlayer.name,
                teamId: team.id,
                teamName: team.name,
                number: Math.floor(random() * 99) + 1,
                position: "Forward", // Default to Forward for scorers, or generic
                goals: realPlayer.goals || 0,
                assists: 0,
                cleanSheets: 0,
                yellowCards: realPlayer.yellowCards || 0,
                redCards: 0,
                appearances: 1,
                image: null
            });
        });

        // 2. Fill the rest with generated players to reach ~18 players
        const playersNeeded = 18 - teamRealPlayers.length;
        for (let i = 0; i < playersNeeded; i++) {
            const firstName = firstNames[Math.floor(random() * firstNames.length)];
            const lastName = lastNames[Math.floor(random() * lastNames.length)];

            // Assign positions roughly
            let position;
            if (i < 2) position = "Goalkeeper";
            else if (i < 8) position = "Defender";
            else if (i < 14) position = "Midfielder";
            else position = "Forward";

            players.push({
                id: id++,
                name: `${firstName} ${lastName}`,
                teamId: team.id,
                teamName: team.name,
                number: Math.floor(random() * 99) + 1,
                position: position,
                goals: 0,
                assists: position !== "Goalkeeper" ? Math.floor(random() * 3) : 0,
                cleanSheets: position === "Goalkeeper" ? Math.floor(random() * 2) : 0,
                yellowCards: 0,
                redCards: 0,
                appearances: Math.floor(random() * 2),
                image: null
            });
        }
    });
    return players;
};

export const players: Player[] = generatePlayers();
