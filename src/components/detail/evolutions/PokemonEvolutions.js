import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvolutionChain, getPokemonDetails, getSpecies } from "../../../actions";

const PokemonEvolutions = () => {
    const { pokemonName } = useParams();
    const [evolution, setEvolution] = useState(null);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        let data = await getEvolutionChain(pokemonName);

        // if(data.species.url) {
        //     data.species = await getSpecies(pokemonName);
        // }

        // if(!data.evolutionChain) {
        //     data.evolutionChain = await getEvolutionChain(pokemonName);
        // }

        dispatch(data);
    }

    const dispatch = (data) => {
        console.log('dispatch', data)
    }

    return (
        <>
            PokemonEvolutions
        </>
    );
}

export default PokemonEvolutions;