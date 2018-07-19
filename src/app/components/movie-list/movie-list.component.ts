import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { MovieActions } from "../../actions/movie.actions";
import { SearchResult } from "../../models/themoviedb";
import { AppState } from "../../reducers";
import { getSearchResultList, getSelectedMovie } from "../../selectors/movie.selectors";

@Component({
    selector: "app-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
    searchResults$: Observable<SearchResult[]>;
    selectedMovie$: Observable<SearchResult>;

    constructor(
        private store: Store<AppState>,
    ) {
        // Get the search results from the store -- this means our component
        // is no longer the "source of truth" for the list of movies returned.
        // The store can provide that list of movies to other components, if they need it.
        this.searchResults$ = this.store.select(getSearchResultList);

        // Get the selected movie from the store.
        this.selectedMovie$ = this.store.select(getSelectedMovie);
    }

    handleClick(movie: SearchResult) {
        this.store.dispatch(MovieActions.select(movie));
    }

    handleClose() {
        this.store.dispatch(MovieActions.select(null));
    }

    ngOnInit() {
        // NOTE: instead of calling the API directly here, we now dispatch
        // an action to perform the search.
        this.store.dispatch(MovieActions.search.begin({ page: "1" }));
    }
}
