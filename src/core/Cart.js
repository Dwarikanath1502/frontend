import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base';
import Card from './Card';
// API call
import { loadCart } from './helper/cartHelper';


const Cart = () => {

    const [products, setProducts] = useState([])
    // it just changes the val to true to false and falase to true
    const [reload, setReload] = useState(false)
    // if any point of time things gets update and want to forcefully update the thing then use reload
    // here using to reload cart after removig product
    useEffect(() => {
        setProducts(loadCart())
    }, [reload])



    const loadAllProducts = () => {
        return (
            <div>
                <h2>
                    This section is to load products
                </h2>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        addtoCart={false}
                        removefromCart={true}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }
    const loadCheckout = () => {
        return (
            <div>
                <h2>
                    For checkout
                </h2>
            </div>
        )
    }


    return (
        <Base title="Cart" description='Checkout your products'>
            {/* <h1 className='text-white'>Hello front end</h1> */}
            <div className="row text-center">
                <div className="col-6">
                    {
                        products.length > 0 ? (
                            loadAllProducts()
                        ) : (
                            <h3>No prducts in cart!</h3>
                        )}
                </div>
                <div className="col-6">
                    {loadCheckout()}
                </div>

            </div>
        </Base>
    )
}

export default Cart
