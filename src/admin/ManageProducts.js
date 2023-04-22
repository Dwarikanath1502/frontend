import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {

  const [products, setProducts] = useState([])

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts()
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          // we are not loading all the value because its an arr not object
          setProducts(data);
        }
      })
  }

  useEffect(() => {
    preload();
  }, [])

  // api call also have name deleProduct so make this as deleteThisProduct
  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
        // prelaod loads al the updated value so after deleting it loads up update val
        // if we simply setProducts(data) then it will del but will not show updated result
        preload()
        }
      })
      .catch()
  }

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
          {/* loop through all the products */}
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                  // this also needs product_id so use callback
                    onClick={() => {
                      
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;