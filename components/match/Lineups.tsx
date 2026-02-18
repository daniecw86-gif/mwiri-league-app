import React from 'react';
import { Match, LineupPlayer } from '../../types';

interface LineupsProps {
    match: Match;
}

const Lineups: React.FC<LineupsProps> = ({ match }) => {
    const { lineups, homeTeamName, awayTeamName } = match;

    const getPositionColor = (pos: string) => {
        switch (pos) {
            case 'GK': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'DF': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'MF': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'FW': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-white/10 text-white/60 border-white/20';
        }
    };

    const renderTeamLineup = (teamName: string, players: LineupPlayer[], isHome: boolean) => (
        <div className="crystal-glass rounded-2xl overflow-hidden">
            <div className={`px-6 py-4 border-b border-white/10 flex justify-between items-center ${isHome ? 'gradient-blue' : 'gradient-gold'}`}>
                <h3 className={`font-barlow font-bold ${isHome ? 'text-white' : 'text-mwiri-blue-deep'}`}>{teamName}</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${isHome ? 'bg-white/20 text-white' : 'bg-mwiri-blue-deep/20 text-mwiri-blue-deep'}`}>
                    {players.length} Players
                </span>
            </div>
            <div className="divide-y divide-white/5">
                {players.map((player, index) => (
                    <div key={player.number} className="px-5 py-3 flex items-center space-x-4 hover:bg-white/5 transition-colors group">
                        <div className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl text-sm font-black text-white border border-white/10 group-hover:border-mwiri-gold/30 transition-colors">
                            {player.number}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white text-sm truncate">{player.name}</p>
                        </div>
                        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${getPositionColor(player.position)}`}>
                            {player.position}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderTeamLineup(homeTeamName, lineups.home, true)}
            {renderTeamLineup(awayTeamName, lineups.away, false)}
        </div>
    );
};

export default Lineups;
