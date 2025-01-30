// src/lib/api.ts
export const API_URL = "https://localhost:8443/api";

/**
 * Fonction générique pour envoyer des requêtes à l'API.
 */
export async function apiRequest(endpoint: string, method: string, body?: any, token?: string) {
    console.log(`Requête envoyée à : ${API_URL}${endpoint}`);
    console.log(`Méthode : ${method}`);
    console.log(`Body :`, body);

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
        credentials: "include",
    });

    console.log(`Statut de la réponse : ${response.status}`);

    if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        const errorMessage = contentType && contentType.includes("application/json")
            ? (await response.json()).error || "Erreur inattendue."
            : await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}


