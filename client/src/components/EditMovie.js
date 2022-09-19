import { Component } from 'react';

import { Input, Select, TextArea } from './';

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
    };

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
          />
          <Input
            title={'Release Date'}
            type={'text'}
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
        </form>

        <div className="mt-3">
          <pre>{JSON.stringify(this.state, null, 3)}</pre>
        </div>
      </>
    );
  }
}
