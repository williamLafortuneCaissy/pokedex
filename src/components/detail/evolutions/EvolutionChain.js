import { BsArrowRight } from "react-icons/bs";
import './_pokemonEvolutions.scss';
import { ReactComponent as Pokeball } from '../../../assets/images/pokeball.svg'
import { Link } from "react-router-dom";

const EvolutionChain = ({chain}) => {
    const { prevPokemon, lvl, nextPokemon } = chain;
    return (
        <div className="evolution">
            <div className="flex-grow-1">
                <Link to={`/${prevPokemon.name}`} className="evolution-pokemon__img">
                    <Pokeball />
                    <img src={prevPokemon.img} alt={prevPokemon.name} />
                </Link>
                <div className="fs-2 mt-2">{prevPokemon.name}</div>
            </div>
            <div className="evolution-lvl">
                <BsArrowRight className="text-muted fs-2"/>
                <div className="fw-bold">Lvl {lvl}</div>
            </div>
            <div className="flex-grow-1">
                <Link to={`/${nextPokemon.name}`} className="evolution-pokemon__img">
                    <Pokeball />
                    <img src={nextPokemon.img} alt={nextPokemon.name} />
                </Link>
                <div className="fs-2 mt-2">{nextPokemon.name}</div>
            </div>
        </div>
    );
}

export default EvolutionChain;