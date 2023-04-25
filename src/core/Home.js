import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base';
import Card from './Card';
// PAI call
import { getAllProducts } from './helper/coreapicalls';


const Home = () => {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadAllProducts = () => {
    getAllProducts()
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setProducts(data)
        }
      })

  }

  useEffect(() => {
    loadAllProducts()
  }, [])


  return (
    <Base title="Homepage" description='Welcome to the Rockx T-shirt store'>
      {/* <h1 className='text-white'>Hello front end</h1> */}
      <div className="row text-center">
        {/* <h1 className="text-white">All of t-shirts</h1> */}
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product}/>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  )
}

export default Home
