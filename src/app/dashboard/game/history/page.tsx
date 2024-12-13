import React from 'react';

const mockHistory = [
    { id: 1, date: '2024-01-10', score: 100 },
    { id: 2, date: '2024-01-09', score: 150 },
    { id: 3, date: '2024-01-08', score: 200 },
    { id: 4, date: '2024-01-07', score: 120 },
    { id: 5, date: '2024-01-06', score: 180 },
];

const averageScore = mockHistory.reduce((sum, game) => sum + game.score, 0) / mockHistory.length;

export default function HistoryPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-indigo-600 px-6 py-4 text-center">
                    <h1 className="text-2xl font-bold text-white">Historique des Parties</h1>
                    <p className="text-indigo-200 text-sm mt-1">Performances récentes</p>
                </div>

                <div className="p-6 space-y-8">
                    {/* Score moyen */}
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-700">Score Moyen</h3>
                        <p className="text-2xl font-bold text-indigo-600">{averageScore.toFixed(2)}</p>
                    </div>

                    {/* Dernières parties */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Dernières Parties</h3>
                        <ul className="space-y-4">
                            {mockHistory.map((game) => (
                                <li
                                    key={game.id}
                                    className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow"
                                >
                                    <span className="text-sm text-gray-600">{game.date}</span>
                                    <span className="text-lg font-bold text-indigo-600">{game.score}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
