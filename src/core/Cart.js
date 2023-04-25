import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base';
import Card from './Card';
// PAI call
import { loadCart } from './helper/cartHelper';


const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)
    // if any point of time things gets update and want to forcefully update the thing then use reload
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
                        setReload = {setReload}
                        reload = {reload}
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
                    {loadAllProducts()}
                </div>
                <div className="col-6">
                    {loadCheckout()}
                </div>

            </div>
        </Base>
    )
}

export default Cart
