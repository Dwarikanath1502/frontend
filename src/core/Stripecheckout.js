import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'



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
        products.map(p => {
            amount = amount + p.price
        })
        return amount;
    }

    const ShowStripeButton = () => {
        return isAuthenticated() ? (
            <button className='btn btn-success'>Pay with Stripe</button>
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
