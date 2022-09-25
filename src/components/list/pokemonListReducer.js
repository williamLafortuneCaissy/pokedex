import { fetchPokemonList } from "../../actions";

const initialState = []

const actionTypes = {
    setList: 'SET_POKEMON_LIST'
}

const pokemonListReducer = (state = initialState, action) => {
    console.log(state, action)
    const {type, payload} = action


    let newState;
    switch (type) {
        case actionTypes.setList:
            newState = payload.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map(typeObj => ({
                    name: typeObj.type.name
                })),
                img: pokemon.sprites.front_default,
                stats: pokemon.stats.map(statsObj => ({
                    prop: statsObj.stat.name,
                    value: statsObj.base_stat
                }))
            }))
            break;

        default:
            newState = state
            break;
    }

    // update localstorage

    return newState
}

export const pokemonListActions = actionTypes
export const pokemonListInit = initialState
export default pokemonListReducer