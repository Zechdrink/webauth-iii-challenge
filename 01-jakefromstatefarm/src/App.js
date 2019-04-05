import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import LoginPage from './login/LoginPage';
import Users from './users/Users';
import Register from './register/Register';

import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <Link to = "/"> Home </Link>
        <Link to="/login"> Login </Link>
        <Link to = "/users"> Users </Link>
        <Link to = "/register"> Register </Link>
      
      </header>
      <main>
        <Route exact path ="/" component = {Home} />
        <Route path ="/login" component = {LoginPage} />
        <Route path ="/users" component = {Users} />
        <Route path ="/register" component = {Register} />
      </main>
      </div>
    );
  }
}

function Home(props) {
  return <h1>Home Component</h1>;
}


export default App;
