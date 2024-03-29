import React, { useState } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { createCategory } from './helper/adminapicall'

// FIXME: success and error message not showng up
const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    // destructuring
    const { user, token } = isAuthenticated();
    // method to go back to home
    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className='btn btn-sm btn-success mb-3 ' to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }

    const handleChange = (event) => {

        setError("");
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setError("");
        setSuccess(false);

        // backend request
        // we JSON.strngified object so call name as obj
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setError("")
                    setSuccess(true);
                    setName("");
                }
            })

    }

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">{name} category created successfully!</h4>

        }
    }

    const errorMessage = () => {
        if (error) {
            return <h4 className="text-success">Failed to create category!</h4>

        }
    }



    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category! </p>
                <input
                    type='text'
                    className='form-control my-3'
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder='For ex: Summer'
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>
    )


    return (
        <Base title='Create a category here!'
            description='Add a new category'
            className='container bg-info p-4'
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">

                    {myCategoryForm()}
                    {successMessage()}
                    {errorMessage()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
