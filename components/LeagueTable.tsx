"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Team, LeagueTeamStats } from '../types';

interface LeagueTableProps {
  teams: Team[];
}

const FormDot = ({ result }: { result: string }) => {
  let dotClass = 'form-dot form-dot-draw';
  if (result === 'W') dotClass = 'form-dot form-dot-win';
  if (result === 'L') dotClass = 'form-dot form-dot-loss';

  return <span className={dotClass} title={result === 'W' ? 'Win' : result === 'L' ? 'Loss' : 'Draw'} />;
};

type FilterType = 'Overall' | 'Home' | 'Away';

const LeagueTable: React.FC<LeagueTableProps> = ({ teams }) => {
  const [filter, setFilter] = useState<FilterType>('Overall');

  const getTeamStats = (team: Team): LeagueTeamStats => {
    if (filter === 'Home' && team.home) return team.home;
    if (filter === 'Away' && team.away) return team.away;
    return team;
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
      <div className="flex bg-white/5 p-1 rounded-xl self-start">
        {(['Overall', 'Home', 'Away'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-label={`Filter by ${f} stats`}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === f
              ? 'bg-mwiri-gold/20 text-mwiri-gold shadow-sm'
              : 'text-white/50 hover:text-white/80'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Crystal Glass League Table */}
      <div className="overflow-x-auto scrollbar-crystal rounded-2xl">
        <table className="w-full text-sm text-left min-w-[600px]">
          {/* Header */}
          <thead className="text-xs text-white uppercase gradient-mwiri sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-3 py-3 w-14 text-center font-bold">#</th>
              <th scope="col" className="px-3 py-3 font-bold sticky left-0 bg-mwiri-blue z-20">Club</th>
              <th scope="col" className="px-3 py-3 text-center font-bold">Pl</th>
              <th scope="col" className="px-3 py-3 text-center font-bold">W</th>
              <th scope="col" className="px-3 py-3 text-center font-bold">D</th>
              <th scope="col" className="px-3 py-3 text-center font-bold">L</th>
              <th scope="col" className="px-3 py-3 text-center font-bold">GD</th>
              <th scope="col" className="px-3 py-3 text-center font-bold">Pts</th>
              <th scope="col" className="px-3 py-3 text-center font-bold hidden md:table-cell">Form</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {sortedTeams.map((team, index) => {
              const stats = getTeamStats(team);
              const position = index + 1;

              // Position badge styling
              let positionBadgeClass = 'bg-white/10 text-white/60';
              let positionIcon = '';

              if (position === 1) {
                positionBadgeClass = 'badge-champion';
                positionIcon = '👑';
              } else if (position <= 4) {
                positionBadgeClass = 'badge-top4';
                positionIcon = '⭐';
              } else if (position >= sortedTeams.length - 2 && sortedTeams.length > 5) {
                positionBadgeClass = 'badge-relegation';
                positionIcon = '⚠️';
              }

              return (
                <tr
                  key={team.id}
                  className="row-hover cursor-pointer bg-transparent hover:bg-white/5"
                  onClick={() => window.location.href = `/clubs/${team.id}`}
                >
                  {/* Position with Badge */}
                  <td className="px-3 py-3 text-center">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-xs ${positionBadgeClass}`}>
                      {positionIcon ? (
                        <span className="flex flex-col items-center leading-none">
                          <span className="text-[10px]">{positionIcon}</span>
                          <span className="text-[10px]">{position}</span>
                        </span>
                      ) : (
                        position
                      )}
                    </div>
                  </td>

                  {/* Club Name with Logo - Sticky */}
                  <td className="px-3 py-3 sticky left-0 bg-mwiri-blue-deep/80 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 relative flex-shrink-0 bg-white/10 rounded-lg p-1">
                        {team.logo ? (
                          <Image
                            src={team.logo}
                            alt={`${team.name} logo`}
                            fill
                            className="object-contain p-0.5"
                          />
                        ) : (
                          <div className="w-full h-full rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold text-white/60">
                            {team.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="capsule capsule-green text-white font-bold text-xs truncate max-w-[120px]">
                        {team.name}
                      </span>
                    </div>
                  </td>

                  {/* Stats Columns */}
                  <td className="px-3 py-3 text-center text-white/60 font-medium">{stats.played}</td>
                  <td className="px-3 py-3 text-center text-green-400 font-semibold">{stats.won}</td>
                  <td className="px-3 py-3 text-center text-white/50 font-medium">{stats.drawn}</td>
                  <td className="px-3 py-3 text-center text-red-400 font-semibold">{stats.lost}</td>
                  <td className={`px-3 py-3 text-center font-bold ${stats.gf - stats.ga > 0 ? 'text-green-400' : stats.gf - stats.ga < 0 ? 'text-red-400' : 'text-white/50'}`}>
                    {stats.gf - stats.ga > 0 ? `+${stats.gf - stats.ga}` : stats.gf - stats.ga}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[2rem] h-7 px-2 rounded-lg bg-mwiri-gold text-mwiri-blue-deep font-bold text-sm">
                      {stats.points}
                    </span>
                  </td>

                  {/* Form Dots */}
                  <td className="px-3 py-3 hidden md:table-cell">
                    <div className="flex justify-center gap-0.5">
                      {stats.form.slice(-5).map((result, i) => (
                        <FormDot key={i} result={result} />
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
