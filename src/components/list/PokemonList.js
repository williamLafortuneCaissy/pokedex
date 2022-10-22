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
        // TODO: SETUP ABORT
        if(!pokemonList.length) dispatch(fetchPokemonList())
    }, [pokemonList]);


    const loadMore = () => {
        console.log('loadMore')
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