import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { Component } from 'react';

class PersonCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8081/people')
      .then(response => {
        this.setState({ people: response.data });
        this.setState({ isReady: true });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <div>
        {this.state.isReady && (
          <div>
            <h2>Person Collection</h2>
            <p>{this.state.error}</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody>
                {this.state.people.map(person => (
                  <tr key={person.id}>
                    <td>{person.id}</td>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>
                      <Link className="btn btn-primary" to={`/person/${person.id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default PersonCollection;
