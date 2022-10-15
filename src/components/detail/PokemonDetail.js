import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"
import { useEffect, useState } from "react";
import './_pokemonDetail.scss';
import PokemonTabs from "./tabs/PokemonTabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonDetails } from "../../store/pokemonActions";

const PokemonDetail = () => {
    const { pokemonName } = useParams();
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemon);


    useEffect(() => {
        // const getData = async () => {
        //     const pokemonDetails = await getPokemonDetails(pokemonName);
        //     transformState(pokemonDetails);
        // }
        // getData();
        dispatch(fetchPokemonDetails(pokemonName));

    }, [pokemonName]);


    // const transformState = (data) => {
    //     setPokemon({
    //         id: data.id,
    //         name: data.name,
    //         types: data.types.map(typeObj => ({
    //             name: typeObj.type.name
    //         })),
    //         img: data.sprites.front_default,
    //         stats: data.stats.map(statsObj => ({
    //             prop: statsObj.stat.name,
    //             value: statsObj.base_stat
    //         }))
    //     })
    // }

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
        <div className="bg-grass text-white pokemonDetail">
            <div className="container mb-2">
                <Link to='/'><BsArrowLeft /></Link>
            </div>
            {pokemon.name === pokemonName &&
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
                            {/* <PokemonTabs /> */}
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default PokemonDetail;