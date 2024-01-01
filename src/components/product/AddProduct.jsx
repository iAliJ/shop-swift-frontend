import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function AddProduct(props) {
  const storeId = props.store._id;
  const [newProduct, setNewProduct] = useState({ store: storeId });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const product = { ...newProduct };
    product[e.target.name] = e.target.value;
    setNewProduct(product);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = { ...newProduct };
    setNewProduct(product);
    addProduct(newProduct);
  };

  function addProduct(product) {
    Axios.post('/product/create', product, props.headers)
      .then((response) => {
        // navigate to /dashboard/stores
        console.log(response.data.product);
        // props.setHasStore(true);
        navigate('/dashboard/stores');
      })
      .catch((error) => {
        // Handle errors
        console.error('Error adding product:', error);
      });
  }

  return (
    <div>
      <h2>Add a new product to your store</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label className="form-label my-3" htmlFor="productName">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="form-label my-3" htmlFor="productPrice">
            Product Price
          </label>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label className="form-label my-3" htmlFor="productCategory">
            Product Category
          </label>
          <input
            type="text"
            name="category"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter product category"
          />
        </div>
        <div>
          <label className="form-label my-3" htmlFor="productImage">
            Product Image
          </label>
          <input
            type="text"
            name="image"
            className="form-control"
            onChange={handleChange}
            placeholder="Add product image"
          />
        </div>
        <div>
          <label className="form-label my-3" htmlFor="productSellingUnit">
            Product Selling Unit
          </label>
          <input
            type="text"
            name="sellingUnit"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter product selling unit"
          />
        </div>
        <div>
          <label className="form-label my-3" htmlFor="productAvailableQuantity">
            Product Available Quantity
          </label>
          <input
            type="number"
            name="availableQuantity"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter product available quantity"
          />
        </div>
        <div>
          <input
            className="btn btn-primary my-3"
            type="submit"
            value="Add Product"
          />
        </div>
      </form>
    </div>
  );
}
