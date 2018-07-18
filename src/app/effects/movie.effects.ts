import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { PayloadAction } from "../actions/defs";
import { MovieActions, MovieActionTypes } from "../actions/movie.actions";
import { NowPlayingSearchOptions } from "../models/themoviedb";
import { MovieService } from "../services/movie.service";

@Injectable()
export class MovieEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        // Listen for the 'Search' movie BEGIN action
        ofType(MovieActionTypes.Search.BEGIN),
        mergeMap((action: PayloadAction<NowPlayingSearchOptions>) =>
            // When someone requests to Search.BEGIN, call the movie API
            // and dispatch either a Search.SUCCESS or Search.FAILURE action,
            // based on the results of the API call.
            this.movieService
                .getNowPlaying(action.payload)
                .pipe(
                    map(searchResults => MovieActions.search.success(searchResults)),
                    catchError(error => of(MovieActions.search.failure(error)))
                )
        )
    );

    constructor(
        private actions$: Actions,
        private movieService: MovieService,
    ) { }
}
