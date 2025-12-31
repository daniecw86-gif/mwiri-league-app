'use client';

import React, { useState, useMemo } from 'react';
import { results } from "../../data/results";
import { teams } from "../../data/teams";
import ResultRow from "../../components/ResultRow";
import { generateMatchDayReport } from "../../utils/reportGenerator";

export default function Results() {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<string>("all");
    const [selectedWeek, setSelectedWeek] = useState<number | "all">("all");

    // Get unique weeks
    const weeks = results.map(r => r.id);

    // Filter results
    const filteredResults = useMemo(() => {
        return results
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
    const totalGoals = results.reduce((acc, group) =>
        acc + group.matches.reduce((sum, match) => sum + (match.homeScore || 0) + (match.awayScore || 0), 0), 0
    );
    const totalMatches = results.reduce((acc, group) => acc + group.matches.length, 0);
    const avgGoals = (totalGoals / totalMatches).toFixed(1);

    const handleGenerateReport = (id: number) => {
        const report = generateMatchDayReport(id);
        setSelectedReport(report);
    };

    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-cover"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-5xl font-black tracking-tight mb-4 flex items-center gap-3">
                        <span className="text-4xl">✅</span>
                        Results
                    </h1>
                    <p className="text-xl text-green-100 max-w-2xl">
                        View all completed matches and match reports
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 -mt-16 relative z-10">
                    <div className="bg-white rounded-2xl shadow-premium-xl p-6 border border-gray-100">
                        <div className="text-3xl font-black text-green-600 mb-1">{totalMatches}</div>
                        <div className="text-gray-600 text-sm font-medium">Matches Played</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-premium-xl p-6 border border-gray-100">
                        <div className="text-3xl font-black text-orange-600 mb-1">{totalGoals}</div>
                        <div className="text-gray-600 text-sm font-medium">Goals Scored</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-premium-xl p-6 border border-gray-100">
                        <div className="text-3xl font-black text-purple-600 mb-1">{avgGoals}</div>
                        <div className="text-gray-600 text-sm font-medium">Avg Goals/Match</div>
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
                                        ? "bg-green-600 text-white shadow-sm"
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
                                            ? "bg-green-600 text-white shadow-sm"
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
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all"
                    >
                        <option value="all">All Teams</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.name}>{team.name}</option>
                        ))}
                    </select>
                </div>

                {/* Results List */}
                <div className="space-y-8">
                    {filteredResults.map((group) => (
                        <div key={group.id}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-black text-sm flex items-center gap-2">
                                    <span>✅</span> Week {group.id}
                                </div>
                                <h3 className="text-xl font-black text-gray-900">{group.date}</h3>
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <button
                                    onClick={() => handleGenerateReport(group.id)}
                                    className="text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                >
                                    📊 Generate Report
                                </button>
                            </div>
                            <div className="space-y-4">
                                {group.matches.map((match) => (
                                    <ResultRow key={match.id} match={match} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredResults.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-600">Try adjusting your filters</p>
                    </div>
                )}
            </main>

            {/* Enhanced Report Modal */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-smooth">
                    <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-premium-xl flex flex-col">
                        <div className="gradient-blue p-6 flex justify-between items-center">
                            <div>
                                <h3 className="font-black text-xl text-white flex items-center gap-2">
                                    <span>📊</span> Match Day Report
                                </h3>
                                <p className="text-blue-100 text-sm mt-1">Comprehensive match analysis</p>
                            </div>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto flex-1">
                            <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-sm bg-gray-50 p-6 rounded-xl border border-gray-200">
                                {selectedReport}
                            </pre>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedReport);
                                    alert('✅ Report copied to clipboard!');
                                }}
                                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                📋 Copy to Clipboard
                            </button>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
