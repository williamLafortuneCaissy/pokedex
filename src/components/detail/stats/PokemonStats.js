import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetails } from "../../../actions";
import ProgressBar from "../progressBar/ProgressBar";

const PokemonStats = () => {
    const { pokemonName } = useParams();
    const [stats, setStats] = useState();

    useEffect(() => {
        getPokemonDetails(dispatch, pokemonName);
    }, [pokemonName]);

    const dispatch = (data) => {

        // return transformed prop name if necessary
        const renameProp = (prop) => {
            console.log(prop)
            switch (prop) {
                case 'special-attack':
                    return 'sp. attack'
                    break;
                case 'special-defense':
                    return 'sp. defense'
                    break;

                default:
                    return prop
                    break;
            }
        }


        setStats(data.stats.map(statsObj => ({
            prop: renameProp(statsObj.stat.name),
            value: statsObj.base_stat
        })))
    }

    const handleProgress = (value) => {
        const max = 150
        return value / max * 100
    }

    console.log(stats);

    return (
        <div className="stats__table">
            {stats?.map((stat, key) => (
                <div key={stat.prop} className={'stats__row '+stat.prop}>
                    <span className={'stats__prop'}>{stat.prop}</span>
                    <span className={'stats__value'}>{stat.value}</span>
                    <span className={'stats__progress'}><ProgressBar color={key % 2 ? 'red' : 'green'} progress={handleProgress(stat.value)} /></span>
                </div>
            ))}
        </div>
    );
}

export default PokemonStats;