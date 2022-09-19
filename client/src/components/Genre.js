import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Genres extends Component {
  state = {
    movies: [],
    isLoaded: false,
    error: null,
    genreName: '',
  };

  componentDidMount() {
    fetch(`/v1/movies/${this.props.match.params.id}`)
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
            genreName: this.props.location.genreName,
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
    let { movies, isLoaded, error, genreName } = this.state;
    if (!movies) movies = [];
    if (error) return <p>{error.message}</p>;
    if (!isLoaded) return <p>Loading...</p>;

    return (
      <>
        <h2>Genre: {genreName}</h2>
        <div className="list-group">
          {movies.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
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
