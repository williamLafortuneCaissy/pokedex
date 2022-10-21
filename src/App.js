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
    const pokemonState = useSelector(state => state);
    const [storageChecked, setStorageChecked] = useState(false);

    // update storage
    useEffect(() => {
        const stateHasData = Object.keys(pokemonState).length;
        const stateIsUpdated = localStorage.getItem('pokemonData') !== JSON.stringify(pokemonState);

        if (stateHasData && stateIsUpdated) {
            console.log('save storage: ', pokemonState)
            localStorage.setItem('pokemonData', JSON.stringify(pokemonState))
        }
    }, [pokemonState]);

    // get data from storage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('pokemonData'));
        if (storedData) dispatch(pokemonActions.updateState(storedData))
        setStorageChecked(true);
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
