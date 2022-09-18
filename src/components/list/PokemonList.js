import { useEffect, useState } from "react";
import PokemonListItem from "./PokemonListItem";

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('pokemonList')) || null
        if(storedData) {
            console.log('localStorage', storedData)
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

            console.log('fetched', fetchedData.results)
            setPokemonList(fetchedData.results)
            localStorage.setItem('pokemonList', JSON.stringify(fetchedData.results))

        } catch (error) {
            console.log(error)
            // setError(error.message)
        }

    //     setIsLoading(false)
    }

    return (
        <div className="container">
            <div className="pokemonGrid">
                {pokemonList?.map(pokemon => (
                    <PokemonListItem key={pokemon.name} fetchUrl={pokemon.url} />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;