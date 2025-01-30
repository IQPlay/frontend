import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api";
import HistoryClient from "./HistoryClient";

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
        history.sort((a, b) => b.id - a.id);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'historique :", error);
        errorMessage = "Impossible de récupérer l'historique des parties.";
    }

    return <HistoryClient history={history} errorMessage={errorMessage} />;
}
