import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchResult } from "src/app/models/themoviedb";

@Component({
    selector: "app-movie-details",
    templateUrl: "./movie-details.component.html",
    styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent {
    @Input() movie: SearchResult;
    @Output() close: EventEmitter<any> = new EventEmitter();

    constructor() { }

    /**
     * Returns an array based on the number of stars in the 5-star rating:
     * e.g. [1,2,3,4,5] for a 5-star rating.
     * e.g. [1,2,3] for a 3-star rating.
     */
    get stars() {
        const starCount = Math.floor(this.movie.vote_average / 2);
        return new Array(starCount).fill(0).map(i => i);
    }

    handleClose() {
        this.close.emit(true);
    }
}
