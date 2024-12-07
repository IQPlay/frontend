import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

export default function Home() {
  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Jeu de Calcul Mental</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Jouer sans compte</CardTitle>
              <CardDescription>Commencez à jouer immédiatement sans vous inscrire</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Parfait pour essayer le jeu rapidement !</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/play">Jouer maintenant</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Créer un compte ou se connecter</CardTitle>
              <CardDescription>Sauvegardez vos scores et suivez vos progrès</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Créez un compte pour accéder à toutes les fonctionnalités !</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href="/register">S'inscrire</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Comment jouer ?</h2>
          <p className="max-w-2xl mx-auto">
            Résolvez des problèmes de calcul mental le plus rapidement possible.
            Choisissez votre niveau de difficulté et voyez combien de calculs vous pouvez résoudre en 60 secondes !
          </p>
        </div>
      </div>
  )
}
