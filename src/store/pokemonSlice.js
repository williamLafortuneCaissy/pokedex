import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {},
    reducers: {
        getPokemonDetails(state, action) {
            const payload = action.payload;

            state.id = payload.id;
            state.name = payload.name;
            state.types = payload.types.map(typeObj => ({
                name: typeObj.type.name
            }));
            state.img = payload.sprites.front_default;
            state.stats = payload.stats.map(statsObj => ({
                prop: statsObj.stat.name,
                value: statsObj.base_stat
            }));
        }
    },
});

export const pokemonActions = pokemonSlice.actions;
export default pokemonSlice;
