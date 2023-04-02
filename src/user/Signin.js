import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Base from '../core/Base'
import { signin, authenticate, isAuthenticated } from '../auth/helper'

const Signin = () => {

    const [values, setValues] = useState({
        email: "p@dn.com",
        password: "12345",
        error: "",
        loding: false,
        didRedirect: false
    })
    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated;

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if ( data.error) {
                    setValues({ ...values, error: data.error, loading: false })

                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(console.log("Signin request failed"))
    }
// TODO: do redirect here
    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to = '/admin/dashboard' />
            } else {
                return  <Redirect to = '/user/dashboard' />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            // right is component so , if loading true the component will run
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )

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


    const SigninForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-light"> Email</label>
                            <input className='form-control' type="email" value={email} onChange={handleChange("email")} />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Password</label>
                            <input className='form-control' type="password" value={password} onChange={handleChange("password")} />
                        </div>
                        <button className="btn btn-lg btn-success mt-2" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title='sign in page' description='A page for user to sign in!'>
            {errorMessage()}
            {loadingMessage()}
            {SigninForm()}
            {performRedirect()}
            <p className='text-white text-center'>{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin
