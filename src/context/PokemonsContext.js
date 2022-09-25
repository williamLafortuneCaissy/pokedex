import { createContext, useEffect, useReducer, useState } from 'react'
import pokemonListReducer from '../components/list/pokemonListReducer';

const PokemonsContext = createContext({
    // isLoading: false,
    // error: null,
    pokemons: [],
    setPokemons: () => {},
    getPokemons: () => {},
    getPokemon: () => {},
})

export const PokemonsContextProvider = ({children}) => {

    const [pokemons, setPokemons] = useState([]);

    // fetches and setPokemons
    async function getPokemons() {
        const storedData = JSON.parse(localStorage.getItem('pokemonList')) || null
        if (storedData) {
            // safety in case we load detail page before listing
            let needDataFetch = false;
            storedData.forEach(pokemon => {
                if(!pokemon.data) needDataFetch = true
            })

            if(!needDataFetch) {
                console.log('returned from storage', storedData)
                setPokemons(storedData)
                return
            }
        }

        const pokemonList = await fetchPokemons()
        const pokemonsData = await Promise.all(pokemonList.map(pokemon => (
            fetchPokemonDetails(pokemon.url)
        )))

        const newPokemonsState = pokemonList.map(pokemon => ({
            ...pokemon,
            data: pokemonsData.find(data => data.name === pokemon.name),
        }))


        localStorage.setItem('pokemonList', JSON.stringify(newPokemonsState))
        setPokemons(newPokemonsState)
    }

    // fetches and setPokemons
    async function getPokemon(name) {

        let pokemonList = []
        const storedData = JSON.parse(localStorage.getItem('pokemonList')) || null
        if (storedData) {
            console.log('returned from storage', storedData)
            pokemonList = storedData
        } else {
            pokemonList = await fetchPokemons()
        }


        const pokemon = pokemonList.find(pokemon => pokemon.name === name)

        let pokemonData;
        if(pokemon.data) {
            pokemonData = pokemon.data
        } else {
            pokemonData = await fetchPokemonDetails(pokemon.url)
        }

        const newPokemonsState = pokemonList.map(prevPokemon => ({
            ...prevPokemon,
            data: prevPokemon.name === name ? pokemonData : prevPokemon.data,
            // data: pokemonsData.find(data => data.name === pokemon.name),
        }))

        localStorage.setItem('pokemonList', JSON.stringify(newPokemonsState))
        setPokemons(newPokemonsState)
    }

    // return all pokemon (url + name)
    async function fetchPokemons() {
        //     setIsLoading(true)
        //     setError(null)
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/')

            if (!response.ok) throw new Error('Could not load pokemons')
            const fetchedData = await response.json()

            console.log('fetched Pokemons', fetchedData)
            return fetchedData.results
        } catch (error) {
            console.log(error)
            // setError(error.message)
        }
        //     setIsLoading(false)
    }

    // return pokemon details (obj)
    async function fetchPokemonDetails(url) {
        //     setIsLoading(true)
        //     setError(null)

        try {
            const response = await fetch(url)

            if (!response.ok) throw new Error('Could not load pokemons')
            const fetchedData = await response.json()

            console.log('fetched Pokemon', fetchedData)
            return {
                id: fetchedData.id,
                name: fetchedData.name,
                types: fetchedData.types.map(typeObj => ({
                    name: typeObj.type.name
                })),
                img: fetchedData.sprites.front_default,
                stats: fetchedData.stats.map(statsObj => ({
                    prop: statsObj.stat.name,
                    value: statsObj.base_stat
                }))
            }

        } catch (error) {
            console.log(error)
            // setError(error.message)
        }

        //     setIsLoading(false)
    }


    // async function fetchPokemon(name) {
    // //     setIsLoading(true)
    // //     setError(null)
    //     try {
    //         const response = await fetch(name)

    //         if (!response.ok) throw new Error('Could not load pokemons')
    //         const fetchedData = await response.json()

    //         console.log('fetched Pokemon', fetchedData)
    //         return {
    //             id: fetchedData.id,
    //             name: fetchedData.name,
    //             types: fetchedData.types.map(typeObj => ({
    //                 name: typeObj.type.name
    //             })),
    //             img: fetchedData.sprites.front_default
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         // setError(error.message)
    //     }

    // //     setIsLoading(false)
    // }

    function updatePokemon(name, data) {
        const pokemonToUpdate = pokemons.find(pokemon => pokemon.name === name)
        if(pokemonToUpdate.data) return console.log(name, 'already has data')

        setPokemons(prevPokemons =>
            prevPokemons.map(prevPokemon => {
                if(prevPokemon.name === name) {
                    return {
                        ...prevPokemon,
                        data: data
                    }
                }
                return prevPokemon
            })
        )

    }
    /*
        - onload
        - check storage
            - update reducer

    */

    return (
        <PokemonsContext.Provider
            value={{
                pokemons: pokemons,
                setPokemons: setPokemons,
                updatePokemon: updatePokemon,
                getPokemons: getPokemons,
                getPokemon: getPokemon,
            }}
        >
            {children}
        </PokemonsContext.Provider>
    )
}

export default PokemonsContext