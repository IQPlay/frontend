import { getCookie } from "@/lib/api";

/**
 * Vérifie si l'utilisateur est authentifié en vérifiant la présence d'un token dans les cookies.
 */
export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;
    return !!getCookie("token");
};
