import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, LogIn, UserPlus } from 'lucide-react'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-2">
                        Jeu de Calcul Mental
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-600">
                        Entraînez votre cerveau avec des défis mathématiques amusants !
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Nouveau message informatif */}
                    <p className="text-center text-gray-500 text-sm">
                        <strong>Astuce :</strong> Connectez-vous ou inscrivez-vous pour sauvegarder votre progression dans les niveaux.
                    </p>
                    <Button asChild className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <Link href="/play" className="flex items-center justify-center">
                            <Brain className="mr-2" />
                            Jouer sans compte
                        </Link>
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                        <Button asChild variant="outline" className="text-lg py-6 hover:bg-gray-100 transition-all duration-300">
                            <Link href="/login" className="flex items-center justify-center">
                                <LogIn className="mr-2" />
                                Se connecter
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="text-lg py-6 hover:bg-gray-100 transition-all duration-300">
                            <Link href="/register" className="flex items-center justify-center">
                                <UserPlus className="mr-2" />
                                S'inscrire
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
