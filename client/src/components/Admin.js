import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Admin extends Component {
  state = {
    movies: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    fetch('/v1/movies')
      .then((res) => {
        console.log(`Status code is ${res.status}`);
        if (res.status !== '200') {
          let err = Error;
          err.message = 'Invalid response code: ' + res.status;
          this.setState({ error: err });
        }
        return res.json();
      })
      .then((json) => {
        this.setState(
          {
            movies: json.movies,
            isLoaded: true,
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      });
  }

  render() {
    const { movies, isLoaded, error } = this.state;
    if (error) return <p>{error.message}</p>;
    if (!isLoaded) return <p>Loading...</p>;

    return (
      <>
        <h2>Manage Catalogue</h2>
        <div className="list-group">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/admin/movie/${movie.id}`}
              className="list-group-item list-group-item-action"
            >
              {movie.title}
            </Link>
          ))}
        </div>
      </>
    );
  }
}
