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
                }))
            };

            state.list = state.list.map(pokemon => ({
                ...pokemon,
                details: pokemon.name === pokemonName ? details : pokemon.details || undefined,
            }));
            // updatedPokemon.details = {
            //     id: data.id,
            //     name: data.name,
            //     types: data.types.map(typeObj => ({
            //         name: typeObj.type.name
            //     })),
            //     img: data.sprites.front_default,
            //     stats: data.stats.map(statsObj => ({
            //         prop: statsObj.stat.name,
            //         value: statsObj.base_stat,
            //     }))
            // };
            // const payload = action.payload;
            // state
            // state.name = payload.name;
            // state.details = {
            //     id: payload.id,
            //     types: payload.types.map(typeObj => ({
            //         name: typeObj.type.name
            //     })),
            //     img: payload.sprites.front_default,
            //     stats: payload.stats.map(statsObj => ({
            //         prop: statsObj.stat.name,
            //         value: statsObj.base_stat,
            //     }))
            // };
        },
        // updatePokemon(state, action) {
        //     state = action.payload;
        // }
    },
});

export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice;
