import { createContext, useEffect, useReducer, useState } from 'react'
import pokemonReducer from '../reducers/pokemonReducer';

// this is the default context value. the only reason why we would want to set values is for the vvscode autocomplete.
const PokemonsContext = createContext({
    // isLoading: false,
    // error: null,
    pokemons: [],
    setPokemons: () => {},
    updatePokemon: () => {}
})

// AuthContextProvider is only usefull to make our code cleaner. we could still use AuthContext.Provider in app.js
export const PokemonsContextProvider = ({children}) => {

    const [pokemons, setPokemons] = useState([]);

    function updatePokemon(name, data) {
        const pokemonToUpdate = pokemons.find(pokemon => pokemon.name === name)
        if(pokemonToUpdate.data) return console.log(name, 'already has data')

        setPokemons(prevPokemons =>
            prevPokemons.map(prevPokemon => {
                if(prevPokemon.name === name) {
                    return {
                        ...prevPokemon,
                        data: data
                    }
                }
                return prevPokemon
            })
        )

    }
    /*
        - onload
        - check storage
            - update reducer

    */

    return (
        <PokemonsContext.Provider
            value={{
                pokemons: pokemons,
                setPokemons: setPokemons,
                updatePokemon: updatePokemon,
            }}
        >
            {children}
        </PokemonsContext.Provider>
    )
}

export default PokemonsContext