import { apiRequest } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function Logout() {
    try {
        await apiRequest("/auth/logout", "POST");
        redirect("/security/login");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        redirect("/security/login");  // En cas d'erreur, redirige quand même vers la page de login
    }
}
