import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'
import { signup } from '../auth/helper/index'

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    // destructuring
    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }
    // event = onclick
    const onSumit = event => {
        event.preventDefault();
        setValues({ ...values, error: false })
        // it will fire request to backend and gives res
        signup({ name, email, password })
            .then(data => {
                if (data && data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        password: "",
                        email: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(err => console.log(err))
    }


    const SignupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light"> Name</label>
                            <input className='form-control' type="text" onChange={handleChange("name")} values={name} />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Email</label>
                            <input className='form-control' type="email" onChange={handleChange("email")} values={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Password</label>
                            <input className='form-control' type="password" onChange={handleChange("password")} values={password} />
                        </div>
                        <button className="btn btn-lg btn-success mt-2" onClick={onSumit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="alert alert-success"
                    style={{ display: success ? "" : "none" }}
                >
                    New account created. Please{" "} <Link to="/signin">Login here</Link>
                </div>
            </div >

        )
    }
    const errorMessage = () => {
        return (
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
            </div >

        )
    }


    return (
        <Base title='sign up page' description='A page for user to sign up!'>
            {successMessage()}
            {errorMessage()}
            {SignupForm()}

            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup
