import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Genres extends Component {
  state = {
    genres: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    fetch('/v1/genres')
      .then((res) => {
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
            genres: json.genres,
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
    const { genres, isLoaded, error } = this.state;
    if (error) return <p>{error.message}</p>;
    if (!isLoaded) return <p>Loading...</p>;

    return (
      <>
        <h2>Genres</h2>
        <div className="list-group">
          {genres.map((movie) => (
            <Link
              key={movie.id}
              to={{
                pathname: `/genre/${movie.id}`,
                genreName: movie.genre_name,
              }}
              className="list-group-item list-group-item-action"
            >
              {movie.genre_name}
            </Link>
          ))}
        </div>
      </>
    );
  }
}
