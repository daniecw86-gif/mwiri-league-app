import React from 'react';
import Link from 'next/link';
import { Player } from '../types';

interface SquadTableProps {
    players: Player[];
}

const SquadTable: React.FC<SquadTableProps> = ({ players }) => {
    // Group players by position for better organization
    const goalkeepers = players.filter(p => p.position === 'Goalkeeper');
    const defenders = players.filter(p => p.position === 'Defender');
    const midfielders = players.filter(p => p.position === 'Midfielder');
    const forwards = players.filter(p => p.position === 'Forward');

    const renderSection = (title: string, sectionPlayers: Player[]) => (
        <div className="mb-8 last:mb-0">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pl-2 border-l-4 border-mwiri-blue">{title}</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3 font-medium w-16">No.</th>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium text-center">Apps</th>
                            <th className="px-6 py-3 font-medium text-center">Goals</th>
                            <th className="px-6 py-3 font-medium text-center">Assists</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {sectionPlayers.map((player) => (
                            <tr key={player.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 font-bold text-gray-400 group-hover:text-mwiri-blue transition-colors">
                                    {player.number}
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900">
                                    <Link href={`/players/${player.id}`} className="hover:underline decoration-mwiri-yellow decoration-2 underline-offset-4">
                                        {player.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600">{player.appearances ?? 0}</td>
                                <td className="px-6 py-4 text-center text-gray-600">{player.goals ?? 0}</td>
                                <td className="px-6 py-4 text-center text-gray-600">{player.assists ?? 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div>
            {goalkeepers.length > 0 && renderSection('Goalkeepers', goalkeepers)}
            {defenders.length > 0 && renderSection('Defenders', defenders)}
            {midfielders.length > 0 && renderSection('Midfielders', midfielders)}
            {forwards.length > 0 && renderSection('Forwards', forwards)}
        </div>
    );
};

export default SquadTable;
