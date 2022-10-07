import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails, getSpecies } from '../../../actions';
import './_pokemonAbout.scss';

const PokemonAbout = () => {
    const { pokemonName } = useParams();
    const [about, setAbout] = useState(null);

    useEffect(() => {
        const getData = async (pokemonName) => {
            let data = await getPokemonDetails(pokemonName);

            if(data.species.url) {
                data.species = await getSpecies(data.species.name);
            }

            transformState(data);
        }
        getData(pokemonName)
    }, [pokemonName]);


    const transformState = (data) => {
        const heightCm = data.height * 10; // data.height is in decimeter
        const weightKg = data.weight * .1; // data.weight is in hectogram

        setAbout({
            name: data.name,
            encounter: '',
            height: heightCm,
            weight: weightKg,
            eggGroups: data.species.egg_groups.map(eggGroup => eggGroup.name),
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