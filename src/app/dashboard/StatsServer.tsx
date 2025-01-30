import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api";
import StatsClient from "./StatsClient";

type DashboardData = {
    nbGames: number;
    avgScore: number;
    bestScore: number;
    serie: number;
};

export default async function StatsServer() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return (
            <div className="text-center text-red-500">
                Vous devez être connecté pour voir cette page.
            </div>
        );
    }

    let data: DashboardData | null = null;
    let errorMessage: string | null = null;

    try {
        data = await apiRequest("/stats/dashboard", "GET", null, token);
        console.log("Données reçues du backend :", data);
    } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
        errorMessage = "Impossible de charger les statistiques.";
    }

    return <StatsClient data={data} errorMessage={errorMessage} />;
}
