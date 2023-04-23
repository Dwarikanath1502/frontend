import React from 'react'
import ImageHelper from './helper/ImageHelper';


const Card = ({ product, addtoCart = true, removefromCart = false }) => {

    const cartTitle = product ? product.name : "this is default photo"
    const cartDescription = product ? product.description : "this is default description"
    const cartPrice = product ? product.price : "this is default price"

    // method to show and remove button
    const showAddToCart = () => {
        return (
            addtoCart && (<button
                onClick={() => { }}
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