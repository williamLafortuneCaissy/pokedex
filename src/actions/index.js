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

export const endpoints = {
    pokemon: 'pokemon',
    pokemonSpecies: 'pokemon-species',
}
