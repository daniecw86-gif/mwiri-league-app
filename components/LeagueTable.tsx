"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Team, LeagueTeamStats } from '../types';

interface LeagueTableProps {
  teams: Team[];
}

const FormBadge = ({ result }: { result: string }) => {
  let bgColor = 'bg-gray-400';
  if (result === 'W') bgColor = 'bg-mwiri-yellow text-mwiri-blue';
  if (result === 'L') bgColor = 'bg-red-500';

  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${bgColor} mx-0.5`}>
      {result}
    </span>
  );
};

type FilterType = 'Overall' | 'Home' | 'Away';

const LeagueTable: React.FC<LeagueTableProps> = ({ teams }) => {
  const [filter, setFilter] = useState<FilterType>('Overall');

  const getTeamStats = (team: Team): LeagueTeamStats => {
    if (filter === 'Home' && team.home) return team.home;
    if (filter === 'Away' && team.away) return team.away;
    return team; // Overall (Team implements LeagueTeamStats directly)
  };

  const sortedTeams = [...teams].sort((a, b) => {
    const statsA = getTeamStats(a);
    const statsB = getTeamStats(b);

    if (statsB.points !== statsA.points) return statsB.points - statsA.points;
    const gdA = statsA.gf - statsA.ga;
    const gdB = statsB.gf - statsB.ga;
    if (gdB !== gdA) return gdB - gdA;
    return statsB.gf - statsA.gf;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Tabs */}
      <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg self-start">
        {(['Overall', 'Home', 'Away'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-label={`Filter by ${f} stats`}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${filter === f
              ? 'bg-white dark:bg-slate-800 text-mwiri-blue shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Premium League Table */}
      <div className="overflow-hidden shadow-premium-lg rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
        <table className="w-full text-sm text-left">
          {/* Sticky Header with Gradient */}
          <thead className="text-xs text-white uppercase gradient-blue sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-4 py-4 w-16 text-center font-bold">Pos</th>
              <th scope="col" className="px-4 py-4 font-bold">Club</th>
              <th scope="col" className="px-4 py-4 text-center font-bold">Pl</th>
              <th scope="col" className="px-4 py-4 text-center font-bold">W</th>
              <th scope="col" className="px-4 py-4 text-center font-bold">D</th>
              <th scope="col" className="px-4 py-4 text-center font-bold">L</th>
              <th scope="col" className="px-4 py-4 text-center font-bold">GD</th>
              <th scope="col" className="px-4 py-4 text-center font-bold">Pts</th>
              <th scope="col" className="px-4 py-4 text-center font-bold hidden md:table-cell">Form</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {sortedTeams.map((team, index) => {
              const stats = getTeamStats(team);
              const position = index + 1;

              // Position badge styling
              let positionBadgeClass = 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300';
              let positionIcon = null;

              if (position === 1) {
                positionBadgeClass = 'badge-champion text-shadow';
                positionIcon = '👑';
              } else if (position <= 4) {
                positionBadgeClass = 'badge-top4';
                positionIcon = '⭐';
              } else if (position >= sortedTeams.length - 2) {
                positionBadgeClass = 'badge-relegation';
                positionIcon = '⚠️';
              }

              // Striped rows
              const rowBg = index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/50 dark:bg-slate-800/50';

              return (
                <tr
                  key={team.id}
                  className={`row-hover cursor-pointer ${rowBg}`}
                  onClick={() => window.location.href = `/clubs/${team.id}`}
                >
                  {/* Position with Badge */}
                  <td className="px-4 py-4 text-center">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm ${positionBadgeClass} shadow-sm`}>
                      {positionIcon ? (
                        <span className="flex flex-col items-center">
                          <span className="text-xs leading-none">{positionIcon}</span>
                          <span className="text-xs leading-none">{position}</span>
                        </span>
                      ) : (
                        position
                      )}
                    </div>
                  </td>

                  {/* Club Name with Logo */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative flex-shrink-0 bg-gray-50 dark:bg-slate-700 rounded-lg p-1.5">
                        {team.logo ? (
                          <Image
                            src={team.logo}
                            alt={`${team.name} logo`}
                            fill
                            className="object-contain p-0.5"
                          />
                        ) : (
                          <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-300">
                            {team.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white truncate">{team.name}</span>
                    </div>
                  </td>

                  {/* Stats Columns */}
                  <td className="px-4 py-4 text-center text-gray-600 dark:text-gray-400 font-medium">{stats.played}</td>
                  <td className="px-4 py-4 text-center text-green-600 font-semibold">{stats.won}</td>
                  <td className="px-4 py-4 text-center text-gray-500 dark:text-gray-400 font-medium">{stats.drawn}</td>
                  <td className="px-4 py-4 text-center text-red-500 font-semibold">{stats.lost}</td>
                  <td className={`px-4 py-4 text-center font-bold ${stats.gf - stats.ga > 0 ? 'text-green-600' : stats.gf - stats.ga < 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                    {stats.gf - stats.ga > 0 ? `+${stats.gf - stats.ga}` : stats.gf - stats.ga}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center justify-center min-w-[2.5rem] h-9 px-3 rounded-lg bg-mwiri-blue text-white font-bold text-base shadow-sm">
                      {stats.points}
                    </span>
                  </td>

                  {/* Form Badges */}
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex justify-center gap-1">
                      {stats.form.slice(-5).map((result, i) => (
                        <FormBadge key={i} result={result} />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeagueTable;
