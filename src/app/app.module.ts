import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./components/app.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieService } from "./services/movie.service";

@NgModule({
    declarations: [
        AppComponent,
        MovieListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
    ],
    providers: [
        MovieService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
