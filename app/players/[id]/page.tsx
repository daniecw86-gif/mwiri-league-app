import React from 'react';
import { players } from '../../../data/players';
import { teams } from '../../../data/teams';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Player Profile | Mwiri League',
};

export async function generateStaticParams() {
    return players.map((player) => ({
        id: player.id.toString(),
    }));
}

const PlayerProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const player = players.find((p) => p.id === parseInt(id));

    if (!player) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😢</div>
                    <h1 className="text-2xl font-bold text-white mb-2">Player Not Found</h1>
                    <Link href="/stats" className="text-mwiri-gold hover:underline">
                        ← Back to Stats
                    </Link>
                </div>
            </div>
        );
    }

    const team = teams.find(t => t.id === player.teamId);
    const playerWithTeamName = {
        ...player,
        teamName: player.teamName || team?.name || 'Unknown Team'
    };

    // Calculate contribution score
    const totalContributions = (player.goals ?? 0) + (player.assists ?? 0);
    const goalsPerGame = player.appearances ? ((player.goals ?? 0) / player.appearances).toFixed(2) : '0.00';

    // Position-based icon
    const getPositionIcon = (pos: string) => {
        switch (pos) {
            case 'Goalkeeper': return '🧤';
            case 'Defender': return '🛡️';
            case 'Midfielder': return '⚙️';
            case 'Forward': return '⚡';
            default: return '⚽';
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden" style={{
                background: `linear-gradient(135deg, ${team?.primaryColor || '#005696'} 0%, #0a1628 100%)`
            }}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="player-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="2" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#player-grid)" />
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Player Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/20">
                                {player.image ? (
                                    <Image
                                        src={player.image}
                                        alt={player.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-6xl md:text-7xl font-black text-white/80">
                                        {player.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            {/* Squad Number Badge */}
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-mwiri-gold flex items-center justify-center font-black text-xl text-mwiri-blue-deep shadow-lg">
                                {player.number}
                            </div>
                        </div>

                        {/* Player Info */}
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <span className="text-2xl">{getPositionIcon(player.position)}</span>
                                <span className="text-sm font-bold text-white/60 uppercase tracking-wider">
                                    {player.position}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                                {player.name}
                            </h1>
                            <Link
                                href={`/clubs/${player.teamId}`}
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                            >
                                {team?.logo && (
                                    <div className="w-6 h-6 relative">
                                        <Image src={team.logo} alt={team.name} fill className="object-contain" />
                                    </div>
                                )}
                                <span className="font-bold text-white">{playerWithTeamName.teamName}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                    <div className="crystal-glass rounded-xl p-5 text-center">
                        <div className="text-3xl font-black text-white">{player.appearances ?? 0}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mt-1 font-medium">Apps</div>
                    </div>
                    <div className="crystal-glass rounded-xl p-5 text-center">
                        <div className="text-3xl font-black text-mwiri-gold">{player.goals ?? 0}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mt-1 font-medium">Goals</div>
                    </div>
                    <div className="crystal-glass rounded-xl p-5 text-center">
                        <div className="text-3xl font-black text-green-400">{player.assists ?? 0}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mt-1 font-medium">Assists</div>
                    </div>
                    <div className="crystal-glass rounded-xl p-5 text-center">
                        <div className="text-3xl font-black text-blue-400">{player.cleanSheets ?? 0}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mt-1 font-medium">Clean Sheets</div>
                    </div>
                    <div className="crystal-glass rounded-xl p-5 text-center">
                        <div className="text-3xl font-black text-yellow-400">{player.yellowCards ?? 0}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mt-1 font-medium">Yellow Cards</div>
                    </div>
                    <div className="crystal-glass rounded-xl p-5 text-center">
                        <div className="text-3xl font-black text-red-400">{player.redCards ?? 0}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mt-1 font-medium">Red Cards</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Performance Metrics */}
                    <div className="lg:col-span-2 crystal-glass rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-mwiri-gold/20 to-transparent px-6 py-4 border-b border-white/10">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span>📊</span> Performance
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Goals + Assists */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white/60 text-sm">Goal Contributions</span>
                                    <span className="font-bold text-mwiri-gold">{totalContributions}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-mwiri-gold to-yellow-400 transition-all"
                                        style={{ width: `${Math.min(totalContributions * 5, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Goals Per Game */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white/60 text-sm">Goals Per Game</span>
                                    <span className="font-bold text-green-400">{goalsPerGame}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
                                        style={{ width: `${Math.min(parseFloat(goalsPerGame) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Games Played Progress */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white/60 text-sm">Games Started</span>
                                    <span className="font-bold text-blue-400">{player.appearances ?? 0}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                                        style={{ width: `${Math.min((player.appearances ?? 0) * 10, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-white/70 leading-relaxed">
                                    {player.name} is a key player for {playerWithTeamName.teamName}.
                                    {player.position === 'Goalkeeper' ? ' Known for their reflexes and command of the box.' :
                                        player.position === 'Defender' ? ' Known for their tackling and aerial ability.' :
                                            player.position === 'Midfielder' ? ' Known for their vision and passing range.' :
                                                ' Known for their finishing and movement off the ball.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Player Details Card */}
                    <div className="crystal-glass rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500/20 to-transparent px-6 py-4 border-b border-white/10">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span>ℹ️</span> Details
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-white/50 text-sm">Nationality</span>
                                <span className="font-bold text-white">🇺🇬 Uganda</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-white/50 text-sm">Position</span>
                                <span className="font-bold text-white">{player.position}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-white/50 text-sm">Squad Number</span>
                                <span className="font-bold text-mwiri-gold">#{player.number}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-white/50 text-sm">Team</span>
                                <Link href={`/clubs/${player.teamId}`} className="font-bold text-mwiri-gold hover:underline">
                                    {playerWithTeamName.teamName}
                                </Link>
                            </div>
                        </div>

                        {/* Back Link */}
                        <div className="px-6 py-4 border-t border-white/10 text-center">
                            <Link
                                href="/stats"
                                className="text-sm font-bold text-white/60 hover:text-mwiri-gold transition-colors"
                            >
                                ← Back to Stats
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlayerProfile;
