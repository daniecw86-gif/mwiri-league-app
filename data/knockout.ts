import { KnockoutMatch } from '../types';

// Knockout stage bracket data
// Format: Quarter-finals (8 teams) → Semi-finals (4 teams) → Final (2 teams)

export const knockoutMatches: KnockoutMatch[] = [
    // Quarter-Finals (positions 1-4, left side feeds semi 1, right side feeds semi 2)
    {
        id: 401,
        round: 'quarter',
        position: 1,
        homeTeam: null, // Group A 1st
        awayTeam: null, // Group B 2nd
        status: 'upcoming',
        date: 'TBD',
        venue: 'IUEA Sports Ground',
    },
    {
        id: 402,
        round: 'quarter',
        position: 2,
        homeTeam: null, // Group B 1st
        awayTeam: null, // Group A 2nd
        status: 'upcoming',
        date: 'TBD',
        venue: 'IUEA Sports Ground',
    },
    {
        id: 403,
        round: 'quarter',
        position: 3,
        homeTeam: null, // Group A 3rd
        awayTeam: null, // Group B 4th
        status: 'upcoming',
        date: 'TBD',
        venue: 'IUEA Sports Ground',
    },
    {
        id: 404,
        round: 'quarter',
        position: 4,
        homeTeam: null, // Group B 3rd
        awayTeam: null, // Group A 4th
        status: 'upcoming',
        date: 'TBD',
        venue: 'IUEA Sports Ground',
    },

    // Semi-Finals
    {
        id: 501,
        round: 'semi',
        position: 1,
        homeTeam: null, // Winner QF1
        awayTeam: null, // Winner QF3
        status: 'upcoming',
        date: 'TBD',
        venue: 'IUEA Sports Ground',
    },
    {
        id: 502,
        round: 'semi',
        position: 2,
        homeTeam: null, // Winner QF2
        awayTeam: null, // Winner QF4
        status: 'upcoming',
        date: 'TBD',
        venue: 'IUEA Sports Ground',
    },

    // Final
    {
        id: 601,
        round: 'final',
        position: 1,
        homeTeam: null, // Winner SF1
        awayTeam: null, // Winner SF2
        status: 'upcoming',
        date: 'TBD',
        venue: 'IUEA Sports Ground',
    },
];

// Helper function to get matches by round
export const getMatchesByRound = (round: 'quarter' | 'semi' | 'final'): KnockoutMatch[] => {
    return knockoutMatches.filter(m => m.round === round);
};

// Get the champion (winner of final)
export const getChampion = (): string | null => {
    const final = knockoutMatches.find(m => m.round === 'final');
    return final?.winner || null;
};
