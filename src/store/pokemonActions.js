import { useSelector } from "react-redux";
import { pokemonActions } from "./pokemonSlice";

export const fetchPokemonList = () => async (dispatch) => {

    const fetchThunk = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1154"');
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

export const fetchPokemonDetails = (pokemonName, abortController) => async (dispatch) => {

    const fetchThunk = async (pokemonName) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, { signal: abortController.signal });
        if (!response.ok) throw new Error("Could not fetch pokemon data!");

        const data = await response.json();
        return data;
    };

    try {
        const data = await fetchThunk(pokemonName);
        console.log('fetched pokemon details', data);
        dispatch(
            pokemonActions.updatePokemonDetails({pokemonName, data})
        );
    } catch (error) {
        // only call dispatch when we know the fetch was not aborted
        if (!abortController.signal.aborted) {
            console.error('Error in fetchPokemonDetails: ', error)
        }
    }
}

export const fetchPokemonSpecies = (pokemonName) => async (dispatch) => {

    const fetchThunk = async (pokemonName) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        if (!response.ok) throw new Error("Could not fetch pokemon data!");

        const data = await response.json();
        return data;
    };

    try {
        const data = await fetchThunk(pokemonName);
        console.log('fetched pokemon species', data);
        dispatch(
            pokemonActions.updatePokemonSpecies({pokemonName, data})
        );
    } catch (error) {
        console.error('Error in fetchPokemon: ', error)
    }
}

// TODO: fix evee's evolution
export const fetchPokemonEvolutions = (pokemonName, pokemons) => async (dispatch) => {
    const evolutionUrl = pokemons.find(pokemon => pokemon.name === pokemonName).species.evolution_chain.url;

    const fetchThunk = async (pokemonName, evolutionUrl) => {
        const response = await fetch(evolutionUrl);
        if (!response.ok) throw new Error("Could not fetch evolution data!");

        const data = await response.json();
        return data;
    };

    try {
        const evolutionChainsData = await fetchThunk(pokemonName, evolutionUrl);
        console.log('fetched evolution chain', evolutionChainsData);

        dispatch(
            pokemonActions.updateEvolutionChain({pokemonName, evolutionChainsData})
        );

    } catch (error) {
        console.error('Error in fetchPokemon: ', error)
        return
    }

}



