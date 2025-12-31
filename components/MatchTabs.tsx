import React from 'react';

interface MatchTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const MatchTabs: React.FC<MatchTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'lineups', label: 'Lineups' },
        { id: 'stats', label: 'Stats' },
        { id: 'h2h', label: 'Head-to-Head' },
    ];

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-4 font-bold text-sm uppercase tracking-wide transition-colors duration-200
                                ${activeTab === tab.id
                                    ? 'border-mwiri-blue text-mwiri-blue'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MatchTabs;
