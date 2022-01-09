import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Context} from '../Context';
import ErrorsDisplay from './ValidationErrors';

const CreateCourse = () => {
    let navigate = useNavigate();
    const context = useContext(Context);
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [estimatedTime, setTime] = useState('');
    const [materialsNeeded, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);
 
    const change = (event) => {
        const value = event.target.value;
        console.log(value);
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

    const submit = (event) => {
        event.preventDefault();
        const userId = context.authenticatedUser.id;
        const course = {title, description, estimatedTime, materialsNeeded, userId};

        context.createCourse(course)
            .then(errors => {
                if (errors.length) {
                setErrors(errors);
                }
            })
            .catch((err) => {
                console.log('Something went wrong!', err);
                // navigate('/error');
            });
    }

    const cancel = (event) => {
        event.preventDefault();
        navigate('/');
    }
    
    return (
    <main>
        <div className="wrap">
            <h2>Create Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={submit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" onChange={change} />

                            <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={change} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={change}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} />
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={cancel}>Cancel</button>
                </form>
        </div>
    </main>
    );
}

export default CreateCourse;