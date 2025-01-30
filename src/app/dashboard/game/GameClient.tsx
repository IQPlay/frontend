// app/game/GameClient.tsx (Client Component)
'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { useState } from "react";
import {Gamepad2, Info, Trophy, Users} from "lucide-react";

export default function GameClient() {
    const [difficulty, setDifficulty] = useState(1);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleStart = async () => {
        try {
            const response = await apiRequest(`/game/start`, "POST", { difficulty });
            router.push(`/dashboard/game/play-game?sessionId=${response.sessionId}`);
        } catch (err: any) {
            setError(err.message || "Impossible de démarrer la partie.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
        >
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-indigo-700">Nouvelle Partie</CardTitle>
                    <CardDescription className="text-lg text-indigo-500">Prêt à relever le défi ?</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                    <InfoCard icon={<Gamepad2 className="h-8 w-8 text-indigo-500" />} title="Gameplay Immersif" description="Plongez dans une expérience de jeu captivante et unique." />
                    <InfoCard icon={<Users className="h-8 w-8 text-indigo-500" />} title="Multijoueur" description="Affrontez vos amis ou faites équipe avec eux pour plus de fun !" />
                    <InfoCard icon={<Trophy className="h-8 w-8 text-indigo-500" />} title="Classements" description="Grimpez les échelons et devenez le meilleur joueur." />
                    <InfoCard icon={<Info className="h-8 w-8 text-indigo-500" />} title="Tutoriel" description="Apprenez les bases du jeu avec notre guide interactif." />
                </CardContent>
                <CardFooter className="flex justify-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={handleStart}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                        >
                            Lancer la partie
                        </Button>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg">
            {icon}
            <div>
                <h3 className="font-semibold text-indigo-700">{title}</h3>
                <p className="text-sm text-indigo-600">{description}</p>
            </div>
        </div>
    );
}