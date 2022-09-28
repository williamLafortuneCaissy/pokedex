import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Pokeball } from '../../assets/images/pokeball.svg'
import './_pokemonList.scss';
import { fetchPokemonDetails, fetchPokemonList } from "../../actions";

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let rawData = {};
        const storedData = JSON.parse(localStorage.getItem('pokemons')) || [];

        if(storedData.length < 20) {
            const pokemonListData = await fetchPokemonList()
            rawData = await Promise.all(pokemonListData.results.map(pokemon => (
                fetchPokemonDetails(pokemon.name)
            )))

            console.log('saved pokemonList');
            localStorage.setItem('pokemons', JSON.stringify(rawData));
        } else {
            console.log('get stored pokemonList');
            rawData = storedData;
        }

        reduceState(rawData);
    }

    const reduceState = (data) => {
        const newState = data.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map(typeObj => ({
                name: typeObj.type.name
            })),
            img: pokemon.sprites.front_default,
            stats: pokemon.stats.map(statsObj => ({
                prop: statsObj.stat.name,
                value: statsObj.base_stat
            }))
        }))

        setPokemonList(newState)
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
                {pokemonList?.map(pokemon => (
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
                ))}
            </div>
        </div>
    );
}

export default PokemonList;