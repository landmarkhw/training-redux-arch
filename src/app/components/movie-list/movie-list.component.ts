import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { MovieActions } from "../../actions/movie.actions";
import { SearchResult } from "../../models/themoviedb";
import { AppState } from "../../reducers";
import { getSearchResultList } from "../../selectors/movie.selectors";

@Component({
    selector: "app-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
    searchResults$: Observable<SearchResult[]>;
    selectedMovie: SearchResult = null;

    constructor(
        private store: Store<AppState>,
    ) {
        // Get the search results from the store -- this means our component
        // is no longer the "source of truth" for the list of movies returned.
        // The store can provide that list of movies to other components, if they need it.
        this.searchResults$ = this.store.select(getSearchResultList);
    }

    handleClick(movie: SearchResult) {
        this.selectedMovie = movie;
    }

    handleClose() {
        this.selectedMovie = null;
    }

    ngOnInit() {
        // NOTE: instead of calling the API directly here, we now dispatch
        // an action to perform the search.
        this.store.dispatch(MovieActions.search.begin({ page: "1" }));
    }
}
