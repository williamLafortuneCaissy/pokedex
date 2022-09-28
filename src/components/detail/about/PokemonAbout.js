import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../../../actions';
import './_pokemonAbout.scss';

const PokemonAbout = () => {
    const { pokemonName } = useParams();
    const [about, setAbout] = useState(null);

    useEffect(() => {
        getData(pokemonName)
    }, []);

    const getData = async (pokemonName) => {
        let rawData = {};
        const storedData = JSON.parse(localStorage.getItem('pokemons')) || [];
        const storedPokemon = storedData.find(pokemon => pokemon.name === pokemonName);

        if(!storedPokemon) {
            rawData = await fetchPokemonDetails(pokemonName);

            const saveData = [...storedData, rawData];
            console.log('saved pokemonDetails', pokemonName);
            localStorage.setItem('pokemons', JSON.stringify(saveData));
        } else {
            console.log('get stored pokemon', pokemonName);
            rawData = storedPokemon;
        }

        reduceState(rawData);
    }

    const reduceState = (data) => {
        const heightCm = data.height * 10; // dataHeight is in decimeter

        const weightKg = data.weight * .1; // dataWeight is in hectogram

        setAbout({
            name: data.name,
            encounter: '',
            height: heightCm,
            weight: weightKg,
            breeding: {
                male: 0,
                female: 0,
                eggGroup: "",
                eggCycle: "",
            }
        })
    }

    return (
        <>
            {about &&
                <div className="pokemonAbout">
                    <p className="pokemonAbout__info">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio hic numquam quas temporibus aperiam ad distinctio eos. Maxime quibusdam sequi explicabo temporibus, debitis expedita a in ut neque, porro modi!</p>
                    <div className="pokemonAbout__card">
                        <div>
                            <div className="pokemonAbout__label text-muted">Height</div>
                            <div className="fw-bold">{about.height} cm</div>
                        </div>
                        <div>
                            <div className="pokemonAbout__label text-muted">Weight</div>
                            <div className="fw-bold">{about.weight} kg</div>
                        </div>
                    </div>
                    <div className="fw-bold fs-2 mb-3 mt-5">Breeding</div>
                    <div className="breeding__info">
                        <div className="breeding__label text-muted">Gender</div>
                        <div className="fw-bold">value</div>
                    </div>
                    <div className="breeding__info">
                        <div className="breeding__label text-muted">Egg Groups</div>
                        <div className="fw-bold">value</div>
                    </div>
                    <div className="breeding__info">
                        <div className="breeding__label text-muted">Egg Cycle</div>
                        <div className="fw-bold">value</div>
                    </div>
                </div>
            }
        </>
    );
}

export default PokemonAbout;