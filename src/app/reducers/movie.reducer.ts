import { AppState } from ".";
import { GotSearchResultsAction, MovieActionTypes } from "../actions/movie.actions";
import { SearchResults } from "../models/themoviedb";

/**
 * Define the `movie` area of state.
 */
export interface MovieState {
    /**
     * A list of search results from themoviedb.org API.
     */
    searchResults?: SearchResults;
};

/**
 * The default state.
 */
const defaultState: MovieState = {
    searchResults: null,
};

/**
 * The reducer, responsible for updating the state of this area of the application
 * when specific actions are observed in the store.
 */
export function movieReducer(state = defaultState, action: GotSearchResultsAction) {
    switch (action.type) {
        // When the search results are successfully retrieved from the API,
        // store those results in the Redux store.
        case MovieActionTypes.GotSearchResults: {
            // Create an immutable copy of state.  This is one of the main rules
            // of a reducer -- it MUST return immutable state.
            // This makes the reducer a `pure` function.
            return Object.assign({}, state, {
                searchResults: action.payload
            } as MovieState);
        }

        // No changes to state need to be made, return the current state.
        default: return state;
    }
}
