import { Component } from 'react';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Alert, Input, Select, TextArea } from './';

export default class EditMovie extends Component {
  state = {
    movie: {},
    isLoaded: false,
    error: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: 0,
        title: '',
        release_date: '',
        runtime: '',
        mpaa_rating: '',
        rating: '',
        description: '',
      },

      mpaaOptions: [
        { id: 'G', value: 'G' },
        { id: 'PG', value: 'PG' },
        { id: 'PG13', value: 'PG13' },
        { id: 'NC17', value: 'NC17' },
        { id: 'R', value: 'R' },
      ],

      isLoaded: false,
      error: null,
      errors: [],
      alert: { type: 'd-none', message: '' },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => ({ movie: { ...prevState.movie, [name]: value } }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];
    if (this.state.movie.title === '') errors.push('title');
    this.setState({ errors: errors });
    if (errors.length > 0) return false;

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    fetch('/v1/admin/editmovie', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        data.error
          ? this.setState({
              alert: { type: 'alert-danger', message: data.error.message },
            })
          : this.props.history.push({ pathname: '/admin' });
      });
  };

  confirmDelete = (e) => {
    confirmAlert({
      title: 'Delete movie?',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            fetch(`/v1/admin/deletemovie/${this.state.movie.id}`, { method: 'DELETE' })
              .then((res) => res.json)
              .then((data) => {
                data.error
                  ? this.setState({
                      alert: { type: 'alert-danger', message: data.error.message },
                    })
                  : this.props.history.push({ pathname: '/admin' });
              }),
        },
        { label: 'No', onClick: () => {} },
      ],
    });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id > 0) {
      fetch(`/v1/movie/${id}`)
        .then((res) => {
          if (res.status !== '200') {
            let err = Error;
            err.message = 'Invalid response code: ' + res.status;
            this.setState({ error: err });
          }
          return res.json();
        })
        .then((json) => {
          const releaseDate = new Date(json.movie.release_date);

          this.setState(
            {
              movie: {
                id,
                title: json.movie.title,
                release_date: releaseDate.toISOString().split('T')[0],
                runtime: json.movie.runtime,
                mpaa_rating: json.movie.mpaa_rating,
                rating: json.movie.rating,
                description: json.movie.description,
              },
              isLoaded: true,
            },
            (error) => this.setState({ isLoaded: true, error })
          );
        });
    } else this.setState({ isLoaded: true });
  }

  render() {
    let { movie, isLoaded, error } = this.state;
    if (error) return <p>{error.message}</p>;
    if (!isLoaded) return <p>Loading...</p>;

    return (
      <>
        <h2>Add/ Edit Movie</h2>

        <Alert
          alertType={this.state.alert.type}
          alertMessage={this.state.alert.message}
        />

        <hr />

        <form onSubmit={this.handleSubmit}>
          <Input
            type="hidden"
            name="id"
            id="id"
            value={movie.id}
            onChange={this.handleChange}
          />
          <Input
            title={'Title'}
            type={'text'}
            name={'title'}
            value={movie.title}
            handleChange={this.handleChange}
            className={this.hasError('title') ? 'is-invalid' : ''}
            errorDiv={this.hasError('title') ? 'text-danger' : 'd-none'}
            errorMsg={'Please enter a title'}
          />
          <Input
            title={'Release Date'}
            type={'date'}
            name={'release_date'}
            value={movie.release_date}
            handleChange={this.handleChange}
          />
          <Input
            title={'Runtime'}
            type={'text'}
            name={'runtime'}
            value={movie.runtime}
            handleChange={this.handleChange}
          />
          <Select
            title={'MPAA Rating'}
            name={'mpaa_rating'}
            placeholder={'Choose'}
            options={this.state.mpaaOptions}
            value={movie.mpaa_rating}
            handleChange={this.handleChange}
          />
          <Input
            title={'Rating'}
            type={'text'}
            name={'rating'}
            value={movie.rating}
            handleChange={this.handleChange}
          />
          <TextArea
            title={'Description'}
            type={'textarea'}
            name={'description'}
            rows="3"
            value={movie.description}
            handleChange={this.handleChange}
          />

          <hr />

          <button className="btn btn-primary">Save</button>
          <Link to="/admin" className="btn btn-warning ms-1">
            Cancel
          </Link>
          {movie.id > 0 && (
            <a
              href="#!"
              onClick={() => this.confirmDelete()}
              className="btn btn-danger ms-1"
            >
              Delete
            </a>
          )}
        </form>
      </>
    );
  }
}
