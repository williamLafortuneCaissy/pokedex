import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonDetails } from "../../../actions";
import ProgressBar from "./progressBar/ProgressBar";

const PokemonStats = () => {
    const { pokemonName } = useParams();
    const pokemonStats = useSelector(state => state.list.find(pokemon => pokemon.name === pokemonName).details.stats)

    // return transformed prop name if necessary
    const renameProp = (prop) => {
        switch (prop) {
            case 'special-attack':
                return 'sp. attack'
            case 'special-defense':
                return 'sp. defense'
            default:
                return prop
        }
    }

    const handleProgress = (value) => {
        const max = 150
        return value / max * 100
    }

    return (
        <div className="stats__table">
            {pokemonStats?.map((stat, key) => (
                <div key={stat.prop} className={'stats__row '+stat.prop}>
                    <span className={'stats__prop'}>{renameProp(stat.prop)}</span>
                    <span className={'stats__value'}>{stat.value}</span>
                    <span className={'stats__progress'}><ProgressBar color={key % 2 ? 'red' : 'green'} progress={handleProgress(stat.value)} /></span>
                </div>
            ))}
        </div>
    );
}

export default PokemonStats;