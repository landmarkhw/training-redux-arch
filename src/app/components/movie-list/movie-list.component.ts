import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SearchResult, SearchResults } from "../../models/themoviedb";
import { AppState } from "../../reducers";
import { MovieService } from "../../services/movie.service";

@Component({
    selector: "app-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
    searchResults$: Observable<SearchResults>;
    selectedMovie: SearchResult = null;

    constructor(
        private movieService: MovieService,
        private store: Store<AppState>,
    ) {
        // Get the search results from the store -- this means our component
        // is no longer the "source of truth" for the list of movies returned.
        // The store can provide that list of movies to other components, if they need it.
        this.searchResults$ = this.store.select(state => state.movie && state.movie.searchResults);
    }

    handleClick(movie: SearchResult) {
        this.selectedMovie = movie;
    }

    handleClose() {
        this.selectedMovie = null;
    }

    ngOnInit() {
        // Call themoviedb API to get movies playing now
        this.movieService.getNowPlaying(1);
    }
}
