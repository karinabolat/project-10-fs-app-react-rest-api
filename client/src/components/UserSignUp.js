import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Context} from '../Context';
import ErrorsDisplay from './ValidationErrors';

export default function UserSignUp () {
    // Initialize hooks and variables to be kept in state
    let navigate = useNavigate();
    const context = useContext(Context);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [errors, setErrors] = useState([]);

    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
        case "firstName":
            setFirstName(value);
            break;
        case "lastName":
            setLastName(value);
            break;
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

    const submit = (event) => {
        event.preventDefault();

        const user = {
        firstName,
        lastName,
        emailAddress,
        password,
        };

    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          context.actions.signIn(user.emailAddress, user.password)
            .then(() => {
                navigate('/');
                console.log('success sign up!')   
            });
        }
      })
      .catch((err) => {
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
                <h2>Sign Up</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={submit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" onChange={change}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" onChange={change}/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={change} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={change} />
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={cancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    );
}