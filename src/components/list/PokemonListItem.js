import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Pokeball } from '../../assets/images/pokeball.svg'
import { fetchPokemon } from "../../store/pokemonActions";


const PokemonListItem = ({ pokemonName }) => {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state[pokemonName])

    useEffect(() => {
        if (!pokemon) dispatch(fetchPokemon(pokemonName))
    }, [pokemon]);

    // transform id into the format #000
    // ex: 1 -> returns #001
    const getTransformedId = (id) => {
        let transformedId = '#';

        // prepare id for #0xx and #00x
        if (id < 100) transformedId += '0'

        // prepare id for #00x
        if (id < 10) transformedId += '0'

        transformedId += id
        return transformedId
    }

    if(!pokemon) return
    return (
        <>
            <Link key={pokemon.name} to={`/${pokemon.name}`} className={`pokemonLi bg-${pokemon.types[0].name}`}>
                <Pokeball className="pokemonLi__bg" />
                <div className="pokemonLi__id">{getTransformedId(pokemon.id)}</div>
                <div className="pokemonLi__name">{pokemon.name}</div>
                <div className="d-flex">
                    <div>
                        {pokemon.types.map(type => (
                            <div key={type.name} className={`tag mb-2`}>{type.name}</div>
                        ))}
                    </div>
                    <div className="ml-auto"><img src={pokemon.img} alt={pokemon.name} /></div>
                </div>
            </Link>
        </>
    );
}

export default PokemonListItem;