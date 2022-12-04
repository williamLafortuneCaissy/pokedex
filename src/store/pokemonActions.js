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

export const fetchPokemonEvolutions = (pokemonName, pokemons) => async (dispatch) => {
    const evolutionUrl = pokemons.find(pokemon => pokemon.name === pokemonName).species.evolution_chain.url;

    const fetchThunk = async (pokemonName, evolutionUrl) => {
        const response = await fetch(evolutionUrl);
        if (!response.ok) throw new Error("Could not fetch evolution data!");

        const data = await response.json();
        return data;
    };


    // loop throught every pokemon in the evolution chain and
    // call fetchPokemonDetails() for missing pokemons
    // const fetchMissingPokemons = (chain) => {

    //     const checkEvolution = (chain) => {
    //         if (!pokemons.find(pokemon => pokemon.name === chain.species.name).details) {
    //             fetchPokemonDetails(chain.species.name);
    //         }

    //         if (!chain.evolves_to.length) return

    //         chain.evolves_to.map(evolvesChain => (
    //             checkEvolution(evolvesChain)
    //         ))
    //     };
    //     checkEvolution(chain);
    // }

    try {
        // console.log(pokemonName, evolutionUrl)
        const evolutionChainsData = await fetchThunk(pokemonName, evolutionUrl);
        console.log('fetched evolution chain', evolutionChainsData);

        // fetchMissingPokemons(evolutionChainsData.chain);
        // console.log('Full evolution', fullEvolution);

        // const promisePrep = [];
        // // prepare promise of missing pokemon
        // fullEvolution.forEach(evolution => {
        //     if (!pokemons.find(pokemon => pokemon.name === evolution.name).details) {
        //         fetchPokemonDetails(evolution.name);
        //     }
        // });



        // console.log('not tested when we dont have full evolution data', fullEvolutionDetails)

        dispatch(
            pokemonActions.updateEvolutionChain({pokemonName, evolutionChainsData})
        );

    } catch (error) {
        console.error('Error in fetchPokemon: ', error)
        return
    }





    //     export async function getEvolutionChain(pokemonName) {
    //     let rawPokemon = await getPokemonDetails(pokemonName);

    //     if(rawPokemon.species.url) {
    //         rawPokemon.species = await getSpecies(pokemonName);
    //     }

    //     if(rawPokemon.species.evolution_chain.url) {
    //         // evolution_chain endpoint absolutely needs id, we only have url.
    //         const evolutionChainUrl = new URL(rawPokemon.species.evolution_chain.url);
    //         // get "1" in "https://pokeapi.co/api/v2/evolution-chain/1/"
    //         const evolutionChainId = evolutionChainUrl.pathname.split('/').slice(-2)[0];

    //         rawPokemon.species.evolution_chain = await handleFetch(endpoints.evolutionChain, evolutionChainId);
    //     }


    //     saveToStorage(rawPokemon);
    //     return rawPokemon.species.evolution_chain;
    // }
}



