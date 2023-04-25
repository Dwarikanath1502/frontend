import React, { useState } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { AddItemToCart } from './helper/cartHelper';


const Card = ({ product, addtoCart = true, removefromCart = false }) => {

    const [redirect, setRedirect] = useState(false)




    const cartTitle = product ? product.name : "this is default photo"
    const cartDescription = product ? product.description : "this is default description"
    const cartPrice = product ? product.price : "this is default price"

    const addToCart = () => {
        AddItemToCart(product, () => setRedirect(true))

    }

    const getARedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }


    // method to show and remove button
    const showAddToCart = () => {
        return (
            addtoCart && (<button
                onClick={ addToCart }
                className="btn btn-block btn-outline-success mt-2 mb-2"
            >
                Add to Cart
            </button>)
        )
    }
    const showRemoveFromCart = () => {
        return (
            removefromCart && (
                <button
                    onClick={() => { }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border  border-info">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {/* redirect to cart page after adding to cart */}
                {getARedirect(redirect)}

                <ImageHelper product={product} />

                <p className="lead bg-success rounded mt-1 font-weight-normal text-wrap">
                    {cartDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addtoCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card