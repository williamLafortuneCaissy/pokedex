import { pokemonActions } from "./pokemonSlice";

export const fetchPokemonDetails = (pokemonName) => async (dispatch) => {
    const fetchPokemonDetailsThunk = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error("Could not fetch pokemon data!");

        const data = await response.json();
        return data;
    };

    try {
        const data = await fetchPokemonDetailsThunk(pokemonName);
        console.log('fetched details', data);
        dispatch(
            pokemonActions.getPokemonDetails(data)
        );
    } catch (error) {
        console.error('Error in fetchPokemon: ', error)
    }
}