import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"
import { useEffect, useState } from "react";
import './_pokemonDetail.scss';
import ProgressBar from "./progressBar/ProgressBar";
import PokemonAbout from "./about/PokemonAbout";
import { fetchPokemonDetails } from "../../actions";

const PokemonDetail = () => {
    const { pokemonName } = useParams();
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        getData(pokemonName);
    }, []);

    const getData = async (pokemonName) => {
        let rawData = {};
        const storedData = JSON.parse(localStorage.getItem('pokemons')) || [];
        const storedPokemon = storedData.find(pokemon => pokemon.name === pokemonName);

        if(!storedPokemon) {
            rawData = await fetchPokemonDetails(pokemonName);

            const saveData = [...storedData, rawData];
            console.log('saved pokemonDetails', pokemonName);
            localStorage.setItem('pokemons', JSON.stringify(saveData));
        } else {
            console.log('get stored pokemon', pokemonName);
            rawData = storedPokemon;
        }

        reduceState(rawData);
    }

    const reduceState = (data) => {
        setPokemon({
            id: data.id,
            name: data.name,
            types: data.types.map(typeObj => ({
                name: typeObj.type.name
            })),
            img: data.sprites.front_default,
            stats: data.stats.map(statsObj => ({
                prop: statsObj.stat.name,
                value: statsObj.base_stat
            }))
        })
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
                <div className={'pokemonDetail__card'}>
                    <div className="container">
                        {/* tabs */}
                        <div className={'tab__pannel p-3'}>
                            <PokemonAbout pokemonName={pokemon.name}/>
                        </div>
                        <div className={'tab__pannel p-3'}>
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