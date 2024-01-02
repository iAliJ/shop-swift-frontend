import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function AddProduct(props) {
  const userId = props.userData._id;
  const [newProduct, setNewProduct] = useState({ user: userId });
  const [categories, setCategories] = useState([]); // Added state for categories
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    Axios.get('/category/all') // Replace with your actual endpoint to fetch categories
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };


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
      .then((product) => {
        // navigate to /dashboard/products
        console.log(product);
        props.setHasProduct(true);
        navigate('/dashboard/products');
      })
      
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
            <select
              name="category"
              className="form-control"
              onChange={handleChange}
              value={newProduct.category}
            >
              <option value="">Select a category</option>
              {categories && categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>



        {/* <div>
          <label className="form-label my-3" htmlFor="productCategory">
            Product Category
          </label>
          <select
            name="category"
            className="form-control"
            onChange={handleChange}
            
          >
            <option value="">Select a category</option>
           
              <option> Electronics
              </option>
           
          </select> 
        </div> */}

        <div>
                    <label className="form-label my-3" for="productDescription">Product Description</label>
                    <textarea type="text" name="description" className="form-control" onChange={handleChange} placeholder="Enter product description"/>
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
        <input className='btn btn-primary my-3' type="submit" value="Create Product"/>
        </div>
      </form>
    </div>
  );
}
