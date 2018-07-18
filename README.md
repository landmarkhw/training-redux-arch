# Training - Redux Architecture

This is a multipart training workshop, aimed at teaching you the basic principles of Redux.

We'll be using the following technologies in this workshop:

* Angular
* Angular CLI
* ngrx/store
* ngrx/effects

## Presentation

The presentation is provided along with the workshop.  Simply open the `/presentation` folder and run the `run.cmd` file.  The presentation should automatically open at http://localhost:8000.

Note that you must have *Python* installed to run the `run.cmd` command.  Alternatively, you can probably just open `index.html` directly to view the presentation.

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

This part is all about *Separation of Concerns* - we begin using the Redux architecture to separate different responsibilties into different areas of the application.

#### Summary of Changes

1. `ngrx/store` has been installed and added to `app.module.ts`
1. `ngrx/store-devtools` has been installed.  This allows you to use [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to watch what's happening in Redux (actions & state).
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
1. An important note: Reducers are [pure functions](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c).
    * Given a set of input data, the same output is returned.
    * Cannot produce side-effects

Being `pure` functions, reducers provide us many guarantees, along with being unit-testable.

#### Task 3: Look at `movie.service.ts`

1 change: instead of returning `this.http.get(...)` directly, we're subscribing to the results and `dispatch`ing an action to the store with the search results.

#### Task 4: Look at `movie-list.component.ts`

1 change: instead of getting `searchResults$` directly from the `movieService`, we are instead retrieving the data from the `store`.  Now the `store` is the "source of truth" for that data.  One problem - we're manually navigating the state in the `store` to find the information we need.  This can create some tightly-coupled situations where the view is tightly-coupled with the shape of state.  In the next part, we'll look at how to address this problem.

---------------

## Part 3

In Part 3, [selectors](https://github.com/ngrx/platform/blob/master/docs/store/selectors.md) have been added to the mix.  Run `git checkout part3` to see the changes to the code.

This part further *separates our concerns* - we address a couple of problems we noticed earlier:

1. Business logic is found in the view
1. Tight coupling of view to the shape of state

#### Summary of Changes

1. `movie.selectors.ts` has been added, in a new folder - `selectors`
1. `movie-list.component.ts` uses the new selector `getSearchResultList`
    * This decouples the view from the shape of the state.  Now, if the shape of state changes, we can simply modify the `getSearchResultList` selector accordingly, and the view is unaffected.
1. `movie-details.component.ts` and `movie-details.component.html` use the new selector `get5StarRating`
    * This moves business logic out of the view and into selectors.

#### Task 1: Look at `movie.selectors.ts`

New file - added 2 selectors
    * `getSearchResultList` - gets a list of movie search results from state
    * `get5StarRating` - gets the 5-star rating for a movie search result

Note that, like reducers, selectors are [pure functions](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c).

As with other `pure` functions, selectors can easily be unit tested when necessary.

#### Task 2: Look at `movie-list.component.ts`

1 change - uses the `getSearchResultList` selector.  Note that it's passed directly to the `select()` function.

#### Task 3: Look at `movie-details.component.ts` and `movie-details.component.html`

2 changes - added `get5StarRating()` method and use it in the html template.

---------------

## Angular CLI

To get help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
