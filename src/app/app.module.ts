import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./components/app.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { reducers } from "./reducers";
import { MovieService } from "./services/movie.service";
@NgModule({
    declarations: [
        AppComponent,
        MovieDetailsComponent,
        MovieListComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument(),
    ],
    providers: [
        MovieService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
