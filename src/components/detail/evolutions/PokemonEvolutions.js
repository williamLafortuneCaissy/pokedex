import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { endpoints, getEvolutionChain, handleFetch } from "../../../actions";
import EvolutionChain from "./EvolutionChain";

const PokemonEvolutions = () => {
    const { pokemonName } = useParams();
    const [evolutionChains, setEvolutionChains] = useState([]);
    useEffect(() => {
        /*
            getData needs to get the evolution chain, extract the name of everypokemon,
            then checks which pokemon we have in storage, and fetch the others
        */
        const getData = async () => {
            const evolutionChainsData = await getEvolutionChain(pokemonName);
            let pokemonNames = []; // used to check if we have data in storage || fetching
            let pokemonsData = []; // raw data that we dispatch

            // compiles every pokemon in the evolution chain, in a simple array of pokemonName
            const extractPokemonUrl = (chain) => {
                pokemonNames.push(chain.species.name);
                if (!chain.evolves_to.length) return

                chain.evolves_to.map(evolvesChain => (
                    extractPokemonUrl(evolvesChain)
                ))
            };
            extractPokemonUrl(evolutionChainsData.chain);


            const storedPokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
            const storedPonemonName = storedPokemons.map(storedPokemon => storedPokemon.name);

            // get existing pokemon data from storage
            pokemonNames.forEach(pokemonName => {
                if (storedPonemonName.includes(pokemonName)) {
                    pokemonsData.push(storedPokemons.find(storedPokemon => storedPokemon.name === pokemonName));
                }
            })

            // fetch other pokemons
            const filteredPokemonNames = pokemonNames.filter(pokemonName => !storedPonemonName.includes(pokemonName));
            const remainingPokemons = await Promise.all(filteredPokemonNames.map(pokemon => (
                handleFetch(endpoints.pokemon, pokemon)
            )))

            pokemonsData = pokemonsData.concat(remainingPokemons);
            transformState(evolutionChainsData, pokemonsData);
        }
        getData()
    }, [pokemonName]);


    const transformState = (evolutionChainsData, pokemonsData) => {
        const newState = [];
        const recursiveReduce = (chain) => {

            const prevPokemon = {
                name: chain.species.name,
                img: pokemonsData.find(pokemon => pokemon.name === chain.species.name).sprites.front_default,
            };
            let lvl = 0;
            let nextPokemon = {};

            chain.evolves_to.forEach(subChain => {
                lvl = subChain.evolution_details[0].min_level || 0;
                nextPokemon = {
                    name: subChain.species.name,
                    img: pokemonsData.find(pokemon => pokemon.name === subChain.species.name).sprites.front_default,
                }

                newState.push({ prevPokemon, lvl, nextPokemon });
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