import { InjectionToken } from "@angular/core";
import { ActionReducerMap } from "@ngrx/store";
import { movieReducer, MovieState } from "./movie.reducer";

/**
 * The shape of the state for the application.
 */
export interface AppState {
    /**
     * Movie-related state.
     */
    movie: MovieState;
}

/**
 * A list of reducers in the application.
 * Note that this follows the "shape" of the applicaiton state
 * defined in `AppState`.
 */
export const reducers = {
    movie: movieReducer,
};
