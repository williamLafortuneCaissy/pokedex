import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        pokemonType: 'fire'
    },
    reducers: {
        updatePokemonType(state, action) {
            console.log('update pokemonType', action.payload);
            return {pokemonType: action.payload};
        },
    },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
