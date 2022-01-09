import React, {useState, useContext, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Context} from '../Context';
import ErrorsDisplay from './ValidationErrors';

const UpdateCourse = () => {
    // Initialize hooks and variables to be kept in state
    let navigate = useNavigate();
    const context = useContext(Context);

    const [course, setCourse] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [estimatedTime, setTime] = useState('');
    const [materialsNeeded, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);
    const { id } = useParams();
 
    useEffect(() => {
        context.data.getACourse(id)
            .then(data => {
                setCourse(data.course);
                setTitle(data.course.title);
                setDesc(data.course.description);
                setTime(data.course.estimatedTime);
                setMaterials(data.course.materialsNeeded);
            })
            .catch(err => {
                console.log('Error fetching data:', err);
                navigate('/notfound');
            })
    }, [context.data, id]);

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

    // Update course on submit
    const submit = (event) => {
        event.preventDefault();
        const courseUpdated = {id, title, description, estimatedTime, materialsNeeded};

        context.data.updateCourse(courseUpdated, context.username, context.password)
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
        {course.userId !== context.authenticatedUser.id? navigate('/forbidden') : null }
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