import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { MovieActions } from "../actions/movie.actions";
import { NowPlayingSearchOptions, SearchResults } from "../models/themoviedb";
import { AppState } from "../reducers";

const api_key = "431a59ce91710d2d84564d46c0e65729";
const baseUrl = "https://api.themoviedb.org/3";

@Injectable({
    providedIn: "root"
})
export class MovieService {
    constructor(
        private http: HttpClient,
        private store: Store<AppState>,
    ) { }

    private url(url) {
        return `${baseUrl}/${url}`;
    }

    /**
     * Returns an observable of movies that are now playing.
     */
    getNowPlaying(page: number) {
        const params: NowPlayingSearchOptions = {
            api_key,
            include_adult: "false",
            page: `${page || 0}`,
        };

        this.http
            .get<SearchResults>(this.url("movie/now_playing"), { params })
            .subscribe(searchResults => {
                // Whenever search results are retrieved, dispatch an action
                // that notifies others of the search results.
                this.store.dispatch(MovieActions.gotSearchResults(searchResults));
            });
    }
}
