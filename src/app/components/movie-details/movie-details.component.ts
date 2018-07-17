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

    handleClose() {
        this.close.emit(true);
    }
}
