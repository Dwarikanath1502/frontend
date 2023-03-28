import { API } from '../../backend'
// API means process.env.REACT_APP_BACKEND

// SIGNUP
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            // we are converting response into json and giving it to frontend
            return response.json();
        })
        .catch(error => console.log(error))
}

// SIGNIN
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            // we are converting response into json and giving it to frontend
            return response.json();
        })
        .catch(error => console.log(error))
}
// it is to keep user logged in because browser don't remember json obj
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

// signout
// for signout I'm just removing JWT frm browser
export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();

        // logout from backend
        return fetch(`${API}/signout`, {
            method: "GET"
        })
            .then(response => console.log("Signout Success!"))
            .catch(err => console.log(err))
    }
}

// if user is authenticated or not
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false; // it means user is not authenticated
    }
    // if we are gettinh window obj
    if (localStorage.getItem("jwt")) {
        // if token is same as user we are looking for
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false;
    }
}