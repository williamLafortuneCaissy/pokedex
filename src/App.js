import PokemonList from './components/list/PokemonList';
import './assets/sass/style.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetail from './components/detail/PokemonDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/:pokemonName" element={<PokemonDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
