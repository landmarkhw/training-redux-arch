import { NowPlayingSearchOptions, SearchResult, SearchResults } from "../models/themoviedb";
import { Action, AsyncAction, createAction, createAsyncActions } from "./defs";

/**
 * A list of string constants for each type of action that can be dispatched.
 */
export const MovieActionTypes = {
    Search: AsyncAction("movie/search"),
    Select: Action("movie/select"),
};

/**
 * A collection of action creators for 'movie' actions.
 */
export const MovieActions = {
    /**
     * Searches for movies.
     */
    search: createAsyncActions<NowPlayingSearchOptions, SearchResults>(MovieActionTypes.Search),

    /**
     * Selects a movie.
     */
    select: createAction<SearchResult>(MovieActionTypes.Select),
};
