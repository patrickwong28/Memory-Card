import { useEffect, useState } from 'react';
import fetchPokemon from './FetchPokemon';
import '../style.css';

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemonData = async () => {
      let data = await fetchPokemon();
      setPokemonData(data);
      setIsLoading(false);
    };

    getPokemonData();
  }, []);

  return (
    <div className="container">
      {isLoading && <p>Loading...</p>}
      {console.log(pokemonData)}
      {pokemonData &&
        pokemonData.map((pokemon) => (
          <img
            className="card"
            key={pokemon.id}
            src={pokemon.sprite}
            alt={pokemonData.name}
            onClick={() => console.log('Clicked')}
          />
        ))}
    </div>
  );
}

// useEffect(() => {
//   const getPokemon = async () => {
//     const resp = await fetch(
//       `https://pokeapi.co/api/v2/pokemon-form/umbreon/`
//     );
//     const data = resp.json();
//     return data;
//   };

//   getPokemon()
//     .then((data) => {
//       setPokemonData(data);
//       setIsLoading(false);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);
