
export const endpoints = {
    pokemon: 'pokemon',
    pokemonSpecies: 'pokemon-species',
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


export async function getPokemonDetails(dispatch, pokemonName) {
    let rawData = {};
    const storedData = JSON.parse(localStorage.getItem('pokemons')) || [];
    const storedPokemon = storedData.find(pokemon => pokemon.name === pokemonName);

    if(!storedPokemon) {
        rawData = await handleFetch(endpoints.pokemon, pokemonName);

        const saveData = [...storedData, rawData];
        console.log('saved pokemonDetails', pokemonName);
        localStorage.setItem('pokemons', JSON.stringify(saveData));
    } else {
        console.log('get stored pokemon', pokemonName);
        rawData = storedPokemon;
    }

    dispatch(rawData);
}

