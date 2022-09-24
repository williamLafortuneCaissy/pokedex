import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonsContext from "../../context/PokemonsContext";
// import PokemonListItem from "./PokemonListItem";
import { ReactComponent as Pokeball } from '../../assets/images/pokeball.svg'
import './_pokemonList.scss';

const PokemonList = () => {
    const pokemonContext = useContext(PokemonsContext)

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('pokemonList')) || null
        if(storedData) {
            console.log('get from storage', storedData)
            pokemonContext.setPokemons(storedData)
        } else {
            getPokemons()
        }
    }, []);

    // fetches ans setPokemons in pokemonContext
    async function getPokemons() {
        const pokemonList = await fetchPokemons()

        const pokemonPromises = []
        pokemonList.forEach(pokemon => {
            const promise = () => fetchData(pokemon.url)
            pokemonPromises.push(promise)
        })

        const pokemonsData = await Promise.all(pokemonList.map(pokemon => (
            fetchData(pokemon.url)
        )))

        pokemonContext.setPokemons(pokemonsData)
        localStorage.setItem('pokemonList', JSON.stringify(pokemonsData))
    }

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

    async function fetchData(url) {
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
                img: fetchedData.sprites.front_default
            }

        } catch (error) {
            console.log(error)
            // setError(error.message)
        }

    //     setIsLoading(false)
    }

    // transform id into the format #000
    // ex: 1 -> returns #001
    const getTransformedId = (id) => {
        let transformedId = '#';

        // prepare id for #0xx and #00x
        if(id < 100) transformedId += '0'

        // prepare id for #00x
        if(id < 10) transformedId += '0'

        transformedId += id
        return transformedId
    }

    return (
        <div className="container">
            <div className="pokemonGrid">
                {pokemonContext.pokemons?.map(pokemon => (
                    <Link key={pokemon.name} to={`/${pokemon.name}`} className={`pokemonLi bg-${pokemon.types[0].name}`}>
                        <Pokeball className="pokemonLi__bg" />
                        <div className="pokemonLi__id">{getTransformedId(pokemon.id)}</div>
                        <div className="pokemonLi__name">{pokemon.name}</div>
                        <div className="d-flex">
                            <div>
                                {pokemon.types.map(type => (
                                    <div key={type.name} className={`tag mb-2`}>{type.name}</div>
                                ))}
                            </div>
                            <div className="ml-auto"><img src={pokemon.img} alt={pokemon.name} /></div>
                        </div>
                    </Link>
                        // <PokemonListItem key={pokemon.name} name={pokemon.name} fetchUrl={pokemon.url} />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;