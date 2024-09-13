import { useEffect, useState } from 'react';
import fetchPokemon from './FetchPokemon';
import '../style.css';
import Scoreboard from '../Components/Scoreboard';

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seenPokemon, setSeenPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    const getPokemonData = async () => {
      let data = await fetchPokemon();
      setPokemonData(data);
      setIsLoading(false);
    };

    getPokemonData();
  }, []);

  useEffect(() => {
    console.log('Score: ', score);
    console.log('Highscore: ', highscore);
    console.log('PokemonList: ', seenPokemon);
  }, [score, highscore, seenPokemon]);

  const handleClick = (pokemonName) => {
    if (seenPokemon.includes(pokemonName)) {
      if (score > highscore) setHighscore(score);

      // Reset the score and seenPokemon array when the user clicked on a card that they've already clicked on
      setScore(0);
      setSeenPokemon([]);
    } else {
      // Append new pokemon to the array and increment the score
      setSeenPokemon((prev) => [...prev, pokemonName]);
      setScore((prevScore) => (prevScore += 1));
    }
  };

  return (
    <>
      <Scoreboard score={score} highscore={highscore} />
      <div className="container">
        {isLoading && <p>Loading...</p>}
        {pokemonData &&
          pokemonData.map((pokemon) => (
            <img
              className="card"
              key={pokemon.id}
              src={pokemon.sprite}
              alt={'sprite of ' + pokemon.name}
              onClick={() => handleClick(pokemon.name)}
            />
          ))}
      </div>
    </>
  );
}
