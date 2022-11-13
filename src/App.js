import PokemonList from './components/list/PokemonList';
import './assets/sass/style.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetail from './components/detail/PokemonDetail';
import './assets/sass/_app.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPokemonList } from './store/pokemonActions';
import { pokemonActions } from './store/pokemonSlice';

function App() {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state);
    const [storageChecked, setStorageChecked] = useState(false);

    // update storage
    useEffect(() => {
        const stateHasData = pokemon.list.length;
        const stateIsUpdated = localStorage.getItem('pokemonData') !== JSON.stringify(pokemon.list);

        if (stateHasData && stateIsUpdated) {
            console.log('save storage: ', pokemon)
            localStorage.setItem('pokemonData', JSON.stringify(pokemon))
        }
    }, [pokemon.list]);

    // get data from storage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('pokemonData'));
        setStorageChecked(true);
        if (storedData) {
            dispatch(pokemonActions.updateState(storedData))
        } else {
            // TODO: check every useEffect, make sure they have a cleanup function
            dispatch(fetchPokemonList())
        }
    }, []);

    return (
        <div className="app">
            <div className="app__frame">
                {/* prevent loading component which could result in fetching data that we already have in storage */}
                {storageChecked &&
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<PokemonList />} />
                            <Route path="/:pokemonName" element={<PokemonDetail />} />
                        </Routes>
                    </BrowserRouter>
                }
            </div>
        </div>
    );
}

export default App;
