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
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-mwiri-blue-deep via-mwiri-blue to-mwiri-blue-dark text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-cover"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl font-black tracking-tight mb-4 flex items-center gap-3">
                        <span className="text-4xl">📅</span>
                        Fixtures
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        View all upcoming matches across {totalWeeks} matchweeks
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 -mt-16 relative z-10">
                    <div className="bg-white rounded-2xl shadow-premium-lg p-6 border border-gray-100">
                        <div className="text-3xl font-black text-mwiri-blue mb-1">{totalMatches}</div>
                        <div className="text-gray-600 text-sm font-medium">Total Fixtures</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-premium-lg p-6 border border-gray-100">
                        <div className="text-3xl font-black text-green-600 mb-1">{totalWeeks}</div>
                        <div className="text-gray-600 text-sm font-medium">Matchweeks</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-premium-lg p-6 border border-gray-100">
                        <div className="text-3xl font-black text-orange-600 mb-1">{teams.length}</div>
                        <div className="text-gray-600 text-sm font-medium">Teams Competing</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Week Filter Tabs */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-x-auto">
                        <div className="flex gap-2 min-w-max">
                            <button
                                onClick={() => setSelectedWeek("all")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${selectedWeek === "all"
                                        ? "bg-mwiri-blue text-white shadow-sm"
                                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                All Weeks
                            </button>
                            {weeks.map(week => (
                                <button
                                    key={week}
                                    onClick={() => setSelectedWeek(week)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${selectedWeek === week
                                            ? "bg-mwiri-blue text-white shadow-sm"
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    Week {week}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Team Filter */}
                    <select
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-mwiri-blue focus:ring-2 focus:ring-mwiri-blue/20 transition-all"
                    >
                        <option value="all">All Teams</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                </div>

                {/* Fixtures List */}
                <div className="space-y-8">
                    {filteredFixtures.map((group) => (
                        <div key={group.id}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-mwiri-blue text-white px-4 py-2 rounded-lg font-black text-sm">
                                    Week {group.id}
                                </div>
                                <h3 className="text-xl font-black text-gray-900">{group.date}</h3>
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-sm text-gray-500 font-medium">
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
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No fixtures found</h3>
                        <p className="text-gray-600">Try adjusting your filters</p>
                    </div>
                )}
            </main>
        </div>
    );
}
