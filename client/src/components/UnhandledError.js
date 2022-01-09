import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <main>
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We just encountered an unexpected error.</p>
            <p><Link to="/"><em>Back to Courses</em></Link></p>
        </div>
    </main>
  );
}