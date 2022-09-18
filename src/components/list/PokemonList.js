import { useEffect, useState } from "react";
import PokemonListItem from "./PokemonListItem";

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('pokemonList')) || null
        if(storedData) {
            setPokemonList(storedData)
        } else {
            fetchPokemons()
        }
    }, []);

    async function fetchPokemons() {
    //     setIsLoading(true)
    //     setError(null)
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/')

            if (!response.ok) throw new Error('Could not load pokemons')
            const fetchedData = await response.json()

            console.log(fetchedData.results)
            setPokemonList(fetchedData.results)

        } catch (error) {
            console.log(error)
            // setError(error.message)
        }

    //     setIsLoading(false)
    }

    return (
        <div>
            {pokemonList?.map(pokemon => (
                <PokemonListItem key={pokemon.name} pokemon={pokemon} />
            ))}
        </div>
    );
}

export default PokemonList;