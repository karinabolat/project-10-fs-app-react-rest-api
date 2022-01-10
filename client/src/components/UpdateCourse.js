import React, {useState, useContext, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Context} from '../Context';
import ErrorsDisplay from './ValidationErrors';

const UpdateCourse = () => {
    // Initializes hooks and retrieves data from context
    let navigate = useNavigate();
    const {data, authenticatedUser, password} = useContext(Context);
    const { id } = useParams();
    
    // Variables to be kept in state
    const [course, setCourse] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [estimatedTime, setTime] = useState('');
    const [materialsNeeded, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);
    
    // Retrieves a course to update
    useEffect(() => {
        data.getACourse(id)
        .then(data => {
            // if no data, redirects to 'notfound' page
            if (!data) {
                navigate('/notfound');
            // if current authenticated user is not the owner of the fetched course, redirects to 'forbidden' page
            } else if (data.course.userId !== authenticatedUser.id) {
                navigate('/forbidden');
            } else {
                setCourse(data.course);
                setTitle(data.course.title);
                setDesc(data.course.description);
                setTime(data.course.estimatedTime);
                setMaterials(data.course.materialsNeeded);
            }      
        })
        .catch(err => {
            // catches all other errors and redirects to 'error' page
            console.log('Error fetching data:', err);
            navigate('/error');
        })
    }, [data, id, navigate, authenticatedUser.id]);

    // Captures user input
    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case "courseTitle":
            setTitle(value);
            break;
            case "courseDescription":
            setDesc(value);
            break;
            case "estimatedTime":
            setTime(value);
            break;
            case "materialsNeeded":
            setMaterials(value);
            break;
            default:
            return;
        }
    }

    // Updates course on submit
    const submit = (event) => {
        event.preventDefault();
        const courseUpdated = {id, title, description, estimatedTime, materialsNeeded};
        data.updateCourse(courseUpdated, authenticatedUser.emailAddress, password)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/error');
            });
    }

    const cancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
    <main>
        <div className="wrap">
            <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={submit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={change} />

                            {course.User? <p>By {course.User.firstName} {course.User.lastName}</p> : null}

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={change} value={description} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} value={materialsNeeded} />
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={cancel}>Cancel</button>
                </form>
        </div>
    </main>
    );
}

export default UpdateCourse;