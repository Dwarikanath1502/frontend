import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import StripecheckoutButton from "react-stripe-checkout"
import { API } from '../backend'
import { createOrder } from './helper/orderHelper'



const Stripecheckout = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token

    const getAmount = () => {
        let amount = 0;
        if (products != undefined && products.length > 0) {
            products.map(p => {
                amount = amount + p.price
            })
        }
        return amount;
    }

    const makePayment = (token) => {
        const body = {
            token,
            products,
        }
        const headers = {
            "Content-Type": "Application/json"
        }
        return fetch(`{API}/stripePayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(res => {
                // call further methods here such as create order clear cart
                console.log(res)
                const { status } = res;
                console.log("STATUS: ", status);
                cartEmpty()
            })
            .catch(err => console.log(err))
    }

    const ShowStripeButton = () => {
        return isAuthenticated() ? (
            <StripecheckoutButton
                stripeKey='pk_test_51NZs7hSB57D7vV47jNJ0RHCabGYdaAxDHDdDw5KJvZrWwbCiYriXxdUOBlnIZuiaalH8ebAyQ60nbyBnhOIfSW8y00xJ14sPLh'
                token={makePayment}
                amount={getAmount() * 100} //stripe works in cents and * 100 will convert it to dollar
                name="Buy Tshirts"
                shippingAddress
                billingAddress
            >
                <button className='btn btn-success'>Pay with Stripe</button>
            </StripecheckoutButton>
        )
            : (
                <Link to="/signn">
                    <button className="btn btn-warning">Signin</button>
                </Link>
            )
    }


    return (
        <div>
            <h3 className='text-white'>Your bill is : {getAmount()}</h3>
            {ShowStripeButton()}
        </div>
    )
}

export default Stripecheckout
