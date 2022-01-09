import React, {useState, useContext, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import {Context} from '../Context';

const CourseDetail = () => {
    const context = useContext(Context);  
    const [course, setCourse] = useState([]);
    const { id } = useParams();
     
    useEffect(() => {
        context.data.getACourse(id)
            .then(data => setCourse(data.course))
            .catch(err => console.log('Error fetching data:', err))
    }, []);

    let userId;
    if (context.authenticatedUser) {
        userId = context.authenticatedUser.id;
    }
        
    return (
    <main>
        <div className="actions--bar">
            <div className="wrap">
                {course.userId === userId? (
                    <React.Fragment>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        <Link className="button" to="#">Delete Course</Link>
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
                            <h4 className="course--name">{course.title} and {course.userId}</h4>
                            {course.User? <p>By {course.User.firstName} {course.User.lastName}</p> : null}
                            <p>{course.description}</p>
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