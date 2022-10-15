import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";

const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer
    },
});

export default store