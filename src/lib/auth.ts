export const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false; // localStorage n'est pas disponible côté serveur
    }
    const token = localStorage.getItem("token");
    return !!token; // Retourne true si un token est présent
};
