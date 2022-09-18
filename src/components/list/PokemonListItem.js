import { useEffect, useState } from "react";
import './_pokemonList.scss';
import { ReactComponent as Pokeball } from '../../assets/images/pokeball.svg'

// pokemon = {name: '', url: ''}
const PokemonListItem = ({fetchUrl}) => {
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        fetchData(fetchUrl)
    }, []);

    async function fetchData(url) {
    //     setIsLoading(true)
    //     setError(null)
        try {
            const response = await fetch(url)

            if (!response.ok) throw new Error('Could not load pokemons')
            const fetchedData = await response.json()
            console.log(fetchedData)
            setPokemon({
                id: fetchedData.id,
                name: fetchedData.name,
                types: fetchedData.types.map(typeObj => ({
                    name: typeObj.type.name
                })),
                img: fetchedData.sprites.front_default
            })

        } catch (error) {
            console.log(error)
            // setError(error.message)
        }

    //     setIsLoading(false)
    }

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
        <>
            {pokemon &&
                <div className={`pokemonLi bg-${pokemon.types[0].name}`}>
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
                </div>
            }
        </>
    );
}

export default PokemonListItem;