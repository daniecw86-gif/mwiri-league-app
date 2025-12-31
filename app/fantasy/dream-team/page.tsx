"use client";

import { useState, useEffect } from 'react';
import { players } from '../../../data/players';
import { teams } from '../../../data/teams';
import { formations, FormationKey, positionColors, calculateTeamStats, saveDreamTeam, loadDreamTeam } from '../../../utils/fantasyUtils';
import { Player } from '../../../types';

type PositionType = 'GK' | 'DEF' | 'MID' | 'FWD';

export default function DreamTeamBuilder() {
    const [selectedFormation, setSelectedFormation] = useState<FormationKey>("4-4-2");
    const [selectedPlayers, setSelectedPlayers] = useState<(Player | null)[]>(Array(11).fill(null));
    const [selectingPosition, setSelectingPosition] = useState<{ index: number; position: PositionType } | null>(null);
    const [teamName, setTeamName] = useState("My Dream Team");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTeam, setFilterTeam] = useState<string>("all");

    // Load saved team on mount
    useEffect(() => {
        const saved = loadDreamTeam();
        if (saved) {
            setTeamName(saved.teamName);
            setSelectedFormation(saved.formation);
            setSelectedPlayers(saved.players);
        }
    }, []);

    const formation = formations[selectedFormation];

    // Get available players for a position
    const getAvailablePlayers = (position: PositionType) => {
        return players.filter(p => {
            // Filter by position
            if (p.position !== position) return false;

            // Filter by search
            if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            // Filter by team
            if (filterTeam !== "all") {
                const team = teams.find(t => t.id === p.teamId);
                if (team?.name !== filterTeam) return false;
            }

            // Don't show already selected players
            if (selectedPlayers.some(sp => sp?.id === p.id)) return false;

            return true;
        }).sort((a, b) => (b.goals || 0) - (a.goals || 0)); // Sort by goals
    };

    // Handle player selection
    const selectPlayer = (player: Player, index: number) => {
        const newPlayers = [...selectedPlayers];
        newPlayers[index] = player;
        setSelectedPlayers(newPlayers);
        setSelectingPosition(null);
        setSearchQuery("");
    };

    // Handle player removal
    const removePlayer = (index: number) => {
        const newPlayers = [...selectedPlayers];
        newPlayers[index] = null;
        setSelectedPlayers(newPlayers);
    };

    // Handle formation change
    const changeFormation = (newFormation: FormationKey) => {
        setSelectedFormation(newFormation);
        setSelectedPlayers(Array(11).fill(null)); // Reset team
    };

    // Handle save
    const handleSave = () => {
        if (selectedPlayers.some(p => p === null)) {
            alert("Please fill all positions before saving!");
            return;
        }

        saveDreamTeam(teamName, selectedFormation, selectedPlayers as Player[]);
        alert("Dream Team saved successfully! 🎉");
    };

    // Get stats
    const stats = calculateTeamStats(selectedPlayers.filter(p => p !== null) as Player[]);

    return (
        <div className="min-h-screen bg-transparent pb-12">
            {/* Hero */}
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-black mb-4 flex items-center gap-3">
                        <span>🏆</span>
                        Dream Team Builder
                    </h1>
                    <p className="text-xl text-orange-100">
                        Build your ultimate XI from the best Mwiri League players
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Pitch */}
                    <div className="lg:col-span-2">
                        {/* Team Name */}
                        <div className="mb-6">
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="w-full text-3xl font-black text-gray-900 bg-transparent border-b-4 border-amber-500 focus:outline-none focus:border-orange-500 transition-colors px-2 py-2"
                                placeholder="My Dream Team"
                            />
                        </div>

                        {/* Formation Selector */}
                        <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 p-6 mb-6">
                            <h3 className="font-black text-gray-900 mb-4">Choose Formation</h3>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                {Object.keys(formations).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => changeFormation(f as FormationKey)}
                                        className={`px-4 py-3 rounded-xl font-bold transition-all ${selectedFormation === f
                                                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pitch */}
                        <div className="bg-gradient-to-b from-green-600 to-green-700 rounded-3xl shadow-premium-xl overflow-hidden border-4 border-white relative"
                            style={{ aspectRatio: '3/4', minHeight: '600px' }}>
                            {/* Pitch lines */}
                            <div className="absolute inset-0">
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/30"></div>
                                <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute top-0 left-1/2 w-48 h-24 border-2 border-white/30 border-t-0 -translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-1/2 w-48 h-24 border-2 border-white/30 border-b-0 -translate-x-1/2"></div>
                            </div>

                            {/* Players */}
                            <div className="relative z-10 h-full flex flex-col justify-around py-8 px-4">
                                {formation.layout.map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex justify-around items-center">
                                        {Array.from({ length: row.count }).map((_, posIndex) => {
                                            const playerIndex = formation.layout
                                                .slice(0, rowIndex)
                                                .reduce((sum, r) => sum + r.count, 0) + posIndex;
                                            const player = selectedPlayers[playerIndex];
                                            const colors = positionColors[row.position as PositionType];

                                            return (
                                                <div key={posIndex} className="flex flex-col items-center">
                                                    {player ? (
                                                        <div className="group relative">
                                                            <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg border-4 border-white cursor-pointer hover:scale-110 transition-transform`}
                                                                onClick={() => removePlayer(playerIndex)}>
                                                                {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                            </div>
                                                            <div className="mt-2 bg-white/90 rounded-lg px-2 py-1 text-xs font-bold text-gray-900 text-center shadow-sm max-w-[80px] truncate">
                                                                {player.name.split(' ').pop()}
                                                            </div>
                                                            <button
                                                                onClick={() => removePlayer(playerIndex)}
                                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => setSelectingPosition({ index: playerIndex, position: row.position as PositionType })}
                                                            className={`w-16 h-16 ${colors.bg} rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg border-4 border-white border-dashed hover:scale-110 transition-transform opacity-70 hover:opacity-100`}
                                                        >
                                                            <span className="text-xs">{row.position}</span>
                                                            <span className="text-2xl">+</span>
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-lg py-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            💾 Save Dream Team
                        </button>
                    </div>

                    {/* Right: Player Selection / Stats */}
                    <div>
                        {selectingPosition ? (
                            <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden sticky top-4">
                                <div className={`${positionColors[selectingPosition.position].bg} px-6 py-4`}>
                                    <h3 className="font-black text-white flex items-center justify-between">
                                        <span>Select {selectingPosition.position}</span>
                                        <button
                                            onClick={() => setSelectingPosition(null)}
                                            className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold"
                                        >
                                            ✕
                                        </button>
                                    </h3>
                                </div>

                                {/* Filters */}
                                <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-3">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search players..."
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                    />
                                    <select
                                        value={filterTeam}
                                        onChange={(e) => setFilterTeam(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                    >
                                        <option value="all">All Teams</option>
                                        {teams.map(t => (
                                            <option key={t.id} value={t.name}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Player List */}
                                <div className="max-h-[500px] overflow-y-auto">
                                    {getAvailablePlayers(selectingPosition.position).map(player => {
                                        const team = teams.find(t => t.id === player.teamId);
                                        return (
                                            <button
                                                key={player.id}
                                                onClick={() => selectPlayer(player, selectingPosition.index)}
                                                className="w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 ${positionColors[selectingPosition.position].bg} rounded-full flex items-center justify-center text-white font-black shadow-sm`}>
                                                        {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                                                            {player.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">{team?.name}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-bold text-gray-900">⚽ {player.goals || 0}</div>
                                                        <div className="text-xs text-gray-500">goals</div>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {getAvailablePlayers(selectingPosition.position).length === 0 && (
                                        <div className="p-8 text-center text-gray-500">
                                            <div className="text-4xl mb-2">😕</div>
                                            <p>No players found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 overflow-hidden sticky top-4">
                                <div className="gradient-gold px-6 py-4">
                                    <h3 className="font-black text-white">Team Statistics</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Players Selected</div>
                                        <div className="text-3xl font-black text-gray-900">
                                            {selectedPlayers.filter(p => p !== null).length} / 11
                                        </div>
                                        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                            <div
                                                className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full transition-all"
                                                style={{ width: `${(selectedPlayers.filter(p => p !== null).length / 11) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-200"></div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center bg-gray-50 rounded-xl p-4">
                                            <div className="text-3xl font-black text-orange-600">{stats.totalGoals}</div>
                                            <div className="text-xs text-gray-600 mt-1">Total Goals</div>
                                        </div>
                                        <div className="text-center bg-gray-50 rounded-xl p-4">
                                            <div className="text-3xl font-black text-green-600">{stats.averageGoals}</div>
                                            <div className="text-xs text-gray-600 mt-1">Avg Goals/Player</div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                        <div className="text-sm font-bold text-amber-900 mb-2">💡 Pro Tip</div>
                                        <div className="text-xs text-amber-700">
                                            Click on empty positions to add players. Mix players from different teams for variety!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
