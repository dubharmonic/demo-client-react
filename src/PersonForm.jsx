import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

class PersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8081/people/${this.props.match.params.id}`)
      .then(response => {
        this.setState(response.data);
        this.setState({ isReady: true });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    return axios
      .put(`http://localhost:8081/people/${this.props.match.params.id}`, this.state)
      .then(() => this.props.history.push('/'))
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  render() {
    return (
      <div>
        {this.state.isReady && (
          <form onSubmit={this.handleSubmit}>
            {this.state.error && (
              <div className="alert alert-danger" role="alert">
                {this.state.error}
              </div>
            )}
            {!this.state.error && (
              <div>
                <p>
                  <label htmlFor="firstName">
                    First Name:
                    <input
                      id="firstName"
                      name="firstName"
                      onChange={this.handleChange}
                      type="text"
                      value={this.state.firstName}
                    />
                  </label>
                </p>
                <p>
                  <label htmlFor="lastName">
                    Last Name:
                    <input
                      id="lastName"
                      name="lastName"
                      onChange={this.handleChange}
                      type="text"
                      value={this.state.lastName}
                    />
                  </label>
                </p>
                <p>
                  <input className="btn btn-primary" type="submit" value="Submit" />
                </p>
                <p>
                  <Link className="btn btn-primary" to={`/person/${this.state.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-primary" to="/">
                    Person List
                  </Link>
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    );
  }
}

PersonForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default PersonForm;
