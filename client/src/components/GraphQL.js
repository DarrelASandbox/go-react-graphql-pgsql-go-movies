import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GraphQL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoaded: false,
      error: null,
      alert: {
        type: 'd-none',
        message: '',
      },
    };
  }

  componentDidMount() {
    // graphql query to backend
    const payload = `
    {
      list {
        id
        title
        runtime
        year
        description
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

    fetch('/v1/graphql/list', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        let theList = Object.values(data.data.list);
        return theList;
      })
      .then((theList) => {
        console.log(theList);
        this.setState({ movies: theList });
      });
  }

  render() {
    let { movies } = this.state;

    return (
      <>
        <h2>GraphQL</h2>
        <hr />
        <div className="list-group">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="list-group-item list-group-item-action"
            >
              <strong>{movie.title}</strong>
              <small className="text-muted">
                ({movie.year} - {movie.runtime} minutes)
              </small>
              <br />
              {movie.description.slice(0, 130)}...
            </Link>
          ))}
        </div>
      </>
    );
  }
}
