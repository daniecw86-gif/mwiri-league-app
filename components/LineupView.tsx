import React from 'react';

interface Player {
    number: number;
    name: string;
    position: string;
}

interface LineupViewProps {
    homeTeamName: string;
    awayTeamName: string;
    lineups: {
        home: Player[];
        away: Player[];
    };
}

const LineupView: React.FC<LineupViewProps> = ({ homeTeamName, awayTeamName, lineups }) => {
    const renderPlayerList = (players: Player[], teamName: string) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">{teamName}</h3>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Starting XI</span>
            </div>
            <div className="divide-y divide-gray-100">
                {players.map((player) => (
                    <div key={`${player.number}-${player.name}`} className="px-6 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                            {player.number}
                        </span>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">{player.name}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            {player.position}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderPlayerList(lineups.home, homeTeamName)}
            {renderPlayerList(lineups.away, awayTeamName)}
        </div>
    );
};

export default LineupView;
