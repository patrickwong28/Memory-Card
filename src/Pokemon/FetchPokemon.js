// Returns a random value from the range valid ids of pokemon
function Randomize(maxValue) {
  return Math.floor(Math.random() * maxValue) + 1;
}

// Returns a list of random values that represent ids of pokemon in the pokedex
function getRandomizedValues(batchSize, totalCount) {
  let randomizedValues = [];
  for (let i = 0; i < batchSize; i++)
    randomizedValues.push(Randomize(totalCount));

  return randomizedValues;
}

// Return the total number of unique pokemon species
async function getCount() {
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1');
  const data = resp.json();

  return data;
}

async function getBatch(totalCount) {
  const pokemonIDs = getRandomizedValues(100, totalCount);

  return Promise.all(
    Array.from(pokemonIDs, (id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon-form/${id}`).then((resp) =>
        resp.json()
      )
    )
  );
}

function createPokemonObject({ name, id, sprites }) {
  return { name: name, id: id, sprite: sprites.front_default };
}

function createPokemonList(data) {
  let pokemonList = [];

  for (const pokemon of data) pokemonList.push(createPokemonObject(pokemon));

  return pokemonList;
}

export default async function fetchPokemon() {
  try {
    const totalCount = await getCount();
    const batchData = await getBatch(totalCount.count);
    const pokemonList = createPokemonList(batchData);

    return pokemonList;
  } catch (err) {
    console.log('There was an error retrieving the Pokemon count', err);

    return [];
  }

  //   let pokemonList;
  //   Retrieve the total count of Pokemon in the Pokedex
  //   getCount()
  //     .then((data) => {
  //       return getBatch(data.count);
  //     })
  //     .then((data) => {
  //       pokemonList = createPokemonList(data);
  //       return pokemonList;
  //     })
  //     .catch((err) => {});
}
