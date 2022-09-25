package main

import (
	"context"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) wrap(next http.Handler) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		// pass httprouter.Params to request context
		ctx := context.WithValue(r.Context(), "params", ps)
		// call next middleware with new context
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func (app *application) routes() http.Handler {
	router := httprouter.New()
	secure := alice.New(app.checkToken)

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodPost, "/v1/graphql", app.moviesGraphQL)

	router.HandlerFunc(http.MethodPost, "/v1/signin", app.Signin)

	router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getMovie)
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)
	router.HandlerFunc(http.MethodGet, "/v1/movies/:genre_id", app.getAllMoviesByGenre)
	router.HandlerFunc(http.MethodGet, "/v1/genres", app.getAllGenres)

	// router.HandlerFunc(http.MethodPost, "/v1/admin/editmovie", app.editMovie) // Insert & Update movie
	router.POST("/v1/admin/editmovie", app.wrap(secure.ThenFunc(app.editMovie)))

	// router.HandlerFunc(http.MethodDelete, "/v1/admin/deletemovie/:id", app.deleteMovie)
	// @TODO: Fix bug `:id`, movie-handlers.go` ln 157:
	// params := httprouter.ParamsFromContext(r.Context())
	router.DELETE("/v1/admin/deletemovie/:id", app.wrap(secure.ThenFunc(app.deleteMovie)))

	return app.enableCORS(router)
}
