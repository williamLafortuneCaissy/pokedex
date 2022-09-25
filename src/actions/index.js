export async function fetchPokemonList() {
    //     setIsLoading(true)
    //     setError(null)
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/')

        if (!response.ok) throw new Error('Could not load pokemons')
        const fetchedData = await response.json()

        console.log('fetched Pokemons', fetchedData)
        return fetchedData
    } catch (error) {
        console.log(error)
        // setError(error.message)
    }
    //     setIsLoading(false)
}

export async function fetchPokemonDetails(url) {
    //     setIsLoading(true)
    //     setError(null)

    try {
        const response = await fetch(url)

        if (!response.ok) throw new Error('Could not load pokemons')
        const fetchedData = await response.json()

        console.log('fetched Pokemon', fetchedData)
        return fetchedData

    } catch (error) {
        console.log(error)
        // setError(error.message)
    }

    //     setIsLoading(false)
}