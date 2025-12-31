// app/page.tsx
import React from 'react';
import LeagueTable from '../components/LeagueTable';
import { teamsData } from '../data/teams';
import { Trophy, Calendar, Users, Newspaper, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* NAVBAR */}
      <nav className="bg-mwiri-dark text-white sticky top-0 z-50 border-b-4 border-mwiri-blue shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-full">
               <Trophy className="text-mwiri-blue w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase">Mwiri League</span>
          </div>
          <div className="hidden md:flex space-x-8 font-semibold text-sm uppercase tracking-wide">
            <a href="#" className="hover:text-mwiri-yellow transition duration-300">Fixtures</a>
            <a href="#" className="hover:text-mwiri-yellow transition duration-300">Table</a>
            <a href="#" className="hover:text-mwiri-yellow transition duration-300">Teams</a>
            <a href="#" className="hover:text-mwiri-yellow transition duration-300">Stats</a>
          </div>
          <button className="bg-mwiri-blue hover:bg-blue-700 text-white px-5 py-2 rounded font-bold text-sm transition duration-300 shadow-md border border-blue-400">
            Login
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative bg-mwiri-blue text-white overflow-hidden">
        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-mwiri-dark"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="inline-block bg-mwiri-yellow text-mwiri-dark font-black tracking-widest uppercase text-xs px-2 py-1 mb-4 rounded">
              Season 6
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              GLORY FOR <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-mwiri-yellow to-orange-400">THE CLASS</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-lg mb-8 leading-relaxed">
              The official digital home of the Mwiri League. 21 Teams. One Shield. Follow the live action, stats, and history.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-mwiri-yellow text-mwiri-dark px-8 py-3 rounded font-bold hover:bg-yellow-400 transition shadow-lg flex items-center gap-2">
                <Calendar size={18} /> View Fixtures
              </button>
              <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3 rounded font-bold hover:bg-white hover:text-mwiri-blue transition flex items-center gap-2">
                <Users size={18} /> The Teams
              </button>
            </div>
          </div>
          
          {/* FEATURED MATCH CARD */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="bg-white text-mwiri-dark rounded-xl shadow-2xl p-6 w-full max-w-md border-t-8 border-mwiri-green transform hover:-translate-y-1 transition duration-500">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-xs font-bold text-gray-400 uppercase">Matchweek 6</span>
                 <span className="text-xs font-bold text-red-600 uppercase animate-pulse">Live • 72'</span>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-gray-300 border-2 border-gray-200">W'94</div>
                  <h3 className="font-bold text-lg leading-none">Winter</h3>
                </div>
                <div className="px-4">
                    <div className="text-4xl font-black text-mwiri-blue tracking-tighter">2 - 1</div>
                </div>
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-gray-300 border-2 border-gray-200">S'95</div>
                  <h3 className="font-bold text-lg leading-none">Solida</h3>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4 text-center">
                 <p className="text-xs text-gray-500 mb-3">Goals: Otim (12'), Mukasa (45') / Kato (60')</p>
                 <button className="w-full bg-gray-50 hover:bg-mwiri-blue hover:text-white py-2 rounded text-sm font-bold text-gray-600 transition flex justify-center items-center gap-2">
                   Match Centre <ArrowRight size={16} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: LATEST NEWS */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-mwiri-dark flex items-center gap-2">
                <Newspaper className="text-mwiri-blue" /> Latest News
              </h2>
              <a href="#" className="text-mwiri-blue font-bold text-sm hover:underline flex items-center gap-1">
                View All <ArrowRight size={14} />
              </a>
            </div>
            
            {/* News Card 1 */}
            <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col md:flex-row border border-gray-100 h-auto md:h-48 cursor-pointer">
              <div className="h-48 md:w-72 md:h-auto bg-mwiri-blue/10 shrink-0 flex items-center justify-center text-mwiri-blue/20">
                  <Trophy size={48} />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span className="text-mwiri-green font-bold text-xs uppercase mb-2">Match Report</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-mwiri-blue transition">Destroyers FC '10 continue unbeaten run</h3>
                <p className="text-gray-500 text-sm line-clamp-2">The class of 2010 showed no mercy this weekend as they dismantled their opponents with a stunning display of attacking football...</p>
              </div>
            </div>

             {/* News Card 2 */}
             <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col md:flex-row border border-gray-100 h-auto md:h-48 cursor-pointer">
              <div className="h-48 md:w-72 md:h-auto bg-mwiri-yellow/10 shrink-0 flex items-center justify-center text-mwiri-yellow/40">
                  <Users size={48} />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span className="text-mwiri-blue font-bold text-xs uppercase mb-2">Transfer News</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-mwiri-blue transition">Vuyos United '00 announce new captain</h3>
                <p className="text-gray-500 text-sm line-clamp-2">Ahead of the big clash, Vuyos have shaken up their leadership team in a bid to climb the table before the mid-season break.</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LEAGUE TABLE */}
          <div className="lg:col-span-1">
            <LeagueTable teams={teamsData} />
          </div>

        </div>
      </div>
    </main>
  );
}