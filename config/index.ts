/**
 * Centralized Configuration for Mwiri League Application
 * All constants and configuration values should be defined here.
 */

// =====================================================
// LEAGUE INFORMATION
// =====================================================
export const LEAGUE = {
    name: "Mwiri League",
    tagline: "Excellence on the Hilltop",
    currentSeason: "Season 6",
    seasonYear: "2025/26",
    founded: 2003,
    groups: {
        A: "Sir. Wilberforce Nadiope",
        B: "Dr. Milton Obote"
    }
} as const;

// =====================================================
// POINTS SYSTEM
// =====================================================
export const POINTS = {
    win: 3,
    draw: 1,
    loss: 0
} as const;

// =====================================================
// UI CONFIGURATION
// =====================================================
export const UI = {
    maxFormEntries: 5,
    topScorersLimit: 15,
    yellowCardsLimit: 10,
    newsPreviewLimit: 3,
    tablePositions: {
        champion: 1,
        top4: 4,
        relegationStart: -2 // Calculated from bottom
    },
    pagination: {
        defaultPageSize: 10,
        maxPageSize: 50
    }
} as const;

// =====================================================
// MATCH CONFIGURATION
// =====================================================
export const MATCH = {
    defaultTime: "16:00",
    defaultVenue: "TBA",
    statusLabels: {
        upcoming: "Upcoming",
        live: "Live",
        finished: "FT",
        postponed: "Postponed"
    },
    halfDurationMinutes: 45
} as const;

// =====================================================
// PLAYER POSITIONS
// =====================================================
export const POSITIONS = {
    GK: "Goalkeeper",
    DEF: "Defender",
    MID: "Midfielder",
    FWD: "Forward"
} as const;

export type PositionKey = keyof typeof POSITIONS;

// =====================================================
// COLORS - Brand Palette
// =====================================================
export const COLORS = {
    brand: {
        blue: "#005696",
        blueDeep: "#003d6b",
        blueDark: "#00284a",
        yellow: "#FFD100",
        gold: "#C9A227",
        goldDark: "#8B7500"
    },
    semantic: {
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6"
    }
} as const;

// =====================================================
// API ENDPOINTS (for future use)
// =====================================================
export const API = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
    endpoints: {
        teams: "/api/teams",
        fixtures: "/api/fixtures",
        results: "/api/results",
        players: "/api/players",
        news: "/api/news"
    }
} as const;

// =====================================================
// SOCIAL LINKS (for future use)
// =====================================================
export const SOCIAL = {
    twitter: "",
    instagram: "",
    facebook: "",
    youtube: ""
} as const;

// =====================================================
// SEO DEFAULTS
// =====================================================
export const SEO = {
    siteName: "Mwiri League",
    titleTemplate: "%s | Mwiri League",
    defaultTitle: "Mwiri League - Excellence on the Hilltop",
    defaultDescription: "The official web application for the Mwiri League, featuring live match results, team statistics, fixtures, and more.",
    keywords: [
        "Mwiri League",
        "football",
        "soccer",
        "Uganda",
        "sports",
        "league table",
        "fixtures",
        "results"
    ]
} as const;

// =====================================================
// FEATURE FLAGS
// =====================================================
export const FEATURES = {
    enableLiveScores: false,
    enableNotifications: false,
    enableDarkMode: true,
    enablePWA: true,
    enableAnalytics: false
} as const;
