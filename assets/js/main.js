const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach(pokemon => {
            const li = document.createElement('li')
            li.className = `pokemon ${pokemon.type}`
            li.innerHTML = `
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        `
            li.addEventListener('click', () => abrirModalPokemon(pokemon))
            pokemonList.appendChild(li)
        })
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function abrirModalPokemon(pokemon) {
    const overlay = document.createElement('div');
    overlay.classList.add('card-container');

    const modalPokemon = document.createElement('div');
    modalPokemon.classList.add('card-content');
    modalPokemon.innerHTML = `
      <div class="topo-card ${pokemon.type}">
        <button class="card-close" onclick="fecharModal(this)">X</button>
        <span class="card-number">#${pokemon.number}</span>
        <span class="card-name">${pokemon.name}</span>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
  
      <div class="detail-card">
        <span>Abilities</span>
        <p>${pokemon.abilities.join(', ') || 'Nenhuma'}</p>
  
        <span>Held Items</span>
        <p>${pokemon.heldItems.join(', ') || 'Nenhum'}</p>
  
        <span>Moves</span>
        <p>${pokemon.moves.slice(0, 5).join(', ')}</p>
  
        <span>Stats</span>
        <p>${pokemon.stats.map(stat => `${stat.name}: ${stat.value}`).join(', ')}</p>
      </div>
    `
    overlay.appendChild(modalPokemon);
    document.body.appendChild(overlay);
}


function fecharModal(btn) {
    const overlay = btn.closest('.card-container');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}