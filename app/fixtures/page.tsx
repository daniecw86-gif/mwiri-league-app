"use client";

import { useState, useMemo } from "react";
import { fixtures } from "../../data/fixtures";
import { teams } from "../../data/teams";
import MatchRow from "../../components/MatchRow";

export default function Fixtures() {
    const [selectedTeam, setSelectedTeam] = useState<string>("all");
    const [selectedWeek, setSelectedWeek] = useState<number | "all">("all");

    // Get unique weeks
    const weeks = fixtures.map(f => f.id);

    // Filter fixtures
    const filteredFixtures = useMemo(() => {
        return fixtures
            .filter(group => selectedWeek === "all" || group.id === selectedWeek)
            .map(group => ({
                ...group,
                matches: group.matches.filter(match =>
                    selectedTeam === "all" ||
                    match.homeTeam === selectedTeam ||
                    match.awayTeam === selectedTeam
                )
            }))
            .filter(group => group.matches.length > 0);
    }, [selectedTeam, selectedWeek]);

    // Calculate stats
    const totalMatches = fixtures.reduce((acc, group) => acc + group.matches.length, 0);
    const totalWeeks = fixtures.length;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="crystal-glass border-b border-mwiri-gold/20 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-barlow text-4xl md:text-5xl font-black tracking-tight text-white mb-3 flex items-center gap-3">
                        <span className="text-4xl">📅</span>
                        Fixtures
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl">
                        View all upcoming matches across {totalWeeks} match days
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 -mt-14 relative z-10">
                    <div className="crystal-glass rounded-2xl p-5 crystal-hover">
                        <div className="text-3xl font-black text-mwiri-gold mb-1">{totalMatches}</div>
                        <div className="text-white/50 text-sm font-medium">Total Fixtures</div>
                    </div>
                    <div className="crystal-glass rounded-2xl p-5 crystal-hover">
                        <div className="text-3xl font-black text-white mb-1">{totalWeeks}</div>
                        <div className="text-white/50 text-sm font-medium">Match Days</div>
                    </div>
                    <div className="crystal-glass rounded-2xl p-5 crystal-hover">
                        <div className="text-3xl font-black text-mwiri-gold mb-1">{teams.length}</div>
                        <div className="text-white/50 text-sm font-medium">Teams Competing</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Week Filter Tabs */}
                    <div className="flex-1 crystal-glass rounded-xl p-2 overflow-x-auto scrollbar-crystal" role="group" aria-label="Filter by week">
                        <div className="flex gap-2 min-w-max">
                            <button
                                onClick={() => setSelectedWeek("all")}
                                aria-pressed={selectedWeek === "all"}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${selectedWeek === "all"
                                    ? "bg-mwiri-gold text-mwiri-blue-deep shadow-sm"
                                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                                    }`}
                            >
                                All Match Days
                            </button>
                            {weeks.map(week => (
                                <button
                                    key={week}
                                    onClick={() => setSelectedWeek(week)}
                                    aria-pressed={selectedWeek === week}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${selectedWeek === week
                                        ? "bg-mwiri-gold text-mwiri-blue-deep shadow-sm"
                                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                                        }`}
                                >
                                    Match Day {week}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Team Filter */}
                    <label htmlFor="team-filter" className="sr-only">Filter by team</label>
                    <select
                        id="team-filter"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        className="crystal-glass border border-mwiri-gold/20 rounded-xl px-4 py-3 font-bold text-sm text-white bg-transparent focus:outline-none focus:border-mwiri-gold focus:ring-2 focus:ring-mwiri-gold/20 transition-all"
                    >
                        <option value="all" className="bg-mwiri-blue-deep text-white">All Teams</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.name} className="bg-mwiri-blue-deep text-white">{team.name}</option>
                        ))}
                    </select>
                </div>

                {/* Fixtures List */}
                <div className="space-y-8">
                    {filteredFixtures.map((group) => (
                        <div key={group.id}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-mwiri-gold text-mwiri-blue-deep px-4 py-2 rounded-lg font-black text-sm">
                                    Match Day {group.id}
                                </div>
                                <h3 className="text-xl font-black text-white">{group.date}</h3>
                                <div className="flex-1 h-px bg-white/10"></div>
                                <span className="text-sm text-white/40 font-medium">
                                    {group.matches.length} {group.matches.length === 1 ? 'match' : 'matches'}
                                </span>
                            </div>
                            <div className="space-y-4">
                                {group.matches.map((match) => (
                                    <MatchRow key={match.id} match={match} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredFixtures.length === 0 && (
                    <div className="text-center py-16 crystal-glass rounded-2xl">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-white mb-2">No fixtures found</h3>
                        <p className="text-white/50">Try adjusting your filters</p>
                    </div>
                )}
            </main>
        </div>
    );
}
