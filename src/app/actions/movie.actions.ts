import { SearchResults, NowPlayingSearchOptions } from "../models/themoviedb";
import { AsyncAction, createAsyncActions } from "./defs";

/**
 * A list of string constants for each type of action that can be dispatched.
 */
export const MovieActionTypes = {
    Search: AsyncAction("movie/search"),
};

/**
 * A collection of action creators for 'movie' actions.
 */
export const MovieActions = {
    /**
     * Searches for movies.
     */
    search: createAsyncActions<NowPlayingSearchOptions, SearchResults>(MovieActionTypes.Search),
};
