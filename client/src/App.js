import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

// Import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

// import {withContext, Context} from './Context';
import PrivateRoute from './PrivateRoute';

// Subscribe components to context
// const HeaderWithContext = withContext(Header);
// const UserSignUpWithContext = withContext(UserSignUp);
// const UserSignInWithContext = withContext(UserSignIn);
// const UserSignOutWithContext = withContext(UserSignOut);

// Private
// /courses/create
// /courses/:id/update


// CourseDetail and UpdateCourse components to redirect users to the /notfound 

// UpdateCourse component to redirect users to the /forbidden path if the requested course isn't owned by the authenticated user.

// Throughout your application, redirect users to the /error path when requests to the REST API return a "500 Internal Server Error" HTTP status code.

// On the "Course Detail" screen, add rendering logic so that the "Update Course" and "Delete Course" buttons only display if:
// There's an authenticated user.
// And the authenticated user's ID matches that of the user who owns the course.

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/create" element={<PrivateRoute><CreateCourse /></PrivateRoute>} />
          <Route path="/courses/:id/update" element={<PrivateRoute><UpdateCourse /></PrivateRoute>} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
