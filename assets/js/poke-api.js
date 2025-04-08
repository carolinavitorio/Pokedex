
const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(data => ({
      number: data.id,
      name: data.name,
      photo: data.sprites.other.dream_world.front_default,
      type: data.types[0].type.name,
      types: data.types.map(t => t.type.name),
      abilities: data.abilities.map(a => a.ability.name),
      heldItems: data.held_items.map(item => item.item.name),
      moves: data.moves.map(m => m.move.name),
      stats: data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      }))
    }))
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(pokemonList => Promise.all(pokemonList.map(pokeApi.getPokemonDetail)))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

async function fetchPokemonData(pokeId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados do Pokémon");
    }
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error("Erro ao buscar os dados do Pokémon:", error);
    return null;
  }
} 