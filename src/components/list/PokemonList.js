import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './_pokemonList.scss';
import { handleFetchUrl } from "../../actions";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import PokemonListItem from "./PokemonListItem";
import { fetchPokemonList } from "../../store/pokemonActions";

const PokemonList = () => {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.list);

    useEffect(() => {
        console.log('pokemonList', pokemonList)
        if(!pokemonList) dispatch(fetchPokemonList())
    }, [pokemonList]);
    console.log('TODO: SETUP THE LOADMORE FNC AND KEEP GOING TO DETAILS PAGE')

    // useEffect(() => {
    //     const getList = async () => {
    //         let data = [];

    //         const storedData = JSON.parse(localStorage.getItem('pokemonList')) || [];
    //         if (storedData.length < 1154) {
    //             data = await handleFetchUrl('https://pokeapi.co/api/v2/pokemon/?limit=1154');
    //             localStorage.setItem('pokemonList', JSON.stringify(data.results));
    //         }
    //     }

    //     getList();
    // }, []);

    const loadMore = () => {
        console.log('loadMore')
        // const storedData = JSON.parse(localStorage.getItem('pokemonList')) || [];
        // const nextPokemons = storedData.slice(pokemonList.length, pokemonList.length + 20);
        // const hasDetails = nextPokemons.every(storedPokemon => storedPokemon.details);

        // const fetchData = async () => {
        //     console.log('fetchData()');
        //     const nextPokemonsDetails = await Promise.all(nextPokemons.map(pokemon => (
        //         handleFetchUrl(pokemon.url)
        //     )));

        //     const transformedPokemonDetails = transformDetails(nextPokemonsDetails);

        //     const updatedStorage = storedData.map(oldPokemon => ({
        //         ...oldPokemon,
        //         details: transformedPokemonDetails.find(nextPokemon => nextPokemon.name === oldPokemon.name) || oldPokemon.details
        //     }))
        //     localStorage.setItem('pokemonList', JSON.stringify(updatedStorage));

        //     setPokemonList(pokemonList => ([
        //         ...pokemonList,
        //         ...transformedPokemonDetails,
        //     ]));
        // }

        // if(hasDetails) {
        //     console.log('use storage')
        //     // console.log(pokemonList, nextPokemons, pokemonList.concat(nextPokemons));
        //     const newPokemonList = nextPokemons.map(pokemon => pokemon.details);
        //     setPokemonList(pokemonList => ([
        //         ...pokemonList,
        //         ...newPokemonList,
        //     ]));
        // } else {
        //     fetchData();
        // }
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
    return (
        <div className="container">
            {/* <InfiniteScroll
                className="pokemonGrid"
                pageStart={0}
                loadMore={loadMore}
                hasMore={true}
                loader={<div className="loader" key={0}>Loading ...</div>}
            > */}
            <div className="pokemonGrid">
                {pokemonList?.map((pokemon, key) => (
                    <PokemonListItem key={key} pokemonName={pokemon.name} />
                ))}
            </div>
            {/* </InfiniteScroll> */}
        </div>
    );
}

export default PokemonList;