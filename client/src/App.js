import { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import {
  Admin,
  EditMovie,
  Genre,
  Genres,
  GraphQL,
  Home,
  Login,
  Movie,
  Movies,
} from './components';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { jwt: '' };

    this.handleJWTChange(this.handleJWTChange.bind(this));
  }

  componentDidMount() {
    let token = window.localStorage.getItem('jwt');
    if (token) {
      if (this.state.jwt === '') {
        this.setState({ jwt: JSON.parse(token) });
      }
    }
  }

  handleJWTChange = (jwt) => {
    this.setState({ jwt });
  };

  logout = () => {
    this.setState({ jwt: '' });
    window.localStorage.removeItem('jwt');
  };

  render() {
    let loginLink;
    if (this.state.jwt === '') loginLink = <Link to="/login">Login</Link>;
    else
      loginLink = (
        <Link to="/logout" onClick={this.logout}>
          Logout
        </Link>
      );

    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              <h1 className="mt-3">Go Watch a Movie!</h1>
            </div>
            <div className="col mt-3 text-end">{loginLink}</div>
            <hr className="mb-3" />
          </div>

          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="/">Home</Link>
                  </li>

                  <li className="list-group-item">
                    <Link to="/movies">Movies</Link>
                  </li>

                  <li className="list-group-item">
                    <Link to="/genres">Genres</Link>
                  </li>

                  {this.state.jwt !== '' && (
                    <>
                      <li className="list-group-item">
                        <Link to="/admin/movie/0">Add Movie</Link>
                      </li>

                      <li className="list-group-item">
                        <Link to="/admin">Manage Catalogue</Link>
                      </li>
                    </>
                  )}

                  <li className="list-group-item">
                    <Link to="/graphql">GraphQL</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-md-10">
              <Switch>
                <Route path="/movies/:id" component={Movie} />

                <Route path="/movies">
                  <Movies />
                </Route>

                <Route path="/genre/:id" component={Genre} />

                <Route exact path="/genres">
                  <Genres />
                </Route>

                <Route
                  exact
                  path="/login"
                  component={(props) => (
                    <Login {...props} handleJWTChange={this.handleJWTChange} />
                  )}
                />

                <Route exact path="/graphql">
                  <GraphQL />
                </Route>

                <Route
                  path="/admin/movie/:id"
                  component={(props) => <EditMovie {...props} jwt={this.state.jwt} />}
                />

                <Route
                  path="/admin"
                  component={(props) => <Admin {...props} jwt={this.state.jwt} />}
                />

                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
