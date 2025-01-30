// src/lib/auth-ssr.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import https from 'https';
import fetch from 'node-fetch';

export async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    // Créer un agent HTTPS qui ignore les erreurs de certificat
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    // Assurez-vous d'utiliser le fetch non-standard qui supporte l'agent
    const res = await fetch("https://localhost:8443/api/auth/test", {
        headers: {
            Cookie: `token=${token?.value || ""}`
        },
        agent: httpsAgent,
    });

    const data = (await res.json()) as { authenticated: boolean; user: string };

    if (!data.authenticated) {
        redirect("/security/login");
    }

    return data;
}
