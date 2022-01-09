import React, {useState, useContext, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {Context} from '../Context';

const CourseDetail = () => {
    // Initialize hooks and variables to be kept in state
    const context = useContext(Context);  
    let navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        context.data.getACourse(id)
            .then(data => setCourse(data.course))
            .catch(err => {
                console.log('Error fetching data:', err);
                navigate('/notfound');
            })
    }, [context.data, id]);

    // Stores current authenticated user's id
    let userId;
    if (context.authenticatedUser) {
        userId = context.authenticatedUser.id;
    }

    const deleteCourse = () => {
        context.data.deleteCourse(course, context.username, context.password)
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
                {/* Checks if current authenticated user is the owner of fetched course */}
                {course.userId === userId? (
                    <React.Fragment>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        <Link className="button" to='/' onClick={deleteCourse}>Delete Course</Link>
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
// <ul className="course--detail--list">