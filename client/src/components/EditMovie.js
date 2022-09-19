import { Component } from 'react';

export default class EditMovie extends Component {
  state = {
    movie: {},
    isLoaded: false,
    error: null,
  };

  constructor(props) {
    super(props);
    this.setState({
      movie: {
        id: 0,
        title: '',
        release_date: '',
        mpaa_rating: '',
        rating: '',
        description: '',
      },

      isLoaded: false,
      error: null,
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => ({ movie: { ...prevState.movie, [name]: value } }));
  };

  handleSubmit = (e) => {
    console.log('Form was submitted');
    e.preventDefault();
  };

  componentDidMount() {}

  render() {
    let { movie } = this.state;

    return (
      <>
        <h2>Add/ Edit Movie</h2>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            type="hidden"
            name="id"
            id="id"
            value={movie.id}
            onChange={this.handleChange}
          />

          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={movie.title}
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="runtime" className="form-label fw-bold">
              Release Date
            </label>
            <input
              type="text"
              className="form-control"
              id="release_date"
              name="release_date"
              value={movie.release_date}
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="runtime" className="form-label fw-bold">
              Runtime
            </label>
            <input
              type="text"
              className="form-control"
              id="runtime"
              name="runtime"
              value={movie.runtime}
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mpaa_rating" className="form-label fw-bold">
              MPAA Rating
            </label>
            <select
              className="form-select"
              name="mpaa_rating"
              value={movie.mpaa_rating}
              onChange={this.handleChange}
            >
              <option className="form-select">Choose</option>
              <option className="form-select" value="G">
                G
              </option>
              <option className="form-select" value="PG">
                PG
              </option>
              <option className="form-select" value="PG13">
                PG14
              </option>
              <option className="form-select" value="NC17">
                NC17
              </option>
              <option className="form-select" value="R">
                R
              </option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label fw-bold">
              Rating
            </label>
            <input
              type="text"
              className="form-control"
              id="rating"
              name="rating"
              value={movie.rating}
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={movie.value}
              onChange={this.handleChange}
            />
          </div>

          <hr />

          <button className="btn btn-primary">Save</button>
        </form>

        <div className="mt-3">
          <pre>{JSON.stringify(this.state, null, 3)}</pre>
        </div>
      </>
    );
  }
}
