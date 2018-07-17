import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SearchResults, SearchResult } from "../../models/themoviedb";
import { MovieService } from "../../services/movie.service";

@Component({
    selector: "app-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
    searchResults$: Observable<SearchResults>;
    selectedMovie: SearchResult;

    constructor(
        private movieService: MovieService,
    ) {}

    handleClick(movie: SearchResult) {
        this.selectedMovie = movie;
    }

    handleClose() {
        this.selectedMovie = null;
    }

    ngOnInit() {
        this.searchResults$ = this.movieService.getNowPlaying(1);
    }
}
