import { AppState } from "../reducers";
import { SearchResult } from "../models/themoviedb";

/**
 * Gets a list of movies from the search results.
 * @param state The application state.
 */
export const getSearchResultList = (state: AppState) => {
    const searchResults = state.movie.searchResults;
    if (searchResults) {
        return searchResults.results;
    }
    // If no search results yet, return an empty list
    return [];
};

/**
 * Gets the 5-star rating for a search result (rounded to 1 decimal place)
 * @param searchResult themoviedb.org search result.
 */
export const get5StarRating = (searchResult: SearchResult) => parseFloat(searchResult.vote_average.toFixed(1));
