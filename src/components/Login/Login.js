import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

    //store user info locally after getting from API
    state = {
        user: ''
    }

    //on mount, request user info from server
    componentDidMount = () => {
        this.getUserInfo();
    }

    //request user info from server and store it in local state
    getUserInfo = () => {
        axios.get('/user').then(response => {
            this.setState({
                user: response.data.user
            })
        }).catch(err => { console.log(err) });
    } //end getUserInfo

    //send dropdown value to API as login value
    //really we're just setting the cookie session value with whatever is in the dropdown
    handleLogin = event => {
        axios.post('/user/login', {username: event.target.value}).then(response => {
            this.getUserInfo();
        }).catch(err => { console.log(err); });
    } // end handleLogin

    render() {
        return (
            <div className="loginForm">
                {/* conditionally render logged in user */}
                {this.state.user ? 'Logged in as ' + this.state.user + " | " : 'Not logged in | '}
                <select onChange={this.handleLogin} >
                    <option value="">Select User</option>
                    <option>Employee</option>
                    <option>Manager</option>
                </select>
            </div>
        );
    } //end render
}

export default Login;