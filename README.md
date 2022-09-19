## About The Project

- Working with React and Go (Golang)
- Learn how to build a single page application in React, with data supplied by a Go back end REST API
- [Trevor Sawler](https://github.com/tsawler)
- go-movies
  - Providing and consuming **GraphQL** services in **React** and **GO** with **PostgreSQL**
  - Securing parts of our site with **JWT**

&nbsp;

---

&nbsp;

## Notes

- [React Lifecycle Methods Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [Go Package - httprouter](https://github.com/julienschmidt/httprouter)
- [Go Package - pq](https://github.com/lib/pq)
- [PostgreSQL - format specifiers](https://www.postgresql.org/docs/14/ecpg-pgtypes.html)

```sh
# Check user info
\conninfo

# Login as root
psql go_movies

# Login to u1
psql go_movies -U u1


# In the folder containing go_movies.sql
psql -d go_movies -f go_movies.sql

# Go postgres driver
go get github.com/lib/pq@v1.10.0
```

```sql
-- Check users
\du

-- List of DB user has access to
\l

-- Create user (Ensure that you're in the correct db!)
CREATE ROLE u1 with LOGIN PASSWORD 'password';
ALTER ROLE u1 CREATEDB;
GRANT CONNECT ON DATABASE go_movies TO u1;

-- GRANT using root account
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO u1;

-- Create DB
CREATE DATABASE go_movies;

```

&nbsp;

---

&nbsp;

> **Cozma:** I do not really understand what is the flag package used for.

> **Trevor:** It allows us to pass command line [flags](https://pkg.go.dev/flag) to the final binary. For example, something like this:
>
> `var portFlag = flag.Int("port", 8080, "the port to listen on")`
>
> Allows us to do something like this when we start the finished program from the command line: `mybinary -port 8081`
> In other words, we can set the value of a variable from the command line, when the program starts.

&nbsp;

---

&nbsp;

> **Fabian:** Why do we use a pointer when creating/instantiating a struct? (e.g. `app := &application`)

> **Trevor: Pointers are used for efficiency.**
>
> So let me deal with your two examples one at a time, but let me give a bit of context first.
>
> **In Go, everything is passed by value.** Pointers let us pass an address where data is held instead of passing the data's value. **Passing the address where the data is stored** means passing much smaller amounts of data than passing a copy of the data itself As an analogy, Imagine if you need to pay a bill that is $10,000. If you had to carry the cash to pay it, you would probably need a container of some sort. If, instead, you carried a bank draft (or a cheque) that pointed to the bank account where that money is stored, you could carry that in one hand. That's the first argument/use case for pointers.
>
> **Pointers also allow us to avoid changing data unintentionally**, and so we can access an actual value in another function and not just a copy of it when we want to mutate it . This is the second argument/use case for pointers.

> You ask about these two cases:

```go
	app := &application{
		config: cfg,
		logger: logger,
	}
```

> and this one, for http:

```go
	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
```

> For the first one, &application, the second use case applies. For the second one, with the code as it exists now, you are correct. However, in a lot of cases (but not in this course), I would hand srv off to its own function (and go routine), and handle graceful shutdown and that sort of thing in that function. Passing srv as a reference would be more efficient in that case.

&nbsp;

---

&nbsp;
