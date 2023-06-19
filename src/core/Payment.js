import React, { useState, useEffect } from 'react'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import { getToken, processPayment } from './helper/paymentHelper'
import { createOrder } from './helper/orderHelper'
import { isAuthenticated } from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'


const Payment = ({ products, setReload = f => f, reload = undefined }) => {

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  })

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token

  const getMeToken = (userId, token) => {
    getToken(userId, token)
      .then((info) => {
        console.log("Information", info);
        if (info.error) {
          setInfo({ ...info, error: info.error })
        } else {
          const clientToken = info.clientToken
          setInfo({ clientToken: clientToken })
        }
      })
  }

  const showBraintreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className='btn btn-success btn-block'
              onClick={onPurchase}>Buy</button>
          </div>
        ) : (
          <h3>Please LogIn or add something to cart!</h3>
        )}
      </div>
    )
  }

  // if we directly call getToken then it keep on calling that method
  useEffect(() => {
    getMeToken(userId, token)
  }, [])


  const onPurchase = () => {
    setInfo({ loading: true })
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount()
        }
        processPayment(userId, token, paymentData)
          .then(response => {
            setInfo({ ...info, loading: false, success: response.success })
            console.log("Payment success");
            // TODO: empty the cart
            // ?TODO: force reload
          })
          .catch(error => {
            setInfo({ loading: false, success: false })
            console.log("Payment failed");

          })
      })

  }

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount += p.price
    })
    return amount;
  }


  return (
    <div>
      <h3>Your bill is : {getAmount()}</h3>
      {showBraintreeDropIn()}
    </div>
  )
}

export default Payment