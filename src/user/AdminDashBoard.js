import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className='list-group'>
                    <li className="list-group-item">
                        <Link className='nav-link text-success text-justify' to='/admin/create/categories'>Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link text-success text-justify' to='/admin/category'>Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link text-success text-justify' to='/admin/create/products'>Create Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link text-success text-justify' to='/admin/orders'>Manage Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link text-success text-justify' to='/admin/products'>Manage Products</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className='card-header'>Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge text-success badge-info mr-2">Name: </span>{name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-info text-success mr-2">E-mail: </span>{email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-info text-success mr-2">Role: </span>{role}
                    </li>
                    <li className="list-group-item">
                        <span className="badge-danger text-danger">Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }






    return (
        <Base title="Welcome to admin area"
            description='Manage all your products!'
            className='container bg-success p-4'
        >

            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>


        </Base>
    )
}

export default AdminDashboard
