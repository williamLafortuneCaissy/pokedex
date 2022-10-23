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
            console.log('update pokemon species', action)
            const {pokemonName, data} = action.payload;


            const species = {
                eggGroups: data.egg_groups.map(eggGroup => eggGroup.name),
            }

            state.list = state.list.map(pokemon => ({
                ...pokemon,
                species: pokemon.name === pokemonName ? species : pokemon.species || undefined,
            }));
        },
    },
});

export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice;
