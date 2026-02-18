"use client";

import { useState, useMemo } from "react";
import { teams } from "../../data/teams";
import ClubCard from "../../components/ClubCard";
import { Team } from "../../types";

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
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="crystal-glass border-b border-mwiri-gold/20 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-barlow text-4xl md:text-5xl font-black tracking-tight text-white mb-3 flex items-center gap-3">
                        <span className="text-4xl">🏟️</span>
                        All Clubs
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl">
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
                            <svg className="h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <label htmlFor="club-search" className="sr-only">Search clubs</label>
                        <input
                            id="club-search"
                            type="text"
                            className="block w-full pl-12 pr-4 py-3 border border-white/10 rounded-xl leading-5 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-mwiri-gold focus:ring-2 focus:ring-mwiri-gold/20 transition-all"
                            placeholder="Search clubs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Sort Options */}
                    <div className="flex gap-2 bg-white/5 p-1 rounded-xl" role="group" aria-label="Sort clubs">
                        <button
                            onClick={() => setSortBy("points")}
                            aria-pressed={sortBy === "points"}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === "points"
                                ? "bg-mwiri-gold/20 text-mwiri-gold shadow-sm"
                                : "text-white/50 hover:text-white/80"
                                }`}
                        >
                            By Performance
                        </button>
                        <button
                            onClick={() => setSortBy("goals")}
                            aria-pressed={sortBy === "goals"}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === "goals"
                                ? "bg-mwiri-gold/20 text-mwiri-gold shadow-sm"
                                : "text-white/50 hover:text-white/80"
                                }`}
                        >
                            By Goals
                        </button>
                        <button
                            onClick={() => setSortBy("name")}
                            aria-pressed={sortBy === "name"}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === "name"
                                ? "bg-mwiri-gold/20 text-mwiri-gold shadow-sm"
                                : "text-white/50 hover:text-white/80"
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
                                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                                    <span className="text-2xl">🏆</span>
                                    Top Teams
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {topTeams.map((team: Team) => (
                                        <ClubCard key={team.id} team={team} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Mid Table */}
                        {midTable.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                                    <span className="text-2xl">⚽</span>
                                    Mid Table
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {midTable.map((team: Team) => (
                                        <ClubCard key={team.id} team={team} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Lower Half */}
                        {lowerHalf.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    Lower Half
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {lowerHalf.map((team: Team) => (
                                        <ClubCard key={team.id} team={team} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredAndSortedTeams.map((team: Team) => (
                            <ClubCard key={team.id} team={team} />
                        ))}
                    </div>
                )}

                {/* No Results */}
                {filteredAndSortedTeams.length === 0 && (
                    <div className="text-center py-16 crystal-glass rounded-2xl">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-white mb-2">No clubs found</h3>
                        <p className="text-white/50">Try adjusting your search query</p>
                    </div>
                )}
            </main>
        </div>
    );
}
