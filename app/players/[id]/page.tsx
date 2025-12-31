import React from 'react';
import { players } from '../../../data/players';
import { teams } from '../../../data/teams';
import PlayerHero from '../../../components/PlayerHero';
import Link from 'next/link';

export async function generateStaticParams() {
    return players.map((player) => ({
        id: player.id.toString(),
    }));
}

const PlayerProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const player = players.find((p) => p.id === parseInt(id));

    if (!player) {
        return <div>Player not found</div>;
    }

    const team = teams.find(t => t.id === player.teamId);
    const playerWithTeamName = {
        ...player,
        teamName: player.teamName || team?.name || 'Unknown Team'
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <PlayerHero player={playerWithTeamName} primaryColor={team?.primaryColor} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="text-3xl font-bold text-mwiri-blue">{player.appearances}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Apps</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="text-3xl font-bold text-mwiri-blue">{player.goals}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Goals</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="text-3xl font-bold text-mwiri-blue">{player.assists}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Assists</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="text-3xl font-bold text-mwiri-blue">{player.cleanSheets}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Clean Sheets</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Bio Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-mwiri-yellow rounded-full"></span>
                                Player Bio
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {player.name} is a key player for {player.teamName || team?.name || 'their team'}. Known for their {player.position === 'Goalkeeper' ? 'reflexes and command of the box' : player.position === 'Defender' ? 'tackling and aerial ability' : player.position === 'Midfielder' ? 'vision and passing range' : 'finishing and movement'}, they have been instrumental in the team's performances this season.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg mt-4">
                                With {player.appearances ?? 0} appearances and {player.goals ?? 0} goals, they continue to be a fan favorite at {team?.stadium || 'the club'}.
                            </p>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900">Personal Details</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Nationality</span>
                                    <span className="font-bold text-gray-900 flex items-center gap-2">
                                        🇺🇬 Uganda
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Position</span>
                                    <span className="font-bold text-gray-900">{player.position}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Squad Number</span>
                                    <span className="font-bold text-gray-900">#{player.number}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Team</span>
                                    <Link href={`/clubs/${player.teamId}`} className="font-bold text-mwiri-blue hover:underline">
                                        {player.teamName || team?.name || 'Unknown Team'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlayerProfile;
