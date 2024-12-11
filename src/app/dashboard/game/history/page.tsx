const mockHistory = [
    { id: 1, date: '2024-01-10', score: 100, difficulty: 'Facile' },
    { id: 2, date: '2024-01-09', score: 150, difficulty: 'Moyen' },
    { id: 3, date: '2024-01-08', score: 200, difficulty: 'Difficile' },
];

export default function HistoryPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Historique des Parties</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulté</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {mockHistory.map((game) => (
                        <tr key={game.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.score}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.difficulty}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
