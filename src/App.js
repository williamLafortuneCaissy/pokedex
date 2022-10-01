import PokemonList from './components/list/PokemonList';
import './assets/sass/style.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetail from './components/detail/PokemonDetail';
import './assets/sass/_app.scss';

function App() {
    return (
        <div className="app">
            <div className="app__frame">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PokemonList />} />
                        <Route path="/:pokemonName" element={<PokemonDetail />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
