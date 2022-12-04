import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Pokeball } from '../../assets/images/pokeball.svg'
import { fetchPokemonDetails } from "../../store/pokemonActions";
import Skeleton from "react-loading-skeleton";


const PokemonListItem = (props) => {
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.list.find(pokemon => pokemon.name === props.pokemon.name))

    useEffect(() => {
        const abortController = new AbortController();
        if (!pokemon.details) dispatch(fetchPokemonDetails(pokemon.name, abortController))

        return () => abortController.abort();
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

    if(!pokemon.details) return <Skeleton className="pokemonLi--border-radius" height={200} count={1} />
    return (
        <>
            <Link
                ref={props.innerRef}
                to={`/${pokemon.details.name}`}
                id={props.id}
                className={`pokemonLi bg-${pokemon.details.types[0].name}`}>
                <Pokeball className="pokemonLi__bg" />
                <div className="pokemonLi__id">{getTransformedId(pokemon.details.id)}</div>
                <div className="pokemonLi__name">{pokemon.details.name}</div>
                <div className="d-flex">
                    <div>
                        {pokemon.details.types.map(type => (
                            <div key={type.name} className={`tag mb-2`}>{type.name}</div>
                        ))}
                    </div>
                    <div className="ml-auto"><img src={pokemon.details.img} alt={pokemon.details.name} width={96} height={96} /></div>
                </div>
            </Link>
        </>
    );
}

export default PokemonListItem;