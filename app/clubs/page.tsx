"use client";

import { useState, useMemo } from "react";
import { teams } from "../../data/teams";
import ClubCard from "../../components/ClubCard";

export default function Clubs() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "points" | "goals">("points");

    // Filter and sort teams
    const filteredAndSortedTeams = useMemo(() => {
        let filtered = teams.filter(team =>
            team.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return filtered.sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "points") return b.points - a.points;
            if (sortBy === "goals") return b.gf - a.gf;
            return 0;
        });
    }, [searchQuery, sortBy]);

    // Group teams by performance
    const topTeams = filteredAndSortedTeams.slice(0, 4);
    const midTable = filteredAndSortedTeams.slice(4, 8);
    const lowerHalf = filteredAndSortedTeams.slice(8);

    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-mwiri-blue-deep via-mwiri-blue to-mwiri-blue-dark text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-cover"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl font-black tracking-tight mb-4 flex items-center gap-3">
                        <span className="text-4xl">🏟️</span>
                        All Clubs
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Explore all {teams.length} teams competing in the Mwiri League 2025/26 season
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Search and Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-mwiri-blue focus:ring-2 focus:ring-mwiri-blue/20 transition-all"
                            placeholder="Search clubs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Sort Options */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSortBy("points")}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === "points"
                                    ? "bg-mwiri-blue text-white shadow-sm"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                }`}
                        >
                            By Performance
                        </button>
                        <button
                            onClick={() => setSortBy("goals")}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === "goals"
                                    ? "bg-mwiri-blue text-white shadow-sm"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                }`}
                        >
                            By Goals
                        </button>
                        <button
                            onClick={() => setSortBy("name")}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === "name"
                                    ? "bg-mwiri-blue text-white shadow-sm"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                }`}
                        >
                            A-Z
                        </button>
                    </div>
                </div>

                {/* Grouped Teams Display */}
                {sortBy === "points" && !searchQuery ? (
                    <>
                        {/* Top Teams */}
                        {topTeams.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-2xl">🏆</span>
                                    Top Teams
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {topTeams.map((team: any) => (
                                        <ClubCard key={team.id} team={team} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Mid Table */}
                        {midTable.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-2xl">⚽</span>
                                    Mid Table
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {midTable.map((team: any) => (
                                        <ClubCard key={team.id} team={team} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Lower Half */}
                        {lowerHalf.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    Lower Half
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {lowerHalf.map((team: any) => (
                                        <ClubCard key={team.id} team={team} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                ) : (
                    /* All Teams Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredAndSortedTeams.map((team: any) => (
                            <ClubCard key={team.id} team={team} />
                        ))}
                    </div>
                )}

                {/* No Results */}
                {filteredAndSortedTeams.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No clubs found</h3>
                        <p className="text-gray-600">Try adjusting your search query</p>
                    </div>
                )}
            </main>
        </div>
    );
}
