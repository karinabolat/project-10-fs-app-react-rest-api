import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Context} from '../Context';
import ErrorsDisplay from './ValidationErrors';

export default function UserSignIn () {
    // Initializes hooks and retrieves data from context
    const {actions} = useContext(Context);
    let navigate = useNavigate();
    let location = useLocation();
    
    // Variables to be kept in state
    const [emailAddress, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [errors, setErrors] = useState([]);

    // Captures user input
    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
        case "emailAddress":
            setEmail(value);
            break;
        case "password":
            setPass(value);
            break;
        default:
            return;
        }
    }

    // Signs in a user on submit
    const submit = (event) => {
        event.preventDefault();
        const { from } = location.state || { from: { pathname: '/' } };

        actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    setErrors(['Sign-in was unsuccessful. Please provide valid username and password.']);
                } else {
                    navigate(from);
                }
            })
            .catch((err) => {
                // catches all other errors and redirects to 'error' page
                console.log(err);
                navigate('/error');
            });
    }

    const cancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={submit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={change} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={change} />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={cancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
        </main>
    );
}