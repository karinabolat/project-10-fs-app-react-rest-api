import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// Creates context
export const Context = React.createContext(); 

export const Provider = (props) => {
  // Creates Data instance
  const data = new Data();

  // Creates cookies
  const cookie1 = Cookies.get('authenticatedUser');
  const cookie2 = Cookies.get('password');

  // Variables to be kept in state
  const [authenticatedUser, setAuthUser] = useState(cookie1? JSON.parse(cookie1) : null);
  const [password, setPass] = useState(cookie2? JSON.parse(cookie2) : null);

 
  // Signs in a user and sets cookies
  const signIn = async (username, password) => {
    const user = await data.getUser(username, password);
    if (user !== null) {
      setAuthUser(user);
      setPass(password);
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
      Cookies.set('password', JSON.stringify(password), {expires: 1});
    }
    
    return user;
  }

  // Signs out a user and removes cookies
  const signOut = () => {
    setAuthUser(null);
    setPass(null);
    Cookies.remove('authenticatedUser');
    Cookies.remove('password');
  }

  return (
    <Context.Provider value={{
      authenticatedUser,
      password,
      data,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </Context.Provider> 
  );
}