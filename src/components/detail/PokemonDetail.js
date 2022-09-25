import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"
import { useContext, useEffect, useState } from "react";
import PokemonsContext from "../../context/PokemonsContext";
import './_pokemonDetail.scss';
import ProgressBar from "./progressBar/ProgressBar";

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

    // return transformed prop name if necessery
    function handleProp(prop) {
        switch (prop) {
            case 'special-attack':
                return 'sp. attack'
                break;
            case 'special-defense':
                return 'sp. attack'
                break;

            default:
                return prop
                break;
        }
    }

    function handleProgress(value) {
        const max = 150
        return value / max * 100
    }

    const pokemon = pokemonsContext.pokemons.find(pokemon => pokemon.name === pokemonName)?.data
    console.log('data', pokemon)
    return (
        <div className="bg-grass text-white pokemonDetail">
            <div className="container mb-2">
                <Link to='/'><BsArrowLeft /></Link>
            </div>
            {pokemon &&
                <>
                    <div className="container">
                    <div className="d-flex">
                        <div className="fs-4 fw-bold">{pokemon.name}</div>
                        <div className="ml-auto fw-bold align-self-end">{getTransformedId(pokemon.id)}</div>
                    </div>
                    <div className="text-center">
                        <img src={pokemon.img} alt={pokemon.name} />
                    </div>
                </div>
                <div className={'card'}>
                    <div className="container">
                        {/* tabs */}
                        <div className={'tab__pannel'}>
                            <div className="stats__table">
                                {pokemon.stats.map((stat, key) => (
                                    <div key={stat.prop} className={'stats__row'}>
                                        <span className={'stats__prop'}>{handleProp(stat.prop)}</span>
                                        <span className={'stats__value'}>{stat.value}</span>
                                        <span className={'stats__progress'}><ProgressBar color={key % 2 ? 'red' : 'green'} progress={handleProgress(stat.value)} /></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
    );
}

export default PokemonDetail;