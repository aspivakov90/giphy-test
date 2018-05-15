// it is better to move these values into the config
// and add to .gitignore for hiding sensetive data
const API_KEY = 'nN9z1uBBEiVSqcP8CHj6MYHOOclVHizC'
const GIPHY_HOST = `https://api.giphy.com`

export default (query) => {

    const fullSearchUrl = `${GIPHY_HOST}/v1/gifs/search?api_key=${API_KEY}&q=${query}`

    return fetch(fullSearchUrl)
}
