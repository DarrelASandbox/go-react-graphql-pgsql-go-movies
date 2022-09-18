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
