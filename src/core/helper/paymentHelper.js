import { API } from "../../backend";

// token is NONCE
export const getToken = (userId, token) => {
    return fetch(`${API}/payment/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content_Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

// paymentInfo contains amount client token etc
export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/payment/braintree/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content_Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=> {
        console.log(err)
    })
}