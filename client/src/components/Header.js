import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {Context} from '../Context';

const Header = () => {
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  console.log('Header from', authUser);
 
  return (
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
            <nav>
              {authUser? (
                <ul className="header--signedin">
                  <li>Welcome, {authUser.firstName}!</li>
                  <li><Link to="/signout">Sign Out</Link></li>
                </ul>
              ) : (
                <ul className="header--signedout">
                  <li><Link to="/signup">Sign Up</Link></li>
                  <li><Link to="/signin">Sign In</Link></li> 
                </ul>
              )}
            </nav>
        </div>
    </header>
  );
}

export default Header;