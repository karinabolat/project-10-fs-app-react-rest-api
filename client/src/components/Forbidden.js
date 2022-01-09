import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <main>
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
            <p><Link to="/"><em>Back to Courses</em></Link></p>
        </div>
    </main>
  );
}