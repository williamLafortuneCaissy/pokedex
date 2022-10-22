import { pokemonActions } from "./pokemonSlice";

export const fetchPokemonList = () => async (dispatch) => {

    const fetchThunk = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        if (!response.ok) throw new Error("Could not fetch pokemonList!");

        const data = await response.json();
        return data;
    };

    try {
        const data = await fetchThunk();
        console.log('fetched pokemonList', data);
        dispatch(
            pokemonActions.updatePokemonList(data.results)
        );
    } catch (error) {
        console.error('Error in fetchPokemon: ', error)
    }
}

export const fetchPokemonDetails = (pokemonName) => async (dispatch) => {

    const fetchThunk = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error("Could not fetch pokemon data!");

        const data = await response.json();
        return data;
    };

    try {
        const data = await fetchThunk(pokemonName);
        console.log('fetched pokemon', data);
        dispatch(
            pokemonActions.updatePokemonDetails({pokemonName, data})
        );
    } catch (error) {
        console.error('Error in fetchPokemon: ', error)
    }
}