
export const endpoints = {
    pokemon: 'pokemon',
    pokemonSpecies: 'pokemon-species',
    evolutionChain: 'evolution-chain',
}

// id or name is the id / name of the endpoint, not always the pokemon
export async function handleFetch(endpoint, idOrName = '') {
    //     setIsLoading(true)
    //     setError(null)

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}/${idOrName}`)

        if (!response.ok) throw new Error('Could not load ', endpoint)
        const fetchedData = await response.json()

        console.log('fetched', endpoint, fetchedData)
        return fetchedData

    } catch (error) {
        console.log(error)
        // setError(error.message)
    }

    //     setIsLoading(false)
}

function saveToStorage(pokemon) {
    let newStorage = [];
    const oldStorage = JSON.parse(localStorage.getItem('pokemons')) || [];

    if(oldStorage.find(storedPokemon => storedPokemon.name === pokemon.name)) {
        newStorage = oldStorage.map(storedPokemon => storedPokemon.name === pokemon.name ? pokemon : storedPokemon)
    } else {
        newStorage = [...oldStorage, pokemon];
    }

    // sort by id asc
    newStorage.sort((a, b) => (a.id - b.id))
    localStorage.setItem('pokemons', JSON.stringify(newStorage));
}


export async function getPokemonDetails(pokemonName) {
    const storedData = JSON.parse(localStorage.getItem('pokemons')) || [];
    const storedPokemon = storedData.find(pokemon => pokemon.name === pokemonName);
    let rawPokemon = {}

    if(storedPokemon) {
        console.log('get from storage', storedPokemon.name)
        rawPokemon = storedPokemon
    } else {
        rawPokemon = await handleFetch(endpoints.pokemon, pokemonName);
    }

    saveToStorage(rawPokemon);
    return rawPokemon
}

export async function getSpecies(pokemonName) {
    const rawData = JSON.parse(localStorage.getItem('pokemons')) || [];
    const rawPokemon = rawData.find(pokemon => pokemon.name === pokemonName) || await handleFetch(endpoints.pokemon, pokemonName);

    // url is removed when we save species data in storage
    const species = rawPokemon.species.url ?
        await handleFetch(endpoints.pokemonSpecies, rawPokemon.species.name) :
        rawPokemon.species

    saveToStorage(rawPokemon);
    return species
}

export async function getEvolutionChain(pokemonName) {
    let rawPokemon = await getPokemonDetails(pokemonName);

    if(rawPokemon.species.url) {
        rawPokemon.species = await getSpecies(pokemonName);
    }

    if(rawPokemon.species.evolution_chain.url) {
        // evolution_chain endpoint absolutely needs id, we only have url.
        const evolutionChainUrl = new URL(rawPokemon.species.evolution_chain.url)
        // get "1" in "https://pokeapi.co/api/v2/evolution-chain/1/"
        const evolutionChainId = evolutionChainUrl.pathname.split('/').slice(-2)[0];

        rawPokemon.species.evolution_chain = await handleFetch(endpoints.evolutionChain, evolutionChainId);
    }

    saveToStorage(rawPokemon);
    return rawPokemon.species.evolution_chain;
}

