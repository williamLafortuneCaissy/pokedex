import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { endpoints, handleFetch } from '../../../actions';
import './_pokemonAbout.scss';

const PokemonAbout = () => {
    const { pokemonName } = useParams();
    const [about, setAbout] = useState(null);

    useEffect(() => {
        getData(pokemonName)
    }, []);

    const getData = async (pokemonName) => {
        let rawPokemon = {};
        const storedData = JSON.parse(localStorage.getItem('pokemons')) || [];
        const pokemonFound = storedData.find(pokemon => pokemon.name === pokemonName);

        if(!pokemonFound) {
            rawPokemon = await handleFetch(endpoints.pokemon, pokemonName);

        } else {
            console.log('get stored pokemon', pokemonName);
            rawPokemon = pokemonFound;
        }

        // pokemon-species
        if(!rawPokemon.species.data) {
            const species = await handleFetch(endpoints.pokemonSpecies, rawPokemon.species.name);
            rawPokemon.species.data = species

        }

        updateStorage(rawPokemon)
        dispatch(rawPokemon);
    }

    // update storage stored by pokemonId
    const updateStorage = (updatedPokemon) => {
        let saveData = [];
        const storedData = JSON.parse(localStorage.getItem('pokemons')) || [];
        const pokemonFound = storedData.find(pokemon => pokemon.name === updatedPokemon.name);
        if(JSON.stringify(pokemonFound) === JSON.stringify(updatedPokemon)) return;

        if(pokemonFound) {
            saveData = storedData.map(storedPokemon => (
                storedPokemon.name === updatedPokemon.name ? updatedPokemon : storedPokemon
            ));
        } else {
            saveData = [...storedData, updatedPokemon];
        }

        // sort by id asc
        saveData.sort((a, b) => (a.id - b.id))

        console.log('saved new ', updatedPokemon)
        localStorage.setItem('pokemons', JSON.stringify(saveData));
    }

    const dispatch = (data) => {
        const heightCm = data.height * 10; // dataHeight is in decimeter
        const weightKg = data.weight * .1; // dataWeight is in hectogram

        setAbout({
            name: data.name,
            encounter: '',
            height: heightCm,
            weight: weightKg,
            eggGroups: data.species.data.egg_groups.map(eggGroup => eggGroup.name),
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
                        <div className="fw-bold">{about.eggGroups.join(', ')}
                        </div>
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