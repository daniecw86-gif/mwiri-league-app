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
    const avgGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : '0.0';

    const handleGenerateReport = (id: number) => {
        const report = generateMatchDayReport(id);
        setSelectedReport(report);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="crystal-glass border-b border-mwiri-gold/20 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-barlow text-4xl md:text-5xl font-black tracking-tight text-white mb-3 flex items-center gap-3">
                        <span className="text-4xl">✅</span>
                        Results
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl">
                        View all completed matches and match reports
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 -mt-14 relative z-10">
                    <div className="crystal-glass rounded-2xl p-5 crystal-hover">
                        <div className="text-3xl font-black text-white mb-1">{totalMatches}</div>
                        <div className="text-white/50 text-sm font-medium">Matches Played</div>
                    </div>
                    <div className="crystal-glass rounded-2xl p-5 crystal-hover">
                        <div className="text-3xl font-black text-mwiri-gold mb-1">{totalGoals}</div>
                        <div className="text-white/50 text-sm font-medium">Goals Scored</div>
                    </div>
                    <div className="crystal-glass rounded-2xl p-5 crystal-hover">
                        <div className="text-3xl font-black text-white mb-1">{avgGoals}</div>
                        <div className="text-white/50 text-sm font-medium">Avg Goals/Match</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Week Filter Tabs */}
                    <div className="flex-1 crystal-glass rounded-xl p-2 overflow-x-auto scrollbar-crystal">
                        <div className="flex gap-2 min-w-max">
                            <button
                                onClick={() => setSelectedWeek("all")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${selectedWeek === "all"
                                    ? "bg-mwiri-gold text-mwiri-blue-deep shadow-sm"
                                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                                    }`}
                            >
                                All Weeks
                            </button>
                            {weeks.map(week => (
                                <button
                                    key={week}
                                    onClick={() => setSelectedWeek(week)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${selectedWeek === week
                                        ? "bg-mwiri-gold text-mwiri-blue-deep shadow-sm"
                                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
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
                        className="crystal-glass border border-mwiri-gold/20 rounded-xl px-4 py-3 font-bold text-sm text-white bg-transparent focus:outline-none focus:border-mwiri-gold focus:ring-2 focus:ring-mwiri-gold/20 transition-all"
                    >
                        <option value="all" className="bg-mwiri-blue-deep text-white">All Teams</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.name} className="bg-mwiri-blue-deep text-white">{team.name}</option>
                        ))}
                    </select>
                </div>

                {/* Results List */}
                <div className="space-y-8">
                    {filteredResults.map((group) => (
                        <div key={group.id}>
                            <div className="flex items-center gap-3 mb-4 flex-wrap">
                                <div className="bg-mwiri-gold text-mwiri-blue-deep px-4 py-2 rounded-lg font-black text-sm flex items-center gap-2">
                                    <span>✅</span> Week {group.id}
                                </div>
                                <h3 className="text-xl font-black text-white">{group.date}</h3>
                                <div className="flex-1 h-px bg-white/10 hidden md:block"></div>
                                <button
                                    onClick={() => handleGenerateReport(group.id)}
                                    className="text-sm font-bold text-mwiri-gold bg-mwiri-gold/10 px-4 py-2 rounded-lg hover:bg-mwiri-gold hover:text-mwiri-blue-deep transition-all"
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
                    <div className="text-center py-16 crystal-glass rounded-2xl">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                        <p className="text-white/50">Try adjusting your filters</p>
                    </div>
                )}
            </main>

            {/* Enhanced Report Modal */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="crystal-glass rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col border border-mwiri-gold/30">
                        <div className="gradient-mwiri p-6 flex justify-between items-center">
                            <div>
                                <h3 className="font-barlow font-black text-xl text-white flex items-center gap-2">
                                    <span>📊</span> Match Day Report
                                </h3>
                                <p className="text-white/60 text-sm mt-1">Comprehensive match analysis</p>
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
                        <div className="p-6 overflow-y-auto flex-1 scrollbar-crystal">
                            <pre className="whitespace-pre-wrap font-sans text-white/80 leading-relaxed text-sm bg-white/5 p-6 rounded-xl border border-white/10">
                                {selectedReport}
                            </pre>
                        </div>
                        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedReport);
                                    alert('✅ Report copied to clipboard!');
                                }}
                                className="px-6 py-3 crystal-glass border border-white/20 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all"
                            >
                                📋 Copy to Clipboard
                            </button>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="crystal-btn text-sm"
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
