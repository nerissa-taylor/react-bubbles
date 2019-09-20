import React from 'react';
import axiosWithAuth from '../components/axiosWithAuth'

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/protected');
      })
      .catch(err => console.log(err));
  };
  render() {

    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <p>Build a login page here</p>
        <form onSubmit={this.login}>
          <input type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange} />
          <input type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange} />
          <button>Log in</button>

        </form>
      </div>
    );


  }
}
export default Login;