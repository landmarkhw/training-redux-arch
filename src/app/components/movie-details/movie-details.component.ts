import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchResult } from "src/app/models/themoviedb";
import { get5StarRating } from "../../selectors/movie.selectors";

@Component({
    selector: "app-movie-details",
    templateUrl: "./movie-details.component.html",
    styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent {
    @Input() movie: SearchResult;
    @Output() close: EventEmitter<any> = new EventEmitter();

    constructor() { }

    get5StarRating() {
        return get5StarRating(this.movie);
    }

    get stars() {
        const rating = get5StarRating(this.movie);
        // Create an array with one element per star
        return new Array(rating).fill(0).map(i => i);
    }

    handleClose() {
        this.close.emit(true);
    }
}
