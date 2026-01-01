import React from 'react';
import { Match, LineupPlayer } from '../../types';

interface LineupsProps {
    match: Match;
}

const Lineups: React.FC<LineupsProps> = ({ match }) => {
    const { lineups, homeTeamName, awayTeamName } = match;

    const renderTeamLineup = (teamName: string, players: LineupPlayer[]) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">{teamName}</h3>
                <span className="text-xs font-medium px-2 py-1 bg-gray-200 rounded text-gray-600">4-4-2</span>
            </div>
            <div className="divide-y divide-gray-100">
                {players.map((player) => (
                    <div key={player.number} className="px-6 py-3 flex items-center space-x-4 hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-bold text-gray-600 border border-gray-200">
                            {player.number}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">{player.name}</p>
                        </div>
                        <div className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded w-12 text-center">
                            {player.position}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderTeamLineup(homeTeamName, lineups.home)}
            {renderTeamLineup(awayTeamName, lineups.away)}
        </div>
    );
};

export default Lineups;
