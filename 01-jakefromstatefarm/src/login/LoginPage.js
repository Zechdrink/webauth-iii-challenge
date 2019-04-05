import React from 'react';
import axios from 'axios';



class  LoginPage extends React.Component {
        state = {
            username: "",
            password: ""
        }
    
    render() { 
        return ( 
            <>
            <form onSubmit = {this.submitHandler}>
                <input value = {this.state.username}
                        name = "username"
                        onChange = {this.handleChanges}
                        type = "text"
                        placeholder = "username..."
                        />
                        
            </form>

            <form onSubmit = {this.submitHandler}>
                <input value = {this.state.password}
                        name = "password"
                        onChange = {this.handleChanges}
                        type = "password"
                        placeholder = "password..."
                        />
            </form>

            <button onClick = {this.submitHandler}> Log In </button>
            <button onClick = {this.signOut}> Log Out </button>

            </>
         );
    }

    handleChanges = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        axios 
            .post('http://localhost:5000/api/auth/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/users')

            }).catch(error => {
                console.error('somethun went wrong')
            })
    }

    signOut = event => {
        event.preventDefault();
        window.localStorage.clear();
        this.props.history.push('/login');

    }


}
 
export default LoginPage;