const initialState = {
    pokemons: []
}

const actionTypes = {
    updateList: 'UPDATE_POKEMON_LIST'
}

const pokemonReducer = (state = initialState, action) => {
    // console.log(state, action)


    let newState;
    switch (action.type) {
        case actionTypes.updateList:
            newState = action
            break;

        default:
            newState = state
            break;
    }

    // update localstorage

    return newState
}

export const pokemonsActions = actionTypes
export const pokemonsInit = initialState
export default pokemonReducer