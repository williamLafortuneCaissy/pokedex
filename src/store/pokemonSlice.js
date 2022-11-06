import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: "pokemonList",
    initialState: {
        list: [],
    },
    reducers: {
        updateState(state, action) {
            console.log('update state', action.payload);
            return action.payload;
        },
        updatePokemonList(state, action) {
            console.log('update list', action.payload);
            state.list = action.payload;
        },
        updatePokemonDetails(state, action) {
            console.log('update pokemon', action)
            const {pokemonName, data} = action.payload;

            const heightCm = data.height * 10; // data.height is in decimeter
            const weightKg = data.weight * .1; // data.weight is in hectogram

            const details = {
                id: data.id,
                name: data.name,
                types: data.types.map(typeObj => ({
                    name: typeObj.type.name
                })),
                img: data.sprites.front_default,
                stats: data.stats.map(statsObj => ({
                    prop: statsObj.stat.name,
                    value: statsObj.base_stat,
                })),
                // about
                height: heightCm,
                weight: weightKg,
            };

            state.list = state.list.map(pokemon => ({
                ...pokemon,
                details: pokemon.name === pokemonName ? details : pokemon.details || undefined,
            }));
        },
        updatePokemonSpecies(state, action) {
            console.log('update pokemon species', action);
            const {pokemonName, data} = action.payload;


            const species = {
                eggGroups: data.egg_groups.map(eggGroup => eggGroup.name),
                evolution_chain: data.evolution_chain,
            }

            state.list = state.list.map(pokemon => ({
                ...pokemon,
                species: pokemon.name === pokemonName ? species : pokemon.species || undefined,
            }));
        },
        updateEvolutionChain(state, action) {
            console.log('updatePokemonEvolution', action);
            const { pokemonName, evolutionChainsData } = action.payload;

            const recursiveReduce = (chain) => {
                return {
                    lvl: chain.evolution_details[0]?.min_level || 0,
                    name: chain.species.name,
                    evolves_to: chain.evolves_to.map(subChain => recursiveReduce(subChain)),
                }
            }
            const evolutionChain = recursiveReduce(evolutionChainsData.chain);

            state.list = state.list.map(pokemon => ({
                ...pokemon,
                evolutionChain: pokemon.name === pokemonName ? evolutionChain : pokemon.evolutionChain || undefined,
            }));
        }
    },
});

export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice;
