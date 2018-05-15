import Constants from '../constants'

const initialState = {
    loading: false,
    searchKey: '',
    previousSearches: []
}

export default (state = initialState, action) => {

    switch(action.type) {
        case Constants.GET_GIFS:
            return {
                ...state,
                loading: true,
                error: null
            }
            break
        case Constants.GET_GIFS_RESPONSE:

            // create a copy of array to avoid side-effects
            const newSearches = [...state.previousSearches]

            // remove 5th search result from the previous, add new one
            if (newSearches.length >= 5) {
                newSearches.shift()
            }

            newSearches.push({
                searchKey: action.searchKey,
                response: action.response
            })

            return {
                ...state,
                loading: false,
                response: action.response,
                previousSearches: newSearches
            }
        case Constants.KEY_CHANGED:
            return {
                ...state,
                searchKey: action.searchKey
            }
        case Constants.SET_CURRENT_RESPONSE:
            return {
                ...state,
                response: action.currentResponse
            }
        case Constants.ERROR_RECEIVED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}
