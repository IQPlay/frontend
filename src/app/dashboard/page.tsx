import Link from 'next/link';

const mockUserData = {
    user: "John Doe",
    totalGames: 50,
    averageScore: 150,
};

export default function DashboardPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Tableau de bord de {mockUserData.user}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Statistiques</h2>
                    <p className="text-gray-600">Parties jouées: {mockUserData.totalGames}</p>
                    <p className="text-gray-600">Score moyen: {mockUserData.averageScore}</p>
                </div>
                <Link href="/dashboard/game" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Jouer</h2>
                    <p className="text-gray-600">Commencer une nouvelle partie de calcul mental</p>
                </Link>
                <Link href="/dashboard/game/history" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Historique</h2>
                    <p className="text-gray-600">Voir l'historique de vos parties</p>
                </Link>
            </div>
        </>
    );
}
