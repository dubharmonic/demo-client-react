import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

class PersonView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
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
        this.setState({ isReady: true });
      });
  }

  render() {
    return (
      <div>
        {this.state.isReady && (
          <div>
            {this.state.error && (
              <div className="alert alert-danger" role="alert">
                {this.state.error}
              </div>
            )}
            {!this.state.error && (
              <div>
                <p>ID: {this.state.id}</p>
                <p>First name: {this.state.firstName}</p>
                <p>Last name: {this.state.lastName}</p>
                <p>Created: {moment(this.state.createdAt).format('LLL')}</p>
                <p>Updated: {moment(this.state.cupdatedAt).format('LLL')}</p>
                <p>
                  <Link className="btn btn-primary" to={`/person/${this.state.id}/edit`}>
                    Edit
                  </Link>
                </p>
                <p>
                  <Link className="btn btn-primary" to="/">
                    Person List
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

PersonView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default PersonView;
