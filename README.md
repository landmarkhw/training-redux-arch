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
1. Uses an `api_key` specifically meant for this workshop.

#### Task 4: Look at `movie-details-component.html`:

Notice that there's business logic here: `{{movie.vote_average / 2 }}`
We want to display the movie rating as a 5-star rating, whereas the data is based on a 1-10 rating.  This business logic is currently happening directly in the view (hint: not good).

---------------

## Part 2

In Part 2, `ngrx/store` has been added.  Run `git checkout part2` to see the changes to the code.

This part is all about <em>Separation of Concerns</em> - we begin using the Redux architecture to separate different responsibilties into different areas of the application.

#### Summary

1. `ngrx/store` has been installed and added to `app.module.ts`
1. `movie.actions.ts` has been added, in a new folder - `actions`
1. `movie.reducers.ts` has been added, in a new folder - `reducers`
1. `movie.service.ts` now dispatches (e.g. publishes) the `GotSearchResults` action, which is reduced (saved) to state in the `movieReducer`.
1. `movie-list.component.ts` now gets its search results by `select`ing (retrieving) it from the Redux store.

### Workshop Tasks

#### Task 1: Look at `movie.actions.ts`

1. This file is in a new folder - `actions`.  This helps us organize the different parts of the application that have different responsibilities.
1. This file defines the actions that are available for the `movie` area of the application (which is currently the whole app).
1. The `MovieActionTypes` object is simply a collection of string constants that are used to uniqueqly identify each action.
1. The `GotSearchResultsAction` is a TypeScript definition of the one action we have - `GotSearchResults`
1. The `MovieActions` object is a collection of action creators that are used to create actions when they occur.
    * Note that actions in Redux are just plain old JavaScript objects.  They have a `type`, which is a string constant that identifies what kind of action it is, and they have a `payload`, which is the data associated with the action.

#### Task 2: Look at `movie.reducer.ts`

1. This file is in a new folder - 'reducers'.  This helps us group all our reducers in one area.
1. This file does 2 things:
    * Defines the shape of state for the `movie` area of the application (again, currently the whole app).
    * Defines a `reducer`, which is a function that, given the current `state` of the application and an `action` that's happening in the store, returns a new `state`.
1. Reducers are commonly built with a `switch` statement - they only respond to the actions that affect this part of the application's state.
    * In this case, the reducer is reacting to the `MovieActionTypes.GotSearchResults` action, by saving the data from the API call into state.
1. You'll also notice that the reducer defines the `defaultState` of that area of the application.  This is what the state looks like before any changes are made.

#### Task 3: Look at `movie.service.ts`

1 change: instead of returning `this.http.get(...)` directly, we're subscribing to the results and `dispatch`ing an action to the store with the search results.

#### Task 4: Look at `movie-list.component.ts`

1 change: instead of getting `searchResults$` directly from the `movieService`, we are instead retrieving the data from the `store`.  Now the `store` is the "source of truth" for that data.

---------------

## Angular CLI

To get help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
