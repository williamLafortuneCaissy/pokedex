import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Pokeball } from '../../assets/images/pokeball.svg'
import './_pokemonList.scss';
import { handleFetchUrl } from "../../actions";
import InfiniteScroll from "react-infinite-scroller";

const firstMount = true;

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);

    // reset list on unmount to prevent data dupplicates
    useEffect(() => setPokemonList([]), []);

    useEffect(() => {
        const getList = async () => {
            let data = [];

            const storedData = JSON.parse(localStorage.getItem('pokemonList')) || [];
            if (storedData.length < 1154) {
                data = await handleFetchUrl('https://pokeapi.co/api/v2/pokemon/?limit=1154');
                localStorage.setItem('pokemonList', JSON.stringify(data.results));
            }
        }

        getList();
    }, []);

    const loadMore = () => {
        const storedData = JSON.parse(localStorage.getItem('pokemonList')) || [];
        const nextPokemons = storedData.slice(pokemonList.length, pokemonList.length + 20);
        const hasDetails = nextPokemons.every(storedPokemon => storedPokemon.details);

        const fetchData = async () => {
            console.log('fetchData()');
            const nextPokemonsDetails = await Promise.all(nextPokemons.map(pokemon => (
                handleFetchUrl(pokemon.url)
            )));

            const transformedPokemonDetails = transformDetails(nextPokemonsDetails);

            const updatedStorage = storedData.map(oldPokemon => ({
                ...oldPokemon,
                details: transformedPokemonDetails.find(nextPokemon => nextPokemon.name === oldPokemon.name) || oldPokemon.details
            }))
            localStorage.setItem('pokemonList', JSON.stringify(updatedStorage));

            setPokemonList(pokemonList => ([
                ...pokemonList,
                ...transformedPokemonDetails,
            ]));
        }

        if(hasDetails) {
            console.log('use storage')
            // console.log(pokemonList, nextPokemons, pokemonList.concat(nextPokemons));
            const newPokemonList = nextPokemons.map(pokemon => pokemon.details);
            setPokemonList(pokemonList => ([
                ...pokemonList,
                ...newPokemonList,
            ]));
        } else {
            fetchData();
        }
    }

    const transformDetails = (data) => {
        const transformedData = data.map(pokemon => ({
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

        return transformedData
    }

    // transform id into the format #000
    // ex: 1 -> returns #001
    const getTransformedId = (id) => {
        let transformedId = '#';

        // prepare id for #0xx and #00x
        if (id < 100) transformedId += '0'

        // prepare id for #00x
        if (id < 10) transformedId += '0'

        transformedId += id
        return transformedId
    }

    return (
        <div className="container">
            <InfiniteScroll
                className="pokemonGrid"
                pageStart={0}
                loadMore={loadMore}
                hasMore={true}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
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
            </InfiniteScroll>
        </div>
    );
}

export default PokemonList;