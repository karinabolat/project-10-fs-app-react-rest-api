import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <main>
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <p><Link to="/"><em>Back to Courses</em></Link></p>
        </div>
    </main>
  );
}