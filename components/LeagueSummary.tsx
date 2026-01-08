import React from 'react';
import Link from 'next/link';
import { teams } from '../data/teams';
import { results } from '../data/results';
import { players } from '../data/players';

const LeagueSummary = () => {
    // Calculate aggregate stats
    const activeTeams = teams.filter(t => t.group !== 'Inactive');

    // Total matches played
    const totalMatches = results.reduce((sum, fixture) => sum + fixture.matches.length, 0);

    // Total goals scored
    const totalGoals = results.reduce((sum, fixture) => {
        return sum + fixture.matches.reduce((matchSum, match) => {
            return matchSum + (match.homeScore ?? 0) + (match.awayScore ?? 0);
        }, 0);
    }, 0);

    // Top scorer
    const topScorer = [...players].sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0))[0];

    // Most assists
    const topAssister = [...players].sort((a, b) => (b.assists ?? 0) - (a.assists ?? 0))[0];

    // League leader
    const leagueLeader = [...activeTeams].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return (b.gf - b.ga) - (a.gf - a.ga);
    })[0];

    const stats = [
        {
            label: 'Teams',
            value: activeTeams.length,
            icon: '🏟️',
            color: 'from-blue-500 to-blue-600'
        },
        {
            label: 'Matches',
            value: totalMatches,
            icon: '⚽',
            color: 'from-green-500 to-green-600'
        },
        {
            label: 'Goals',
            value: totalGoals,
            icon: '🎯',
            color: 'from-mwiri-gold to-yellow-500'
        },
        {
            label: 'Goals/Match',
            value: totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : '0',
            icon: '📊',
            color: 'from-purple-500 to-purple-600'
        },
    ];

    return (
        <div className="crystal-glass rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-mwiri-blue to-mwiri-blue-dark px-6 py-4 border-b border-white/10">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <span>🏆</span> Season at a Glance
                </h3>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
                {stats.map((stat, index) => (
                    <div key={index} className="p-4 text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-2xl font-black text-white">{stat.value}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Highlights */}
            <div className="p-4 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* League Leader */}
                    {leagueLeader && (
                        <Link href="/table" className="bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-colors">
                            <div className="text-xs text-mwiri-gold font-bold uppercase tracking-wider mb-1">League Leader</div>
                            <div className="font-bold text-white text-sm">{leagueLeader.name}</div>
                            <div className="text-xs text-white/50">{leagueLeader.points} pts</div>
                        </Link>
                    )}

                    {/* Top Scorer */}
                    {topScorer && (
                        <Link href={`/players/${topScorer.id}`} className="bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-colors">
                            <div className="text-xs text-mwiri-gold font-bold uppercase tracking-wider mb-1">Top Scorer</div>
                            <div className="font-bold text-white text-sm">{topScorer.name}</div>
                            <div className="text-xs text-white/50">{topScorer.goals ?? 0} goals</div>
                        </Link>
                    )}

                    {/* Top Assister */}
                    {topAssister && (
                        <Link href={`/players/${topAssister.id}`} className="bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-colors">
                            <div className="text-xs text-mwiri-gold font-bold uppercase tracking-wider mb-1">Playmaker</div>
                            <div className="font-bold text-white text-sm">{topAssister.name}</div>
                            <div className="text-xs text-white/50">{topAssister.assists ?? 0} assists</div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeagueSummary;
