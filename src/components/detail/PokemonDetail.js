import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"
import { useEffect, useState } from "react";
import './_pokemonDetail.scss';
import PokemonTabs from "./tabs/PokemonTabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewPokemonDetails, fetchPokemonDetails } from "../../store/pokemonActions";
import { themeActions } from "../../store/themeSlice";

const PokemonDetail = () => {
    const { pokemonName } = useParams();
    const navigate = useNavigate();
    const pokemonList = useSelector(store=> store.pokemon.list);
    const pokemon = useSelector(store=> store.pokemon.list.find(pokemon => pokemon.name === pokemonName));
    const dispatch = useDispatch();

    useEffect(() => {
        const pokemonType = pokemon.details.types[0].name || null
        if (pokemonType) dispatch(themeActions.updatePokemonType(pokemonType))
    }, [pokemon]);

    // TODO: make sure the app work if we add a pokemon name in the url (ex: eevee)
    // we might not need redirect anymore
    useEffect(() => {
        // we redirect becausehaving only 1 pokemon in the list breaks the list page
        // we dont need to fetch data because we use the same data as the list
        if(!pokemonList.length) navigate('/');
    }, [pokemonList]);

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
        <>
            {pokemon?.name === pokemonName &&
                <div className={`text-white pokemonDetail bg-${pokemon.details.types[0].name}`}>
                    <div className="container mb-2 pt-3">
                        <Link to='/'><BsArrowLeft /></Link>
                    </div>
                        <div className="container">
                            <div className="d-flex">
                                <div className="fs-4 fw-bold">{pokemon.name}</div>
                                <div className="ml-auto fw-bold align-self-end">{getTransformedId(pokemon.details.id)}</div>
                            </div>
                            <div className="text-center">
                                <img src={pokemon.details.img} alt={pokemon.name} />
                            </div>
                        </div>
                        <div className={'pokemonDetail__card'}>
                            <div className="container">
                                <PokemonTabs />
                            </div>
                        </div>
                </div>
            }
        </>
    );
}

export default PokemonDetail;