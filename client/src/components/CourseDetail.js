import React, {useState, useContext, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {Context} from '../Context';

const CourseDetail = () => {
    // Initializes hooks and retrieves data from context
    const {data, authenticatedUser, password}  = useContext(Context);  
    let navigate = useNavigate();
    const { id } = useParams();

    // Variable to be kept in state
    const [course, setCourse] = useState([]);
    
    // Retrieves a course
    useEffect(() => {       
        data.getACourse(id)
            .then(data => {
                // if no data, redirects to 'notfound' page
                if (!data) {
                    navigate('/notfound');
                } else {
                    setCourse(data.course);
                }
            })
            .catch(err => {
                // catches all other errors and redirects to 'error' page
                console.log('Error fetching data:', err);
                navigate('/error');
            })
    }, [data, id, navigate]);

    // Deletes a course
    const deleteCourse = () => {
        data.deleteCourse(course.id, authenticatedUser.emailAddress, password)
            .then(errors => {
                if (errors.length) {
                    console.log('Something went wrong!', errors);
                    navigate('/error');
                } else {
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log('Something went really wrong!', err);
                navigate('/error');
            })
    }

    return (
    <main>
        <div className="actions--bar">
            <div className="wrap">
                {/* Checks if current authenticated user is the owner of the fetched course */}
                {(authenticatedUser && authenticatedUser.id === course.userId)? (
                    <React.Fragment>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        <Link className="button" to="#" onClick={deleteCourse}>Delete Course</Link>
                    </React.Fragment>
                ) : null}
                <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
        </div>
        <div className="wrap">
            <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            {course.User? <p>By {course.User.firstName} {course.User.lastName}</p> : null}
                            <ReactMarkdown children={course.description} />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown className="course--detail--list" children={course.materialsNeeded} />
                        </div>
                    </div>
                </form>
        </div>
    </main>
    );
}

export default CourseDetail;