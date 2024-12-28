import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPokemonSpecies } from '../../../store/pokemonActions';
import './_pokemonAbout.scss';

const PokemonAbout = () => {
    const { pokemonName } = useParams();
    const dispatch = useDispatch();
    const pokemon = useSelector(store=> store.pokemon.list.find(pokemon => pokemon.name === pokemonName));


    useEffect(() => {
        // we should already have details data
        if (!pokemon.species) {
            // TODO: SETUP ABORT
            dispatch(fetchPokemonSpecies(pokemonName));
        }
    }, [pokemon, pokemonName]);


    return (
        <>
            {/* species is the only data that could be missing */}
            {pokemon.species &&
                <div className="pokemonAbout">
                    {/* <p className="pokemonAbout__info">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio hic numquam quas temporibus aperiam ad distinctio eos. Maxime quibusdam sequi explicabo temporibus, debitis expedita a in ut neque, porro modi!</p> */}
                    <div className="pokemonAbout__card">
                        <div>
                            <div className="pokemonAbout__label text-muted">Height</div>
                            <div className="fw-bold">{pokemon.details.height} cm</div>
                        </div>
                        <div>
                            <div className="pokemonAbout__label text-muted">Weight</div>
                            <div className="fw-bold">{pokemon.details.weight} kg</div>
                        </div>
                    </div>
                    <div className="fw-bold fs-2 mb-3 mt-5">Breeding</div>
                    {/* <div className="breeding__info">
                        <div className="breeding__label text-muted">Gender</div>
                        <div className="fw-bold">value</div>
                    </div> */}
                    <div className="breeding__info">
                        <div className="breeding__label text-muted">Egg Groups</div>
                        <div className="fw-bold">{pokemon.species.eggGroups.join(', ')}
                        </div>
                    </div>
                    {/* <div className="breeding__info">
                        <div className="breeding__label text-muted">Egg Cycle</div>
                        <div className="fw-bold">value</div>
                    </div> */}
                </div>
            }
        </>
    );
}

export default PokemonAbout;