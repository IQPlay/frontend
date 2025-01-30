import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api";
import ProfileClient from "./ProfileClient";

type PlayerProfile = {
    id: number;
    email: string;
    username: string;
};

export default async function ProfileServer() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return (
            <div className="text-center text-red-500">
                Vous devez être connecté pour voir cette page.
            </div>
        );
    }

    let profileData: PlayerProfile | null = null;
    let errorMessage: string | null = null;

    try {
        profileData = await apiRequest("/player/profile", "GET", null, token);
        console.log("Données reçues du backend :", profileData);
    } catch (error) {
        console.error("Erreur lors du chargement du profil :", error);
        errorMessage = "Impossible de charger le profil utilisateur.";
    }

    return <ProfileClient profile={profileData} errorMessage={errorMessage} />;
}
