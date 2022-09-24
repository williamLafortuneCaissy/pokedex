import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"
import { useContext, useEffect, useState } from "react";
import PokemonsContext from "../../context/PokemonsContext";

const PokemonDetail = () => {
    const pokemonsContext = useContext(PokemonsContext)
    const { pokemonName } = useParams()

    useEffect(() => {
        pokemonsContext.getPokemon(pokemonName)
        // // setPokemon
        // const pokemonData = pokemonsContext.pokemons.find(pokemon => pokemon.name === pokemonName)
        // setPokemon(pokemonData)
        // console.log(pokemonData)
    }, []);
    const pokemon = pokemonsContext.pokemons.find(pokemon => pokemon.name === pokemonName)
    return (
        <div className="bg-grass">
            <Link to='/'><BsArrowLeft /></Link>
            {pokemon &&
                <div className="fs-2 fw-bold">{pokemon.name}</div>
            }
        </div>
    );
}

export default PokemonDetail;