import React from 'react';

const LeagueFormat = () => {
    return (
        <div className="overflow-hidden">
            <div className="gradient-mwiri px-6 py-5 border-b border-white/10 rounded-t-xl">
                <div className="flex items-center gap-4">
                    <img src="/images/mwiri-logo.png" alt="Mwiri League" className="h-12 w-12 object-contain" />
                    <div>
                        <h2 className="font-barlow text-xl font-bold text-white">New Mwiri League Play Format</h2>
                        <p className="text-mwiri-gold font-medium text-sm">Season Six Technical Committee</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Rules Section */}
                <div className="space-y-5 mb-10">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mwiri-gold text-mwiri-blue-deep flex items-center justify-center font-bold text-sm">1</div>
                        <p className="text-white/80 leading-relaxed">
                            Twenty participating cohorts were subjected to a draw performed by AI to make two groups. Group A is named after the late Kyabazinga and first deputy President of Uganda, <span className="font-bold text-mwiri-gold">Sir. Wilberforce Nadiope Group</span> while Group B is named after the First Prime Minister, <span className="font-bold text-mwiri-gold">Dr. Milton Obote Group</span>.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mwiri-gold text-mwiri-blue-deep flex items-center justify-center font-bold text-sm">2</div>
                        <p className="text-white/80 leading-relaxed">
                            The teams in the same group face each other once but all points from both groups are tabulated on one league table like the <span className="font-bold text-mwiri-gold">UEFA Champions League</span>.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mwiri-gold text-mwiri-blue-deep flex items-center justify-center font-bold text-sm">3</div>
                        <p className="text-white/80 leading-relaxed">
                            The top eight face off in the Quarter-finals for the <span className="font-bold text-mwiri-gold">Super Cup</span>, while the next eight face off in quarter-finals for the <span className="font-bold text-white/60">Plate Cup</span>. The last four will participate in the <span className="font-bold text-orange-400">Consolation Cup</span>.
                        </p>
                    </div>
                </div>

                {/* Groups Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nadiope Group */}
                    <div className="crystal-glass-light rounded-xl p-5">
                        <div className="bg-mwiri-gold text-mwiri-blue-deep py-2.5 px-4 rounded-lg mb-5 text-center">
                            <h3 className="font-barlow font-extrabold text-sm uppercase tracking-wide">Sir. Wilberforce Nadiope Group</h3>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80 text-sm font-medium">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Bootlickers FC '93</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Lukambwe FC '05</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Ruga-Ruga FC '88</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Salvo FC '98</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Winter FC '94</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Wampa FC '17</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Suici FC '06</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Sasi FC '07</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Buliti FC '01</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Atletico Muniga FC '95</li>
                        </ul>
                    </div>

                    {/* Obote Group */}
                    <div className="crystal-glass-light rounded-xl p-5">
                        <div className="bg-mwiri-gold text-mwiri-blue-deep py-2.5 px-4 rounded-lg mb-5 text-center">
                            <h3 className="font-barlow font-extrabold text-sm uppercase tracking-wide">Dr. Milton Obote Group</h3>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80 text-sm font-medium">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Shadow FC '09</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Mpala FC '98</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Vuyos United FC '00</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Divers FC '13</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Kombora FC '03</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Solida FC '95</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Top Layer FC '97</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Bluedollar FC '03</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Mbawo FC '91</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-gold rounded-full"></span>Makaya FC '08</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeagueFormat;
