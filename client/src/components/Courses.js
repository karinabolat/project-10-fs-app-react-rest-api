import React, {useState, useContext, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Context} from '../Context';

const Courses = () => {
    // Initializes hooks and retrieves data from context
    const {data} = useContext(Context);
    let navigate = useNavigate();

    // Variable to be kept in state
    const [courses, setCourses] = useState([]);
    
    // Retreives courses
    useEffect(() => {
        data.getCourses()
            .then(data => {
                // if no data, redirects to 'notfound' page
                if (!data) {
                    navigate('/notfound');
                } else {
                    setCourses(data.courses);
                }
            })
            .catch(err => {
                // catches all other errors and redirects to 'error' page
                console.log('Error fetching data:', err);
                navigate('/error');
            })
    }, [data, navigate]);

    return (
    <main>
        <div className="wrap main--grid">
            {courses.map(course => {
                return (
                    <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                )
            })}
            <Link className="course--module course--add--module" to="/courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </Link>
        </div>
    </main>
    );
}

export default Courses;