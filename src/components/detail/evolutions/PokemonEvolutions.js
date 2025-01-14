import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPokemonEvolutions } from "../../../store/pokemonActions";
import EvolutionChain from "./EvolutionChain";

const PokemonEvolutions = () => {
    const { pokemonName } = useParams();
    const [evolutionChains, setEvolutionChains] = useState([]);
    const dispatch = useDispatch();
    const pokemonList = useSelector(store=> store.pokemon.list);

    // TODO: refactor so that we can fetch missing data
    useEffect(() => {
        const pokemon = pokemonList.find(pokemon => pokemon.name === pokemonName);

        if (!pokemon.evolution_chain) {
            // TODO: SETUP ABORT
            dispatch(fetchPokemonEvolutions(pokemonName, pokemonList));
            return
        }

        const hasMissingData = () => {
            let missingPokemon = [];

            // pushes every pokemon that we didnt fetch its details yet in missingPokemon
            const extractPokemonUrl = (chain) => {
                if(!pokemonList.find(pokemon => pokemon.name === chain.name).details) {
                    missingPokemon.push(chain.name);
                }
                if (!chain.evolves_to.length) return

                chain.evolves_to.map(evolvesChain => (
                    extractPokemonUrl(evolvesChain)
                ))
            };
            extractPokemonUrl(pokemon.evolution_chain);

            return !missingPokemon.length;
        }


        const prepareState = () => {
            const newState = [];

            const recursiveReduce = (chain) => {
                const prevPokemon = {
                    name: chain.name,
                    img: pokemonList.find(pokemon => pokemon.name === chain.name).details.img,
                };
                let lvl = 0;
                let nextPokemon = {};

                chain.evolves_to.forEach(subChain => {
                    lvl = subChain.lvl;
                    nextPokemon = {
                        name: subChain.name,
                        img: pokemonList.find(pokemon => pokemon.name === subChain.name).details.img,
                    }

                    newState.push({ prevPokemon, lvl, nextPokemon });
                    if (subChain.evolves_to.length) recursiveReduce(subChain)
                });
            }
            recursiveReduce(pokemon.evolution_chain);

            return newState
        }

        if (!hasMissingData()) return;
        const evolutionChainsState = prepareState();
        setEvolutionChains(evolutionChainsState);

    }, [pokemonName, pokemonList, dispatch]);


    return (
        <>
            {!!evolutionChains.length &&
                <>
                    <div className="fs-3 fw-bold mb-3">Evolution chain</div>
                    <div>
                        {evolutionChains.map(chain => <EvolutionChain key={chain.nextPokemon.name} chain={chain} />)}
                    </div>
                </>
            }
        </>
    );
}

export default PokemonEvolutions;