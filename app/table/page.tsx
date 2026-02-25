import type { Metadata } from 'next';
import { teams } from "../../data/teams";
import LeagueTable from "../../components/LeagueTable";
import LeagueFormat from "../../components/LeagueFormat";

export const metadata: Metadata = {
    title: 'League Table',
    description: 'Current standings for the Mwiri League Season 2025/26 — points, goal difference, and form for all teams.',
};

export default function TablePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="crystal-glass border-b border-mwiri-gold/20 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-barlow text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                        🏆 League Table
                    </h1>
                    <p className="text-xl text-mwiri-gold font-medium">Season 2025/26</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* League Table Card */}
                <div className="crystal-glass rounded-3xl p-6 mb-8 crystal-float">
                    <LeagueTable teams={teams} />
                </div>

                {/* League Format */}
                <div className="crystal-glass rounded-3xl p-6 crystal-float">
                    <LeagueFormat />
                </div>
            </main>
        </div>
    );
}
