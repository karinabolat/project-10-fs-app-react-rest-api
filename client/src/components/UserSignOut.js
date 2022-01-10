import React, {useContext, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import {Context} from '../Context';

const SignOut = () => {
  const {actions} = useContext(Context);
  // Signs out a user
  useEffect(() =>  actions.signOut());

  return (
    <Navigate to="/" />
  );
}

export default SignOut;