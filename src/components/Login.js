import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this._confirm = this._confirm.bind(this);
    this._saveUserData = this._saveUserData.bind(this);

    this.state = {
      login: true,
      email: '',
      password: '',
      name: ''
    };
  }

  async _confirm() {}

  _saveUserData(token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              type="text"
              placeholder="Your name"
              onChange={e => this.setState({ name: e.target.value })}
            />
          )}
          <input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.email })}
            placeholder="Your email address"
          />
          <input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
