import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper/index'

// method to appear current tab different
const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72", fontWeight: "bold" }
    } else {
        return { color: "#FFFFFF" }
    }
}

const Menu = ({ history }) => (
    <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
            <Link style={currentTab(history, "/")} className='nav-link' to="/">
                Home
            </Link>
        </li>
        <li className="nav-item">
            <Link style={currentTab(history, "/cart")} className='nav-link' to="/cart">
                Cart
            </Link>
        </li>
        {/* if there is user sho9w user dashboard */}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
                <Link style={currentTab(history, "/user/dashboard")} className='nav-link' to="/user/dashboard">
                    Dashboard
                </Link>
            </li>
        )}
        {
            isAuthenticated() && isAuthenticated().user.role === 1 && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(history, "/user/dashboard")} className='nav-link' to="/user/dashboard">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(history, "/admin/dashboard")} className='nav-link' to="/admin/dashboard">
                            Admin Dashboard
                        </Link>
                    </li>
                </React.Fragment>

            )}
        {/* if user is not authenticated show signin and signup */}
        {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                    <Link style={currentTab(history, "/signup")} className='nav-link' to="/signup">
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/signin")} className='nav-link' to="/signin">
                        Signin
                    </Link>
                </li>
            </Fragment>
        )}
        {/* if user is authenticated show signout */}
        {isAuthenticated() && (
            <li className="nav-item">
                <span
                    className='nav-link text-warning'
                    onClick={() => {
                        signout(() => {
                            history.push("/")
                        })
                    }}
                >
                    Signout
                </span>
            </li>
        )}
    </ul>
)

export default withRouter(Menu)
