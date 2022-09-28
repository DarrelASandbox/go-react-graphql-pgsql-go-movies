import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from './';

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
      searchTerm: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    let value = e.target.value;
    this.setState({ searchTerm: value }, () => {
      if (value.length > 2) this.performSearch();
      else this.setState({ movies: [] });
    });
  };

  performSearch() {
    const payload = `
    {
      search(titleContains: "${this.state.searchTerm}") {
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

    fetch('/v1/graphql', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        let theList = Object.values(data.data.search);
        return theList;
      })
      .then((theList) => {
        console.log(theList);
        if (theList.length > 0) this.setState({ movies: theList });
        else this.setState({ movies: [] });
      });
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

    fetch('/v1/graphql', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        let theList = Object.values(data.data.list);
        return theList;
      })
      .then((theList) => this.setState({ movies: theList }));
  }

  render() {
    let { movies } = this.state;

    return (
      <>
        <h2>GraphQL</h2>
        <hr />

        <Input
          title={'Search'}
          type={'text'}
          name={'search'}
          value={this.state.searchTerm}
          handleChange={this.handleChange}
        />

        <div className="list-group">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/moviesgraphql/${movie.id}`}
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
