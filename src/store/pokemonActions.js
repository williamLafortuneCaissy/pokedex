import { pokemonActions } from "./pokemonSlice";

export const fetchPokemonList = () => async (dispatch) => {
    const limit = 20;
    // const storedData = JSON.parse(localStorage.getItem('pokemonData')) ;
    // if (storedData && storedData.list.length === limit) {
    //     dispatch(pokemonActions.updatePokemonList(storedData.list));
    //     console.log('get stored pokemonList');
    //     return
    // }

    const fetchThunk = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit='+limit);
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

export const fetchPokemon = (pokemonName) => async (dispatch) => {
    // const storedPokemonList = JSON.parse(localStorage.getItem('pokemonList')) || [];
    // const storedPokemon = storedPokemonList[pokemonName];
    // if(storedPokemon) {
    //     dispatch(
    //         pokemonActions.updatePokemon(storedPokemon)
    //     );
    //     return
    // }

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