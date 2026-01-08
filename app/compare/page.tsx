'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { teams } from '../../data/teams';
import { Team } from '../../types';

// Stat comparison bar component
const StatBar = ({
    label,
    value1,
    value2,
    isHigherBetter = true,
    format = 'number'
}: {
    label: string;
    value1: number;
    value2: number;
    isHigherBetter?: boolean;
    format?: 'number' | 'percentage' | 'diff';
}) => {
    const total = value1 + value2;
    const width1 = total > 0 ? (value1 / total) * 100 : 50;
    const width2 = total > 0 ? (value2 / total) * 100 : 50;

    const getWinnerClass = (val: number, otherVal: number) => {
        if (val === otherVal) return 'text-white/70';
        const isWinner = isHigherBetter ? val > otherVal : val < otherVal;
        return isWinner ? 'text-mwiri-gold font-black' : 'text-white/50';
    };

    const formatValue = (val: number) => {
        if (format === 'diff') return val >= 0 ? `+${val}` : `${val}`;
        return val.toString();
    };

    return (
        <div className="py-3">
            <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-bold ${getWinnerClass(value1, value2)}`}>
                    {formatValue(value1)}
                </span>
                <span className="text-xs text-white/50 uppercase tracking-wider font-medium">
                    {label}
                </span>
                <span className={`text-sm font-bold ${getWinnerClass(value2, value1)}`}>
                    {formatValue(value2)}
                </span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-white/10">
                <div
                    className="bg-gradient-to-r from-mwiri-blue to-blue-400 transition-all duration-500"
                    style={{ width: `${width1}%` }}
                />
                <div
                    className="bg-gradient-to-l from-mwiri-gold to-yellow-400 transition-all duration-500"
                    style={{ width: `${width2}%` }}
                />
            </div>
        </div>
    );
};

// Form dot component
const FormDot = ({ result }: { result: string }) => {
    let bgClass = 'bg-gray-400';
    if (result === 'W') bgClass = 'bg-green-500';
    if (result === 'L') bgClass = 'bg-red-500';
    if (result === 'D') bgClass = 'bg-yellow-500';

    return (
        <span
            className={`w-5 h-5 rounded-full ${bgClass} flex items-center justify-center text-[10px] font-bold text-white`}
            title={result === 'W' ? 'Win' : result === 'L' ? 'Loss' : 'Draw'}
        >
            {result}
        </span>
    );
};

// Team selector dropdown
const TeamSelector = ({
    selectedTeam,
    onSelect,
    excludeTeamId,
    side
}: {
    selectedTeam: Team | null;
    onSelect: (team: Team) => void;
    excludeTeamId?: number;
    side: 'left' | 'right';
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const activeTeams = teams.filter(t => t.group !== 'Inactive' && t.id !== excludeTeamId);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-4 rounded-xl crystal-glass border-2 transition-all ${isOpen ? 'border-mwiri-gold' : 'border-white/10 hover:border-white/30'
                    }`}
            >
                {selectedTeam ? (
                    <div className="flex items-center gap-3 justify-center">
                        <div className="w-10 h-10 relative bg-white/10 rounded-lg p-1">
                            {selectedTeam.logo ? (
                                <Image
                                    src={selectedTeam.logo}
                                    alt={selectedTeam.name}
                                    fill
                                    className="object-contain p-0.5"
                                />
                            ) : (
                                <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold text-white/60">
                                    {selectedTeam.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <span className="font-bold text-white truncate">{selectedTeam.name}</span>
                    </div>
                ) : (
                    <span className="text-white/50 font-medium">Select {side === 'left' ? 'First' : 'Second'} Team</span>
                )}
            </button>

            {isOpen && (
                <div className="absolute z-50 top-full mt-2 w-full bg-mwiri-blue-deep/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl max-h-64 overflow-y-auto scrollbar-crystal">
                    {activeTeams.map(team => (
                        <button
                            key={team.id}
                            onClick={() => {
                                onSelect(team);
                                setIsOpen(false);
                            }}
                            className="w-full p-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
                        >
                            <div className="w-8 h-8 relative bg-white/10 rounded-lg p-0.5">
                                {team.logo ? (
                                    <Image
                                        src={team.logo}
                                        alt={team.name}
                                        fill
                                        className="object-contain p-0.5"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold text-white/60">
                                        {team.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <span className="text-sm font-medium text-white">{team.name}</span>
                            <span className="ml-auto text-xs text-white/40">{team.points} pts</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function ComparePage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [team1, setTeam1] = useState<Team | null>(null);
    const [team2, setTeam2] = useState<Team | null>(null);

    // Load teams from URL params
    useEffect(() => {
        const team1Id = searchParams.get('team1');
        const team2Id = searchParams.get('team2');

        if (team1Id) {
            const foundTeam = teams.find(t => t.id === parseInt(team1Id));
            if (foundTeam) setTeam1(foundTeam);
        }
        if (team2Id) {
            const foundTeam = teams.find(t => t.id === parseInt(team2Id));
            if (foundTeam) setTeam2(foundTeam);
        }
    }, [searchParams]);

    // Update URL when teams change
    useEffect(() => {
        if (team1 || team2) {
            const params = new URLSearchParams();
            if (team1) params.set('team1', team1.id.toString());
            if (team2) params.set('team2', team2.id.toString());
            router.replace(`/compare?${params.toString()}`, { scroll: false });
        }
    }, [team1, team2, router]);

    // Calculate league positions
    const sortedTeams = useMemo(() => {
        return [...teams]
            .filter(t => t.group !== 'Inactive')
            .sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                const gdA = a.gf - a.ga;
                const gdB = b.gf - b.ga;
                if (gdB !== gdA) return gdB - gdA;
                return b.gf - a.gf;
            });
    }, []);

    const getPosition = (team: Team) => sortedTeams.findIndex(t => t.id === team.id) + 1;

    const canCompare = team1 && team2;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-mwiri-blue via-mwiri-blue-dark to-mwiri-blue-deep text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="compare-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="5" cy="5" r="1" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#compare-grid)" />
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <span className="text-2xl">⚔️</span>
                        <span className="text-sm font-bold uppercase tracking-wider text-mwiri-yellow">Team Comparison</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Head to <span className="text-mwiri-yellow">Head</span>
                    </h1>

                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Compare any two teams side by side. See who has the edge in points, goals, and form.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Team Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 -mt-8 relative z-10">
                    <TeamSelector
                        selectedTeam={team1}
                        onSelect={setTeam1}
                        excludeTeamId={team2?.id}
                        side="left"
                    />
                    <div className="flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mwiri-gold to-yellow-500 flex items-center justify-center font-black text-mwiri-blue-deep text-xl shadow-xl">
                            VS
                        </div>
                    </div>
                    <TeamSelector
                        selectedTeam={team2}
                        onSelect={setTeam2}
                        excludeTeamId={team1?.id}
                        side="right"
                    />
                </div>

                {/* Comparison Panel */}
                {canCompare ? (
                    <div className="space-y-6">
                        {/* Team Headers with Position */}
                        <div className="crystal-glass rounded-2xl p-6">
                            <div className="flex items-center justify-between gap-4">
                                {/* Team 1 */}
                                <div className="flex-1 text-center">
                                    <div className="w-20 h-20 mx-auto relative bg-white/10 rounded-xl p-2 mb-3">
                                        {team1.logo ? (
                                            <Image
                                                src={team1.logo}
                                                alt={team1.name}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-2xl font-bold text-white/60">
                                                {team1.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-black text-white text-lg mb-1">{team1.name}</h3>
                                    <div className="inline-flex items-center gap-1.5 bg-blue-500/20 px-3 py-1 rounded-full">
                                        <span className="text-xs text-blue-300 font-medium">Position</span>
                                        <span className="font-black text-white">{getPosition(team1)}</span>
                                    </div>
                                </div>

                                {/* VS Badge */}
                                <div className="flex-shrink-0">
                                    <div className="text-3xl font-black text-white/20">VS</div>
                                </div>

                                {/* Team 2 */}
                                <div className="flex-1 text-center">
                                    <div className="w-20 h-20 mx-auto relative bg-white/10 rounded-xl p-2 mb-3">
                                        {team2.logo ? (
                                            <Image
                                                src={team2.logo}
                                                alt={team2.name}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-2xl font-bold text-white/60">
                                                {team2.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-black text-white text-lg mb-1">{team2.name}</h3>
                                    <div className="inline-flex items-center gap-1.5 bg-yellow-500/20 px-3 py-1 rounded-full">
                                        <span className="text-xs text-yellow-300 font-medium">Position</span>
                                        <span className="font-black text-white">{getPosition(team2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Comparison */}
                        <div className="crystal-glass rounded-2xl p-6">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                <span>📊</span> Season Stats
                            </h4>
                            <div className="divide-y divide-white/5">
                                <StatBar label="Points" value1={team1.points} value2={team2.points} />
                                <StatBar label="Played" value1={team1.played} value2={team2.played} />
                                <StatBar label="Wins" value1={team1.won} value2={team2.won} />
                                <StatBar label="Draws" value1={team1.drawn} value2={team2.drawn} isHigherBetter={false} />
                                <StatBar label="Losses" value1={team1.lost} value2={team2.lost} isHigherBetter={false} />
                                <StatBar label="Goals For" value1={team1.gf} value2={team2.gf} />
                                <StatBar label="Goals Against" value1={team1.ga} value2={team2.ga} isHigherBetter={false} />
                                <StatBar label="Goal Diff" value1={team1.gf - team1.ga} value2={team2.gf - team2.ga} format="diff" />
                            </div>
                        </div>

                        {/* Form Comparison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Team 1 Form */}
                            <div className="crystal-glass rounded-2xl p-5">
                                <h4 className="font-bold text-white mb-3 text-sm">
                                    {team1.name} Form (Last 5)
                                </h4>
                                <div className="flex gap-2 justify-center">
                                    {team1.form.length > 0 ? (
                                        team1.form.slice(-5).map((result, i) => (
                                            <FormDot key={i} result={result} />
                                        ))
                                    ) : (
                                        <span className="text-white/40 text-sm">No matches played</span>
                                    )}
                                </div>
                            </div>

                            {/* Team 2 Form */}
                            <div className="crystal-glass rounded-2xl p-5">
                                <h4 className="font-bold text-white mb-3 text-sm">
                                    {team2.name} Form (Last 5)
                                </h4>
                                <div className="flex gap-2 justify-center">
                                    {team2.form.length > 0 ? (
                                        team2.form.slice(-5).map((result, i) => (
                                            <FormDot key={i} result={result} />
                                        ))
                                    ) : (
                                        <span className="text-white/40 text-sm">No matches played</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Home/Away Comparison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Home Stats */}
                            <div className="crystal-glass rounded-2xl p-5">
                                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <span>🏠</span> Home Record
                                </h4>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-white/5 rounded-xl p-3">
                                        <p className="text-2xl font-black text-white">{team1.home.won}-{team1.home.drawn}-{team1.home.lost}</p>
                                        <p className="text-xs text-white/50 mt-1">{team1.name}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3">
                                        <p className="text-2xl font-black text-mwiri-gold">{team2.home.won}-{team2.home.drawn}-{team2.home.lost}</p>
                                        <p className="text-xs text-white/50 mt-1">{team2.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Away Stats */}
                            <div className="crystal-glass rounded-2xl p-5">
                                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <span>✈️</span> Away Record
                                </h4>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-white/5 rounded-xl p-3">
                                        <p className="text-2xl font-black text-white">{team1.away.won}-{team1.away.drawn}-{team1.away.lost}</p>
                                        <p className="text-xs text-white/50 mt-1">{team1.name}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3">
                                        <p className="text-2xl font-black text-mwiri-gold">{team2.away.won}-{team2.away.drawn}-{team2.away.lost}</p>
                                        <p className="text-xs text-white/50 mt-1">{team2.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Share Button */}
                        <div className="text-center pt-4">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }}
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share Comparison
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Placeholder when no teams selected */
                    <div className="crystal-glass rounded-2xl p-12 text-center">
                        <div className="text-6xl mb-4">⚽</div>
                        <h3 className="text-xl font-bold text-white mb-2">Select Two Teams</h3>
                        <p className="text-white/50">Choose teams from the dropdowns above to compare their stats</p>
                    </div>
                )}
            </div>
        </div>
    );
}
