import React from 'react';
import axios from 'axios';



class  Register extends React.Component {
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

            <button onClick = {this.Register}> Register </button>
        

            </>
         );
    }

    handleChanges = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    Register = (event) => {
        axios 
            .post('http://localhost:5000/api/auth/register', {
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                console.log('its working');
                this.setState({
                    username: '',
                    password: ''
                })
            }).catch(error => {
                console.error('somethun went wrong')
            })
    }

}
 
export default Register;