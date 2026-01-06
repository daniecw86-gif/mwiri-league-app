import { teams } from "../data/teams";
import { results } from "../data/results";
import { fixtures } from "../data/fixtures";
import { players } from "../data/players";
import { newsItems } from "../data/news";
import LeagueTable from "../components/LeagueTable";
import TopScorers from "../components/TopScorers";
import Sponsors from "../components/Sponsors";
import Image from 'next/image';
import Link from 'next/link';

import { Team, Player } from '../types';

// Helper to get next upcoming fixture
function getNextFixture() {
  for (const group of fixtures) {
    for (const match of group.matches) {
      // In a real app, compare with current date
      return match;
    }
  }
  return null;
}

// Helper to get latest results
function getLatestResults() {
  if (results.length > 0 && results[0].matches) {
    return results[0].matches.slice(0, 4);
  }
  return [];
}

export default function Home() {
  // Create a quick lookup map for team details (logos)
  const teamMap = new Map<string, Team>();
  teams.forEach((t: Team) => teamMap.set(t.name, t));

  // Calculate quick stats
  const totalGoals = results.reduce((acc, group) =>
    acc + group.matches.reduce((sum, match) => sum + (match.homeScore || 0) + (match.awayScore || 0), 0), 0
  );
  const totalMatches = results.reduce((acc, group) => acc + group.matches.length, 0);

  // Get top scorer
  const topScorer = [...players].sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0))[0];

  // Get next fixture and latest results
  const nextFixture = getNextFixture();
  const latestResults = getLatestResults();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="text-center mb-8">
          <h1 className="font-barlow text-4xl md:text-5xl font-black text-white mb-2 text-shadow-lg">
            MWIRI<span className="text-mwiri-gold">LEAGUE</span>
          </h1>
          <p className="text-white/60 text-sm font-medium">
            Busoga College Mwiri Old Boys Football Tournament
          </p>
        </div>
      </div>

      {/* Bento Grid Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">

          {/* Next Match Card - Large Featured */}
          <div className="lg:col-span-7 crystal-glass rounded-3xl p-6 md:p-8 crystal-float">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-mwiri-gold/20 text-mwiri-gold text-xs font-bold uppercase tracking-wider">
                🔥 Next Match
              </span>
            </div>

            {nextFixture ? (
              <div className="flex items-center justify-between gap-4">
                {/* Home Team */}
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 relative bg-white/10 rounded-2xl p-2">
                    {teamMap.get(nextFixture.homeTeam)?.logo ? (
                      <Image
                        src={teamMap.get(nextFixture.homeTeam)!.logo!}
                        alt={nextFixture.homeTeam}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-black text-white/50">
                        {nextFixture.homeTeam.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="font-barlow font-bold text-white text-lg md:text-xl truncate">
                    {nextFixture.homeTeam}
                  </p>
                </div>

                {/* VS Badge */}
                <div className="flex flex-col items-center gap-2">
                  <div className="vs-badge">VS</div>
                  <span className="text-white/40 text-xs font-medium">
                    {nextFixture.time || '16:00'}
                  </span>
                </div>

                {/* Away Team */}
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 relative bg-white/10 rounded-2xl p-2">
                    {teamMap.get(nextFixture.awayTeam)?.logo ? (
                      <Image
                        src={teamMap.get(nextFixture.awayTeam)!.logo!}
                        alt={nextFixture.awayTeam}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-black text-white/50">
                        {nextFixture.awayTeam.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="font-barlow font-bold text-white text-lg md:text-xl truncate">
                    {nextFixture.awayTeam}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-white/50 text-center">No upcoming fixtures</p>
            )}

            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center">
              <Link
                href="/fixtures"
                className="crystal-btn text-sm"
              >
                View All Fixtures
              </Link>
            </div>
          </div>

          {/* Golden Boot Card */}
          <div className="lg:col-span-5 crystal-glass-gold rounded-3xl p-6 crystal-float spotlight relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🏆</span>
                <h2 className="font-barlow font-black text-mwiri-gold text-xl">Golden Boot</h2>
              </div>

              {topScorer && (
                <div className="flex items-center gap-4">
                  {/* Player Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mwiri-gold to-mwiri-gold-dark flex items-center justify-center text-2xl font-black text-mwiri-green-deep shadow-lg">
                    {topScorer.name.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <p className="font-barlow font-bold text-white text-xl">{topScorer.name}</p>
                    <p className="text-white/60 text-sm">{topScorer.teamName}</p>
                  </div>

                  {/* Goals Count */}
                  <div className="text-center">
                    <div className="text-4xl font-black text-mwiri-gold text-shadow-gold">
                      {topScorer.goals ?? 0}
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">Goals</div>
                  </div>
                </div>
              )}

              <Link
                href="/stats"
                className="mt-4 inline-flex items-center gap-1 text-mwiri-gold/80 hover:text-mwiri-gold text-sm font-bold transition-colors"
              >
                View All Scorers →
              </Link>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="crystal-glass rounded-2xl p-5 text-center crystal-hover">
              <div className="text-3xl font-black text-white mb-1">{teams.length}</div>
              <div className="text-white/50 text-xs font-medium uppercase tracking-wider">Teams</div>
            </div>
            <div className="crystal-glass rounded-2xl p-5 text-center crystal-hover">
              <div className="text-3xl font-black text-mwiri-gold mb-1">{totalMatches}</div>
              <div className="text-white/50 text-xs font-medium uppercase tracking-wider">Matches</div>
            </div>
            <div className="crystal-glass rounded-2xl p-5 text-center crystal-hover">
              <div className="text-3xl font-black text-white mb-1">{totalGoals}</div>
              <div className="text-white/50 text-xs font-medium uppercase tracking-wider">Goals</div>
            </div>
            <div className="crystal-glass rounded-2xl p-5 text-center crystal-hover">
              <div className="text-3xl font-black text-mwiri-gold mb-1">
                {totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : '0.0'}
              </div>
              <div className="text-white/50 text-xs font-medium uppercase tracking-wider">Avg/Match</div>
            </div>
          </div>

          {/* League Table Card */}
          <div className="lg:col-span-7 crystal-glass rounded-3xl p-6 crystal-float">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-barlow font-black text-white text-xl flex items-center gap-2">
                <span>🏆</span> Standings
              </h2>
              <Link
                href="/table"
                className="text-mwiri-gold/80 hover:text-mwiri-gold text-sm font-bold transition-colors"
              >
                Full Table →
              </Link>
            </div>
            <LeagueTable teams={teams.slice(0, 6)} />
          </div>

          {/* Recent Results */}
          <div className="lg:col-span-5 crystal-glass rounded-3xl p-6 crystal-float">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-barlow font-black text-white text-xl flex items-center gap-2">
                <span>⚽</span> Recent Results
              </h2>
              <Link
                href="/results"
                className="text-mwiri-gold/80 hover:text-mwiri-gold text-sm font-bold transition-colors"
              >
                All Results →
              </Link>
            </div>

            <div className="space-y-3">
              {latestResults.map((match: any, idx: number) => {
                const homeTeam = teamMap.get(match.homeTeam);
                const awayTeam = teamMap.get(match.awayTeam);

                return (
                  <Link
                    key={idx}
                    href={`/matches/${match.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {/* Home Team */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-8 h-8 relative flex-shrink-0 bg-white/10 rounded-lg p-1">
                        {homeTeam?.logo ? (
                          <Image src={homeTeam.logo} alt={match.homeTeam} fill className="object-contain" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white/50">
                            {match.homeTeam.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="text-white text-sm font-medium truncate">{match.homeTeam}</span>
                    </div>

                    {/* Score */}
                    <div className="flex-shrink-0 px-3 py-1 rounded-lg bg-mwiri-blue/50 text-white font-bold text-sm">
                      {match.homeScore} - {match.awayScore}
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className="text-white text-sm font-medium truncate text-right">{match.awayTeam}</span>
                      <div className="w-8 h-8 relative flex-shrink-0 bg-white/10 rounded-lg p-1">
                        {awayTeam?.logo ? (
                          <Image src={awayTeam.logo} alt={match.awayTeam} fill className="object-contain" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white/50">
                            {match.awayTeam.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* News Card */}
          <div className="lg:col-span-12 crystal-glass rounded-3xl p-6 crystal-float">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-barlow font-black text-white text-xl flex items-center gap-2">
                <span>📰</span> Latest News
              </h2>
              <Link
                href="/news"
                className="text-mwiri-gold/80 hover:text-mwiri-gold text-sm font-bold transition-colors"
              >
                All News →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {newsItems.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all crystal-hover"
                >
                  <span className="inline-block px-2 py-0.5 rounded-full bg-mwiri-gold/20 text-mwiri-gold text-xs font-bold mb-3">
                    {item.category}
                  </span>
                  <h3 className="font-barlow font-bold text-white group-hover:text-mwiri-gold transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-xs mt-2">{item.date}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Partners & Sponsors */}
      <Sponsors />
    </main>
  );
}
