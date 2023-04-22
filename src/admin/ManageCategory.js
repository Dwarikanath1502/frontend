import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { getAllCategories } from './helper/adminapicall'

const ManageCategory = () => {

  const [categories, setCategories] = useState([])
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    })
  }

  useEffect(()=> {
    preload();
  }, [])


  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 categories</h2>
          {/* loop through all the products */}
          {/* {products.map((product, index) => { */}
          {/* return ( */}
          {/* key={index} */}
          <div className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">category name</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/categoryId`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button
                // this also needs product_id so use callback
                onClick={() => {

                  // deleteThisProduct(product._id);
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
          {/* ); */}
          {/* })} */}
        </div>
      </div>
    </Base>
  )
}

export default ManageCategory
