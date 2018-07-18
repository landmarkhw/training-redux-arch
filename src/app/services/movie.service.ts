import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NowPlayingSearchOptions, SearchResults } from "../models/themoviedb";

const api_key = "431a59ce91710d2d84564d46c0e65729";
const baseUrl = "https://api.themoviedb.org/3";

@Injectable({
    providedIn: "root"
})
export class MovieService {
    constructor(private http: HttpClient) { }

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

        return this.http.get<SearchResults>(this.url("movie/now_playing"), { params });
    }
}
