// src/lib/api.ts
export const API_URL = "https://localhost:8443/api";

/**
 * Fonction générique pour envoyer des requêtes à l'API.
 */
export async function apiRequest(endpoint: string, method: string, body?: any) {
    console.log(`Requête envoyée à : ${API_URL}${endpoint}`);
    console.log(`Méthode : ${method}`);
    console.log(`Body :`, body);

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include', // Inclure les credentials (cookies)
    });

    console.log(`Statut de la réponse : ${response.status}`);

    // Vérifie si la réponse est au format JSON
    const contentType = response.headers.get("Content-Type");
    if (!response.ok) {
        const errorMessage = contentType && contentType.includes("application/json")
            ? (await response.json()).error || "Erreur inattendue."
            : await response.text();
        throw new Error(errorMessage);
    }

    // Retourne la réponse JSON si elle est valide
    return contentType && contentType.includes("application/json")
        ? await response.json()
        : null;
}
