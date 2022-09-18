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
            movies: json.genres,
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

    return (
      <>
        <h2>Genres</h2>
        <ul>
          {genres.map((movie) => (
            <li key={movie.id}>
              <Link to={`/genre/${movie.id}`}>{movie.genre_name}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
