import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
// import themeSlice from "./themeSlice";

const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
        // theme: themeSlice.reducer,
    },

});

export default store