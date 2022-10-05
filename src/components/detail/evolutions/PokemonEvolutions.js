import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvolutionChain, getPokemonDetails } from "../../../actions";
import { BsArrowRight } from "react-icons/bs"
import EvolutionChain from "./EvolutionChain";

const PokemonEvolutions = () => {
    const { pokemonName } = useParams();
    const [evolutionChains, setEvolutionChains] = useState([]);
    console.log(evolutionChains)
    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        let evolutionChainsData = await getEvolutionChain(pokemonName);
        let pokemons = [];

        // TODO: UPDATE getPokemonDetails so that we can get an array of data
        const getEvolutionsData = async (chain) => {
            pokemons.push(await getPokemonDetails(chain.species.name));

            if (!chain.evolves_to.length) return

            chain.evolves_to.map(evolvesChain => (
                getEvolutionsData(evolvesChain)
            ))
        };
        await getEvolutionsData(evolutionChainsData.chain);

        dispatch(evolutionChainsData, pokemons);
    }

    const dispatch = (evolutionChainsData, pokemons) => {

        const newState = [];
        const recursiveReduce = (chain) => {
            console.log(pokemons, pokemons.find(pokemon => pokemon.name === chain.species.name));
            const prevPokemon = {
                name: chain.species.name,
                img: pokemons.find(pokemon => pokemon.name === chain.species.name).sprites.front_default,
            };
            let lvl = 0;
            let nextPokemon = {};

            chain.evolves_to.map(subChain => {
                lvl = subChain.evolution_details[0].min_level || 0;
                nextPokemon = {
                    name: subChain.species.name,
                    img: pokemons.find(pokemon => pokemon.name === subChain.species.name).sprites.front_default,
                }

                newState.push({prevPokemon, lvl, nextPokemon});
                console.log(subChain)
                if (subChain.evolves_to.length) recursiveReduce(subChain)
            });
        }
        recursiveReduce(evolutionChainsData.chain);
        setEvolutionChains(newState);
    }

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