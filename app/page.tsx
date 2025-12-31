import { teams } from "../data/teams";
import { results } from "../data/results";
import { fixtures } from "../data/fixtures";
import LeagueTable from "../components/LeagueTable";
import Hero from '../components/Hero';
import NewsCard from '../components/NewsCard';
import TopScorers from '../components/TopScorers';
import YellowCards from '../components/YellowCards';
import Sponsors from '../components/Sponsors';
import Image from 'next/image';

import { newsItems } from "../data/news";

import LeftSidebar from '../components/LeftSidebar';
import MatchStrip from '../components/MatchStrip';

import { Team } from '../types';

export default function Home() {
  // Create a quick lookup map for team details (logos)
  const teamMap = new Map<string, Team>();
  teams.forEach((t: Team) => teamMap.set(t.name, t));

  // Calculate quick stats
  const totalGoals = results.reduce((acc, group) =>
    acc + group.matches.reduce((sum, match) => sum + (match.homeScore || 0) + (match.awayScore || 0), 0), 0
  );
  const totalMatches = results.reduce((acc, group) => acc + group.matches.length, 0);

  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      {/* Match Week Strip */}
      <MatchStrip />

      {/* Hero Section - Full Width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 w-full">
        <Hero />
      </div>

      {/* Quick Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-premium">
            <div className="text-3xl font-black mb-1">{teams.length}</div>
            <div className="text-blue-100 text-sm font-medium">Teams</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-premium">
            <div className="text-3xl font-black mb-1">{totalMatches}</div>
            <div className="text-green-100 text-sm font-medium">Matches Played</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-premium">
            <div className="text-3xl font-black mb-1">{totalGoals}</div>
            <div className="text-orange-100 text-sm font-medium">Goals Scored</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-premium">
            <div className="text-3xl font-black mb-1">{(totalGoals / totalMatches).toFixed(1)}</div>
            <div className="text-purple-100 text-sm font-medium">Goals per Match</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column - League Table (Takes 4 columns on large screens) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-premium-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  League Standings
                </h2>
                <a href="/table" className="text-sm font-bold text-mwiri-blue hover:text-mwiri-blue-dark transition-colors">
                  Full Table →
                </a>
              </div>
              <LeagueTable teams={teams} />
            </div>
          </div>

          {/* Center Column - News & Featured Content (Takes 5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Latest News Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">📰</span>
                  Latest News
                </h2>
                <a href="/news" className="text-sm font-bold text-mwiri-blue hover:text-mwiri-blue-dark transition-colors hidden md:flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              </div>

              <div className="space-y-6">
                {newsItems.slice(0, 3).map((item) => (
                  <NewsCard
                    key={item.id}
                    title={item.title}
                    category={item.category}
                    date={item.date}
                    link={item.link}
                    imageUrl={item.imageUrl || undefined}
                  />
                ))}
              </div>
            </section>

            {/* Featured Video Section */}
            <div className="bg-gradient-to-br from-mwiri-blue-deep via-mwiri-blue to-mwiri-blue-dark rounded-3xl p-10 text-white text-center relative overflow-hidden shadow-premium-xl">
              <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-cover mix-blend-overlay"></div>
              <div className="relative z-10">
                <span className="inline-block py-2 px-4 rounded-full bg-mwiri-yellow text-mwiri-blue-dark font-black text-xs mb-4 uppercase tracking-wider shadow-sm">
                  🎥 Must Watch
                </span>
                <h3 className="text-3xl font-black mb-4">Matchweek Highlights</h3>
                <p className="mb-6 text-blue-100 max-w-md mx-auto">
                  Catch up on all the goals, saves, and drama from the latest fixtures
                </p>
                <button className="bg-white text-mwiri-blue-deep font-black py-3 px-8 rounded-full hover:bg-mwiri-yellow hover:scale-105 transition-all duration-300 shadow-lg">
                  Watch Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats (Takes 3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Top Scorers */}
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span>⚽</span> Top Scorers
                </h2>
                <TopScorers />
              </div>

              {/* Yellow Cards */}
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span>⚠️</span> Discipline
                </h2>
                <YellowCards />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors */}
      <Sponsors />
    </main>
  );
}
