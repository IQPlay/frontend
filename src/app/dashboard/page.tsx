import Link from 'next/link';
import { Play, History, Target } from 'lucide-react';

const mockUserData = {
    user: "John Doe",
    totalGames: 50,
    averageScore: 150,
    highestScore: 180,
    currentStreak: 5,
    goals: [
        "Atteindre un score de 200",
        "Jouer 10 jours d'affilée",
        "Améliorer votre temps de réponse moyen",
    ],
};

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
                Tableau de bord de {mockUserData.user}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Parties jouées" value={mockUserData.totalGames} />
                <StatCard title="Score moyen" value={mockUserData.averageScore} />
                <StatCard title="Meilleur score" value={mockUserData.highestScore} />
                <StatCard title="Série actuelle" value={`${mockUserData.currentStreak} jours`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Progression récente</h2>
                    <p className="text-gray-600">Les données de progression ne sont pas disponibles actuellement.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Objectifs</h2>
                    <ul className="space-y-4">
                        {mockUserData.goals.map((goal, index) => (
                            <li key={index} className="flex items-center">
                                <Target className="mr-2 text-indigo-500" />
                                <span>{goal}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/dashboard/game"
                    className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-center"
                >
                    <Play className="mr-4 text-green-500" size={24} />
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Jouer</h2>
                        <p className="text-gray-600">Commencer une nouvelle partie de calcul mental</p>
                    </div>
                </Link>
                <Link
                    href="/dashboard/game/history"
                    className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-center"
                >
                    <History className="mr-4 text-blue-500" size={24} />
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Historique</h2>
                        <p className="text-gray-600">Voir l'historique de vos parties</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-indigo-600">{value}</p>
        </div>
    );
}
