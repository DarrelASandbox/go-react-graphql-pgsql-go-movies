import { Component } from 'react';

export default class GraphQLMovie extends Component {
  state = { movie: {}, isLoaded: false, error: null };

  componentDidMount() {
    // graphql query to backend
    const payload = `
    {
      movie(id: ${this.props.match.params.id}) {
        id
        title
        runtime
        year
        description
        release_date
        rating
        mpaa_rating
        poster
      }
    }
    `;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      body: payload,
      headers,
    };

    fetch('/v1/graphql', requestOptions)
      .then((res) => res.json())
      .then((data) => this.setState({ movie: data.data.movie, isLoaded: true }));
  }

  render() {
    const { movie, isLoaded, error } = this.state;

    if (movie.genres) movie.genres = Object.values(movie.genres);
    else movie.genres = [];

    if (error) return <p>{error.message}</p>;
    if (!isLoaded) return <p>Loading...</p>;

    return (
      <>
        <h2>Movie: {movie.title}</h2>

        {movie.poster !== '' && (
          <div>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster}`} alt="poster" />
          </div>
        )}

        <div className="float-start">
          <small>Rating: {movie.mpaa_rating}</small>
        </div>

        <div className="float-end">
          {movie.genres.map((m, index) => (
            <span className="badge bg-secondary me-1" key={index}>
              {m}
            </span>
          ))}
        </div>

        <div className="clearfix"></div>
        <hr />

        <table className="table table-compact table-striped">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <strong>Title:</strong>
              </td>
              <td>{movie.title}</td>
            </tr>

            <tr>
              <td>
                <strong>Description:</strong>
              </td>
              <td>{movie.description}</td>
            </tr>

            <tr>
              <td>
                <strong>Runtime:</strong>
              </td>
              <td>{movie.runtime} minutes</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
