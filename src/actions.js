import search from './helpers/giphy-api'
import Constants from './constants'

/**
 * Checks for the last 5 searches in store and return response by search key.
 * @param {Object} param0 - State container.
 * @param {string} param0.searchKey - Key to search.
 * @param {Array[Object]} param0.previosSearches - An array of the previous searches (up to 5)
 * @returns {Object} - Relevant response.
 */
const checkPreviousSearches = ({ searchKey, previousSearches }) => {

    const foundResponse = (previousSearches || [])
        .find((curSearch) => curSearch.searchKey === searchKey)

    return foundResponse && foundResponse.response
}

/**
 * Sets current response to select gifs from.
 * @param {Array[Object]} currentResponse - Response to set as current.
 * @returns {Object} - An action.
 */
const setCurrentResponse = (currentResponse) => ({
    type: Constants.SET_CURRENT_RESPONSE,
    currentResponse
})

/**
 * Sets current response and add a new search result in to previous 5 results array.
 * @param {string} searchKey - Search key.
 * @param {Array[Object]} response - Reponse from Giphy API.
 * @returns {Object} - An object.
 */
const addNewResponse = (searchKey, response) => ({
    type: Constants.GET_GIFS_RESPONSE,
    searchKey, response
})

/**
 * Sets error message.
 * @param {Error} error - Error object.
 * @returns {Object} - An action.
 */
export const catchError = (error) => ({
    type: Constants.ERROR_RECEIVED,
    error: error.message
})

/**
 * Changes search key value.
 * @param {string} searchKey - Value to change in store.
 * @returns {Object} - An action.
 */
export const changeSearchKey = (searchKey) => ({
    type: Constants.KEY_CHANGED,
    searchKey
})

export const searchByQuery = (query) => (dispatch, getState) => {

    const storeState = getState()
    const existingResponse = checkPreviousSearches(storeState)

    if (existingResponse) {
        return dispatch(setCurrentResponse(existingResponse))
    }

    // this only for spinner, don't want to make a specific action creator
    dispatch({
        type: Constants.GET_GIFS
    })

    return search(query)
        .then((response) => response.json())
        .then((response) => dispatch(addNewResponse(storeState.searchKey, response.data)))
        .catch((error) => dispatch(catchError(error)))
}
