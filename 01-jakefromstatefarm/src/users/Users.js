import React from 'react';
import axios from 'axios';

import Auth from '../auth/auth';

class Users extends React.Component {
  state = {
    users: [],
  };

  render() {
    return (
      <>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <h2 key={u.id}>{u.username}</h2>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/users', { 
        headers: {
        Authorization: token
      }})
      .then(res => {
        console.log(res);
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.error('USERS ERROR', error);
      });
  }
}

export default Auth(Users);
