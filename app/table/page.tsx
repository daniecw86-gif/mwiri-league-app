import { teams } from "../../data/teams";
import LeagueTable from "../../components/LeagueTable";
import LeagueFormat from "../../components/LeagueFormat";

export default function TablePage() {
    return (
        <div className="min-h-screen bg-transparent">
            <div className="bg-mwiri-blue text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">League Table</h1>
                    <p className="text-xl text-mwiri-yellow font-medium mt-2">Season 2025/26</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <LeagueTable teams={teams} />
                <LeagueFormat />
            </main>
        </div>
    );
}
