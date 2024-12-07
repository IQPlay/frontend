export const API_URL = "localhost:8080";

/**
 * Fonction générique pour envoyer des requêtes à l'API.
 */
export async function apiRequest(
    endpoint: string,
    method: string = "GET",
    body?: object,
    headers: HeadersInit = {}
) {
    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Une erreur est survenue.");
    }

    return response.json();
}
