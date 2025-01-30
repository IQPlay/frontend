import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api";
import Link from "next/link";
import { Play, Clock, CheckCircle } from "lucide-react";

type GameHistory = {
    id: number;
    name: string;
    level: number;
    score: number;
    state: string;
    createdAt: string; // Format YYYY/MM/DD
};

export default async function HistoryPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">Vous devez être connecté pour voir cette page.</p>
            </div>
        );
    }

    let history: GameHistory[] = [];
    let errorMessage: string | null = null;

    try {
        history = await apiRequest("/history/games", "GET", null, token);

        // Tri des parties par ID (ordre décroissant → les parties récentes en haut)
        history.sort((a, b) => b.id - a.id);

    } catch (error) {
        console.error("Erreur lors de la récupération de l'historique :", error);
        errorMessage = "Impossible de récupérer l'historique des parties.";
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            {/* En-tête */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Historique des Parties</h1>
                <p className="text-gray-500 mt-2">Gérez et continuez vos parties en cours.</p>
            </div>

            {errorMessage ? (
                <p className="text-center text-red-500">{errorMessage}</p>
            ) : history.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {history.map((game) => (
                        <div
                            key={game.id}
                            className={`relative bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                                game.state === "IN_PROGRESS" || game.state === "PAUSED"
                                    ? "border-l-4 border-blue-500"
                                    : game.state === "ENDED"
                                        ? "border-l-4 border-gray-400"
                                        : "border-l-4 border-red-500"
                            }`}
                        >
                            {/* Date et Score */}
                            <div className="flex justify-between items-center text-gray-600 text-sm">
                                <span className="font-medium">{game.createdAt}</span>
                                <span className="font-semibold text-indigo-600 text-lg">{game.score} pts</span>
                            </div>

                            {/* Titre */}
                            <h2 className="text-xl font-semibold text-gray-900 mt-2 flex items-center gap-2">
                                {game.state === "IN_PROGRESS" && <Clock className="text-blue-500" size={18} />}
                                {game.state === "PAUSED" && <Play className="text-yellow-500" size={18} />}
                                {game.state === "ENDED" && <CheckCircle className="text-gray-500" size={18} />}
                                {game.name}
                            </h2>

                            {/* Niveau */}
                            <p className="text-sm text-gray-500">Niveau : <span className="font-medium">{game.level}</span></p>

                            {/* Statut de la partie */}
                            <p className={`mt-2 text-sm font-semibold uppercase ${
                                game.state === "IN_PROGRESS" ? "text-blue-600"
                                    : game.state === "PAUSED" ? "text-yellow-500"
                                        : game.state === "ENDED" ? "text-gray-500"
                                            : "text-red-600"
                            }`}>
                                {game.state === "IN_PROGRESS" ? "En cours"
                                    : game.state === "PAUSED" ? "En pause"
                                        : game.state === "ENDED" ? "Terminée"
                                            : "Inconnue"}
                            </p>

                            {/* Bouton "Continuer" si la partie est en cours ou en pause */}
                            {(game.state === "IN_PROGRESS" || game.state === "PAUSED") && (
                                <Link
                                    href={`/dashboard/game/play-game?sessionId=${game.id}`}
                                    className="mt-4 block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Continuer la partie
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Aucune partie jouée pour l'instant.</p>
            )}
        </div>
    );
}
