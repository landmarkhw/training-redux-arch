# Training - Redux Architecture

This is a multipart training workshop, aimed at teaching you the basic principles of Redux.

We'll be using the following technologies in this workshop:

* Angular 6
* Angular CLI 6
* ngrx/store 6
* ngrx/effects 6

## Presentation

The presentation is provided along with the workshop.  Simply open the `/presentation` folder and run the `run.cmd` file.  The presentation should automatically open at http://localhost:8000.

---------------

## Part 1

1. Clone this project: `git clone https://github.com/landmarkhw/training-redux-arch.git`
1. Checkout the "part1" branch: `git checkout part1`

### How to run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### No Redux, Yet

At this point, the application doesn't have ngrx (an Angular implementation of Redux) installed yet.  It's just a simple Angular application.

### Workshop Tasks

Let's get acquainted with the application.

#### Task 1: Look at `movie-list.component.html`:

Notice a few things:

1. This file is pretty simple (although it's got a few Angular tricks).
1. We're displaying both the movie details and the movie list in the same component.
1. The `app-movie-details` component depends on data from the movie-list component.  This means the movie-list component is responsible to track which movie has been selected.

#### Task 2: Look at `movie-list.component.ts`:

This file is a pretty standard Angular component:

1. Calls the `MovieService` to retrieve search results.
    * NOTE: we don't call themoviedb.org API directly here.  We properly <i>separate the concerns</i> by creating a `MovieService` class that's responsible for interacting with the API.
1. Holds the search results in the `searchResults$` observable variable (more on RxJS Observables in a later training).
1. Holds the selected movie in the `selectedMovie` variable.
1. Sets/clears the `selectedMovie` when a movie is clicked, or when the back button is clicked (respectively).

#### Task 3: Look at `movie.service.ts`:

1. Calls `themoviedb.org`'s API
2. Uses an `api_key` specifically meant for this workshop.

---------------

## Part 2

In Part 2, `ngrx/store` has been added.  Run `git checkout part2` to see the changes to the code.

---------------

## Angular CLI

To get help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
