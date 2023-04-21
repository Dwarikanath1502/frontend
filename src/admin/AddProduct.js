import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getARedirect: false,
    formData: new FormData()
  });

  const { name, description, price, stock, categories, category, loading, error, createdProduct, getARedirect, formData } = values;

  // preload will load all the existing data at the time of opening using useEffect hook
  const preLoad = () => {
    getAllCategories().then(data => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, categories: data.categories, formData: new FormData() })
        // marked as bug
        // console.log("CATE: ", categories);
      }
    })
  }

  useEffect(() => {
    preLoad()
  }, [])


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true })
    createProduct(user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name
          })
        }
      })
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    formData.set(name, value);
    setValues({ ...values, [name]: value })
  };

  const successMessage = () => (
    <div className="alert alert-success mt-3"
    style={{display: createdProduct ? "" : "none"}}
    >
      <h4>{createdProduct} created successfully!</h4>
    </div>
  )
  const warningMessage = () =>(
    <div className="alert alert-danger mt-3"
    style={{display: error ? "" : "none"}}
    >
      <h4>Failed to create product!</h4>
    </div>
 )

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success mb-2">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control mb-2"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (

              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control mb-2"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;