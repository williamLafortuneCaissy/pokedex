import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PokemonsContext from "../../context/PokemonsContext";
import { ReactComponent as Pokeball } from '../../assets/images/pokeball.svg'
import './_pokemonList.scss';

const PokemonList = () => {
    const pokemonContext = useContext(PokemonsContext)

    useEffect(() => {
        pokemonContext.getPokemons()
    }, []);

    // transform id into the format #000
    // ex: 1 -> returns #001
    const getTransformedId = (id) => {
        let transformedId = '#';

        // prepare id for #0xx and #00x
        if(id < 100) transformedId += '0'

        // prepare id for #00x
        if(id < 10) transformedId += '0'

        transformedId += id
        return transformedId
    }

    return (
        <div className="container">
            <div className="pokemonGrid">
                {pokemonContext.pokemons?.map(obj => {
                    if(!!obj.data) {
                        const pokemon = obj.data
                        return (
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
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default PokemonList;