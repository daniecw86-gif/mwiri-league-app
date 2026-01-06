"use client";

import React, { useState, useEffect } from 'react';
import { Trophy, Users, Star, Coins, Check, X, Info, RotateCcw, ChevronDown, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { teams } from '../../../data/teams';
import {
    loadPickemState,
    saveTeam,
    getAvailablePlayers,
    canAddPlayer,
    resetPickemState,
    calculateTeamPoints
} from '../../../utils/pickemUtils';
import { FantasyPick, FantasyGameState, FANTASY_CONFIG } from '../../../types/fantasy';
import { Team, Player } from '../../../types';

type PlayerWithCost = Player & { cost: number; fantasyPoints: number };

export default function PickemPage() {
    const [gameState, setGameState] = useState<FantasyGameState | null>(null);
    const [currentPicks, setCurrentPicks] = useState<FantasyPick[]>([]);
    const [matchweek, setMatchweek] = useState(1);
    const [selectedTeamFilter, setSelectedTeamFilter] = useState<number | 'all'>('all');
    const [showRules, setShowRules] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    const availablePlayers = getAvailablePlayers();

    useEffect(() => {
        const state = loadPickemState();
        setGameState(state);

        const existingTeam = state.teams.find(t => t.matchweek === matchweek);
        if (existingTeam) {
            setCurrentPicks(existingTeam.picks);
        } else {
            setCurrentPicks([]);
        }
    }, [matchweek]);

    const totalCost = currentPicks.reduce((sum, p) => sum + p.cost, 0);
    const remainingBudget = FANTASY_CONFIG.budget - totalCost;
    const currentPoints = calculateTeamPoints(currentPicks);

    const filteredPlayers = selectedTeamFilter === 'all'
        ? availablePlayers
        : availablePlayers.filter(p => p.teamId === selectedTeamFilter);

    const handleAddPlayer = (player: PlayerWithCost) => {
        const { canAdd, reason } = canAddPlayer(currentPicks, player, player.cost);

        if (!canAdd) {
            setSaveMessage(reason || 'Cannot add player');
            setTimeout(() => setSaveMessage(null), 2000);
            return;
        }

        const pick: FantasyPick = {
            playerId: player.id,
            playerName: player.name,
            teamName: player.teamName || 'Unknown',
            teamId: player.teamId,
            position: player.position || 'MID',
            cost: player.cost,
        };

        setCurrentPicks([...currentPicks, pick]);
    };

    const handleRemovePlayer = (playerId: number) => {
        setCurrentPicks(currentPicks.filter(p => p.playerId !== playerId));
    };

    const handleSaveTeam = () => {
        if (currentPicks.length < FANTASY_CONFIG.maxPicks) {
            setSaveMessage(`Select ${FANTASY_CONFIG.maxPicks} players to save`);
            setTimeout(() => setSaveMessage(null), 2000);
            return;
        }

        const newState = saveTeam(matchweek, currentPicks);
        setGameState(newState);
        setSaveMessage('Team saved successfully!');
        setTimeout(() => setSaveMessage(null), 2000);
    };

    const handleReset = () => {
        const newState = resetPickemState();
        setGameState(newState);
        setCurrentPicks([]);
        setSaveMessage('Game reset!');
        setTimeout(() => setSaveMessage(null), 2000);
    };

    const getTeamLogo = (teamId: number) => {
        const team = teams.find((t: Team) => t.id === teamId);
        return team?.logo;
    };

    return (
        <div className="min-h-screen pb-12">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-900 via-indigo-700 to-purple-800 py-12">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-cover mix-blend-overlay"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/fantasy" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Fantasy Hub
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                                ⚽ Fantasy Pick&apos;em
                            </h1>
                            <p className="text-blue-200 text-lg">
                                Pick 5 players • Earn points • Compete!
                            </p>
                        </div>
                        <button
                            onClick={() => setShowRules(!showRules)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
                        >
                            <Info className="w-5 h-5" />
                            Rules
                        </button>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                            <p className="text-blue-200 text-xs uppercase tracking-wider">Total Points</p>
                            <p className="text-3xl font-black text-white">{gameState?.totalPoints || 0}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                            <p className="text-blue-200 text-xs uppercase tracking-wider">Best Week</p>
                            <p className="text-3xl font-black text-white">{gameState?.bestWeekPoints || 0}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                            <p className="text-blue-200 text-xs uppercase tracking-wider">Weeks Played</p>
                            <p className="text-3xl font-black text-white">{gameState?.teams.length || 0}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                            <p className="text-blue-200 text-xs uppercase tracking-wider">Current Week Pts</p>
                            <p className="text-3xl font-black text-mwiri-yellow">{currentPoints}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rules Modal */}
            {showRules && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowRules(false)}>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">📋 How to Play</h2>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                            <p><strong>1.</strong> Pick 5 players within your {FANTASY_CONFIG.budget} coin budget</p>
                            <p><strong>2.</strong> Save your team before matches start</p>
                            <p><strong>3.</strong> Earn points based on player performance:</p>
                            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mt-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span>⚽ Goal</span><span className="text-green-600 font-bold">+5 pts</span>
                                    <span>🅰️ Assist</span><span className="text-green-600 font-bold">+3 pts</span>
                                    <span>🧤 Clean Sheet</span><span className="text-green-600 font-bold">+4 pts</span>
                                    <span>🟨 Yellow Card</span><span className="text-red-500 font-bold">-1 pt</span>
                                    <span>🟥 Red Card</span><span className="text-red-500 font-bold">-3 pts</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowRules(false)}
                            className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left - Player Picker */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                    <Users className="w-6 h-6 text-indigo-600" />
                                    Select Players
                                </h2>

                                <div className="relative">
                                    <select
                                        value={matchweek}
                                        onChange={(e) => setMatchweek(Number(e.target.value))}
                                        className="appearance-none bg-indigo-50 dark:bg-slate-700 border border-indigo-200 dark:border-slate-600 rounded-lg px-4 py-2 pr-8 font-bold text-indigo-700 dark:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {[1, 2, 3, 4, 5].map(week => (
                                            <option key={week} value={week}>Week {week}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Team Filter */}
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                <button
                                    onClick={() => setSelectedTeamFilter('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedTeamFilter === 'all'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    All Teams
                                </button>
                                {teams.filter((t: Team) => t.group !== 'Inactive').slice(0, 8).map((team: Team) => (
                                    <button
                                        key={team.id}
                                        onClick={() => setSelectedTeamFilter(team.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedTeamFilter === team.id
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        {team.name}
                                    </button>
                                ))}
                            </div>

                            {/* Player Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
                                {filteredPlayers.map(player => {
                                    const isSelected = currentPicks.some(p => p.playerId === player.id);
                                    const { canAdd } = canAddPlayer(currentPicks, player, player.cost);
                                    const logo = getTeamLogo(player.teamId);

                                    return (
                                        <div
                                            key={player.id}
                                            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${isSelected
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                                                : canAdd
                                                    ? 'border-gray-100 dark:border-slate-700 hover:border-indigo-300'
                                                    : 'border-gray-100 dark:border-slate-700 opacity-50 cursor-not-allowed'
                                                }`}
                                            onClick={() => !isSelected && canAdd && handleAddPlayer(player)}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                                {logo ? (
                                                    <Image src={logo} alt={player.teamName || 'Team'} width={28} height={28} className="object-contain" />
                                                ) : (
                                                    <span className="text-sm font-bold text-gray-400">{(player.teamName || 'T').charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 dark:text-white truncate">{player.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{player.teamName}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-bold text-indigo-600 dark:text-indigo-400">{player.fantasyPoints} pts</p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                                                    <Coins className="w-3 h-3" /> {player.cost}
                                                </p>
                                            </div>
                                            {isSelected && <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right - Your Team */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                    <Star className="w-6 h-6 text-yellow-500" />
                                    Your Team
                                </h2>
                                <span className={`text-sm font-bold ${currentPicks.length === FANTASY_CONFIG.maxPicks ? 'text-green-600' : 'text-gray-400'}`}>
                                    {currentPicks.length}/{FANTASY_CONFIG.maxPicks}
                                </span>
                            </div>

                            {/* Budget */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 dark:text-gray-400">Budget</span>
                                    <span className={`font-bold ${remainingBudget < 20 ? 'text-red-500' : 'text-green-600'}`}>
                                        {remainingBudget} / {FANTASY_CONFIG.budget}
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all ${remainingBudget < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                                        style={{ width: `${(remainingBudget / FANTASY_CONFIG.budget) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Selected Players */}
                            <div className="space-y-3 mb-6 min-h-[200px]">
                                {currentPicks.length === 0 ? (
                                    <p className="text-gray-400 text-center py-8">Select players from the left</p>
                                ) : (
                                    currentPicks.map(pick => {
                                        const logo = getTeamLogo(pick.teamId);
                                        return (
                                            <div key={pick.playerId} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center">
                                                    {logo ? (
                                                        <Image src={logo} alt={pick.teamName} width={20} height={20} className="object-contain" />
                                                    ) : (
                                                        <span className="text-xs font-bold text-gray-400">{pick.teamName.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{pick.playerName}</p>
                                                    <p className="text-xs text-gray-500">{pick.cost} coins</p>
                                                </div>
                                                <button onClick={() => handleRemovePlayer(pick.playerId)} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full">
                                                    <X className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Points */}
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-indigo-700 dark:text-indigo-300 font-medium">Points</span>
                                    <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300">{currentPoints}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleSaveTeam}
                                    disabled={currentPicks.length < FANTASY_CONFIG.maxPicks}
                                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${currentPicks.length === FANTASY_CONFIG.maxPicks
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                        : 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <Trophy className="w-5 h-5" />
                                    Save Team
                                </button>

                                <button
                                    onClick={handleReset}
                                    className="w-full py-3 rounded-xl font-bold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Reset
                                </button>
                            </div>

                            {saveMessage && (
                                <div className={`mt-4 p-3 rounded-lg text-center font-medium ${saveMessage.includes('success') || saveMessage.includes('reset')
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    {saveMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* History */}
                {gameState && gameState.teams.length > 0 && (
                    <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            Your History
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {gameState.teams.sort((a, b) => b.totalPoints - a.totalPoints).map(team => (
                                <div key={team.matchweek} className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                                    <span className="text-sm font-bold text-gray-500">Week {team.matchweek}</span>
                                    {team.matchweek === gameState.bestWeek && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 inline ml-1" />}
                                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{team.totalPoints}</p>
                                    <p className="text-xs text-gray-400">{team.picks.length} players</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
