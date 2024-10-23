"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [numbers, setNumbers] = useState({number1: 0, number2: 0});
  // const [result, setResult] = useState("");
  const [inputPlayer, setInputPlayer] = useState("");
  const [badInputPlayer, setBadInputPlayer] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/data")
      .then((response) => response.json())
      // .then((response) => response.text())
      .then((data) => {
        setNumbers(data);
        // setResult(data);
      })
      .catch((error) => console.error("Erreur des reccuperations des nombres",error));
  }, []); // Le tableau vide [] assure que l'effet ne s'exécute qu'une fois

  const handleAnswerChange = (e:any) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setInputPlayer(value);
      setBadInputPlayer("");
    }
    else {
      setBadInputPlayer("Seul les chiffres sont autorisés.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>IQPlay</h1>
      <p>Bienvenue sur IQPlay, le jeu qui teste votre mémoire !</p>
      <div className="bg-white w-96 h-48 mt-9 flex items-center justify-center">
        <form>
          <p className="text-black">
            {numbers.number1} + {numbers.number2} =
            <input type="text" className="border border-gray-300 rounded ml-2 px-2 py-1" value={inputPlayer} onChange={handleAnswerChange} required />
          </p>
          {badInputPlayer && <p className="text-red-500 mt-2">{badInputPlayer}</p>} {/* Message d'erreur */}
          {/* <p>{result}</p> */}
        </form>
      </div>
    </div>
  );
}
