import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext(); 

export const Provider = (props) => {
  
  const data = new Data();
  const cookie = Cookies.get('authenticatedUser');
  const [authenticatedUser, setAuthUser] = useState(cookie? JSON.parse(cookie) : null);

  const signIn = async (username, password) => {
    const user = await data.getUser(username, password);
    
    if (user !== null) {
      setAuthUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove('authenticatedUser');
  }

  const createCourse = async (course) => {
    const username = authenticatedUser.emailAddress;
    const password = authenticatedUser.password;
    return await data.postCourse(course, {username, password});
  }

  return (
    <Context.Provider value={{
      authenticatedUser,
      data,
      createCourse,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </Context.Provider> 
  );
}

// export class Provider extends Component {

//   state = {
//     authenticatedUser: null,
//     message: 'null Auth user'
//   }

//   constructor() {
//     super();
//     this.data = new Data();
//     // this.cookie = Cookies.get('authenticatedUser'); this.cookie? JSON.parse(this.cookie) :
    
//   }

  
//   render() {
//     const { authenticatedUser } = this.state;
//     const { message } = this.state;
//     const value = {
//       authenticatedUser,
//       message,
//       data: this.data,
//       actions: {
//         signIn: this.signIn,
//         signOut: this.signOut
//       },
//     };
//     return (
//       <Context.Provider value={value}>
//         {this.props.children}
//       </Context.Provider>  
//     );
//   }

//   signIn = async (username, password) => {
//     console.log('context!!!')
//     const user = await this.data.getUser(username, password);
//     this.setState(() => { this.state =
//       {
//         authenticatedUser: user,
//         message: 'saved user success'
//       };
//     });
//     // if (user !== null) {
//     //   this.setState(() => {
//     //     return {
//     //       authenticatedUser: user,
//     //       message: 'saved user success'
//     //     };
//     //   });
      
//     //   // Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
//     // }
//     return user;
//   }

//   signOut = () => {
//     this.setState({ authenticatedUser: null });
//     // Cookies.remove('authenticatedUser');
//   }
// }

// export const Consumer = Context.Consumer;

// /**
//  * A higher-order component that wraps the provided component in a Context Consumer component.
//  * @param {class} Component - A React component.
//  * @returns {function} A higher-order component.
//  */

//  export function withContext(Component) {
//   return function ContextComponent(props) {
//     return (
//       <Context.Consumer>
//         {context => <Component {...props} context={context} />}
//       </Context.Consumer>
//     );
//   }
// }

// export default {Context, Provider}