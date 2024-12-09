export const API_URL = "http://localhost:8080/api";

/**
 * Fonction générique pour envoyer des requêtes à l'API.
 */
export async function apiRequest(endpoint: string, method: string, body?: any) {
    const token = getCookie("token");
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        const errorMessage =
            contentType && contentType.includes("application/json")
                ? (await response.json()).error || "Erreur inattendue."
                : await response.text();
        throw new Error(errorMessage);
    }

    const data = await response.json();

    // Stocker le token dans un cookie sécurisé si présent
    if (data.token) {
        document.cookie = `token=${data.token}; Path=/; Secure; SameSite=Strict`;
    }

    return data;
}

/**
 * Supprime le cookie contenant le token.
 */
export function clearToken() {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}

/**
 * Lit un cookie par son nom.
 */
export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
    }
    return null;
}
