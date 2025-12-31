import React from 'react';

const LeagueFormat = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-12">
            <div className="bg-mwiri-blue-deep px-8 py-6 border-b border-gray-800">
                <div className="flex items-center gap-4">
                    <img src="/images/mwiri-logo.png" alt="Mwiri League" className="h-12 w-12 object-contain" />
                    <div>
                        <h2 className="text-2xl font-bold text-white">New Mwiri League Play Format</h2>
                        <p className="text-mwiri-yellow font-medium">Season Six Technical Committee</p>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Rules Section */}
                <div className="space-y-6 mb-12">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mwiri-blue text-white flex items-center justify-center font-bold">1</div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Twenty participating cohorts were subjected to a draw performed by AI to make two groups. Group A is named after the late Kyabazinga and first deputy President of Uganda, <span className="font-bold text-mwiri-blue">Sir. Wilberforce Nadiope Group</span> while Group B is named after the First Prime Minister, <span className="font-bold text-mwiri-blue">Dr. Milton Obote Group</span>.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mwiri-blue text-white flex items-center justify-center font-bold">2</div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            The teams in the same group face each other once but all points from both groups are tabulated on one league table like the <span className="font-bold text-mwiri-blue">UEFA Champions League</span>.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mwiri-blue text-white flex items-center justify-center font-bold">3</div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            The top eight face off in the Quarter-finals for the <span className="font-bold text-mwiri-yellow">Super Cup</span>, while the next eight face off in quarter-finals for the <span className="font-bold text-gray-500">Plate Cup</span>. The last four will participate in the <span className="font-bold text-orange-500">Consolation Cup</span>.
                        </p>
                    </div>
                </div>

                {/* Groups Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Nadiope Group */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="bg-mwiri-yellow text-mwiri-blue-deep py-3 px-4 rounded-lg mb-6 text-center shadow-sm">
                            <h3 className="font-extrabold text-lg uppercase tracking-wide">Sir. Wilberforce Nadiope Group</h3>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800 font-medium">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Bootlickers FC '93</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Lukambwe FC '05</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Ruga-Ruga FC '88</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Salvo FC '98</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Winter FC '94</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Wampa FC '17</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Suici FC '06</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Sasi FC '07</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Buliti FC '01</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Atletico Muniga FC '95</li>
                        </ul>
                    </div>

                    {/* Obote Group */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="bg-mwiri-yellow text-mwiri-blue-deep py-3 px-4 rounded-lg mb-6 text-center shadow-sm">
                            <h3 className="font-extrabold text-lg uppercase tracking-wide">Dr. Milton Obote Group</h3>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800 font-medium">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Shadow FC '09</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Mpala FC '98</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Vuyos United FC '00</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Divers FC '13</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Kombora FC '03</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Solida FC '95</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Top Layer FC '97</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Bluedollar FC '03</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Mbawo FC '91</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-mwiri-blue rounded-full"></span>Makaya FC '08</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeagueFormat;
