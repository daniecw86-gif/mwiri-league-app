/**
 * Application Configuration
 * Centralized location for all application settings
 */

export const APP_CONFIG = {
    // League Information
    league: {
        name: process.env.NEXT_PUBLIC_LEAGUE_NAME || 'Mwiri League',
        season: process.env.NEXT_PUBLIC_SEASON || '2025/26',
        defaultVenue: process.env.NEXT_PUBLIC_DEFAULT_VENUE || 'IUEA Sports Ground',
    },

    // Application Settings
    app: {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
        enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false', // default true
    },

    // Feature Flags
    features: {
        showPlayerProfiles: false,
        showAdvancedStats: true,
        allowComments: false,
    },

    // External Services
    services: {
        googleAnalyticsId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
        imageCdnUrl: process.env.NEXT_PUBLIC_IMAGE_CDN_URL,
    },

    // UI Constants
    ui: {
        maxRecentNews: 4,
        maxTopScorers: 5,
        maxUpcomingFixtures: 3,
        defaultTeamLogoPath: '/images/default-club.png',
    },
} as const;

// Type-safe config access
export type AppConfig = typeof APP_CONFIG;
