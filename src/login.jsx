import React from 'react';
import PropTypes from 'prop-types';

import User from './user.jsx';

import './login.scss';

class Login extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      User.loggedIn = true;
      console.log('Submitting...');
      User.name = this.state.value;
      this.props.history.push('/tic-tac-toe');
      event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default Login;
