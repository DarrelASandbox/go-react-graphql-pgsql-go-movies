import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Movies extends Component {
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
        <h2>Choose a movie</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
