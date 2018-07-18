import { SearchResults } from "../models/themoviedb";

/**
 * A list of string constants for each type of action that can be dispatched.
 */
export const MovieActionTypes = {
    GotSearchResults: "@landmark/demo/movie/gotSearchResults",
};

/**
 * An action type for getting search results.
 */
export interface GotSearchResultsAction {
    type: string;
    payload: SearchResults;
};

/**
 * A collection of action creators for 'movie' actions.
 */
export const MovieActions = {
    /**
     * An action creator called when the API has successfully retrieved search results.
     */
    gotSearchResults: (searchResults: SearchResults) => ({
        type: MovieActionTypes.GotSearchResults,
        payload: searchResults,
    }) as GotSearchResultsAction,
};
