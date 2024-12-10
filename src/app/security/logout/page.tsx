import { apiRequest } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function Logout() {
    try {
        await apiRequest("/auth/logout", "POST");
        redirect("/login");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        redirect("/login");  // En cas d'erreur, redirige quand même vers la page de login
    }

    return null; // Cette ligne ne sera pas atteinte à cause de la redirection
}
