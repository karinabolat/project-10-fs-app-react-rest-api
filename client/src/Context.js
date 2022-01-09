import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext(); 

export const Provider = (props) => {
  
  const data = new Data();
  const cookie = Cookies.get('authenticatedUser');

  // Variables to be kept in state
  const [authenticatedUser, setAuthUser] = useState(cookie? JSON.parse(cookie) : null);
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');

  // Methods
  const signIn = async (username, password) => {
    setUsername(username);
    setPass(password);
     
    const user = await data.getUser(username, password);
    
    if (user !== null) {
      setAuthUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  const signOut = () => {
    setAuthUser(null);
    setUsername(null);
    setPass(null);
    Cookies.remove('authenticatedUser');
  }

  return (
    <Context.Provider value={{
      authenticatedUser,
      data,
      username,
      password,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </Context.Provider> 
  );
}