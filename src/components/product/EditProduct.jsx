import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

export default function EditProduct(props) {
  const {id} = useParams();
  const userId = props.userData._id;
  const [productData, setProductData] = useState({ user: userId });
  const [categories, setCategories] = useState([]); // Added state for categories
  const navigate = useNavigate();

  useEffect(() => {
    getProductData(userId);
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    Axios.get("/category/all") // Replace with your actual endpoint to fetch categories
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleChange = (e) => {
    const product = { ...productData };
    product[e.target.name] = e.target.value;
    setProductData(product);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const product = { ...productData };
    setProductData(product);
    updateProduct(productData);
  };

  function getProductData() {
    Axios.get(`/product/detail?id=${id}`).then((res) => {
      setProductData(res.data.product);
    });
  }

  function updateProduct(product) {
    console.log(product);
    Axios.post("/product/edit", product, props.headers).catch((err) => {
      console.log("error updating product");
      console.log(err);
    });
  }

  return (
    <div>
      <h2>Modify Product!</h2>
      <form onSubmit={handleUpdateProduct}>
        <div>
          <label className="form-label my-3" for="productName">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter product name"
            value={productData.name}
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
            value={productData.price}
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
            value={productData.category}
          >
            <option value="">Select a category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="form-label my-3" for="productDescription">
            Product Description
          </label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter product description"
            value={productData.description}
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
            value={productData.image}
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
            value={productData.sellingUnit}
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
            value={productData.availableQuantity}
          />
        </div>

        <div>
          <input
            className="btn btn-primary my-3"
            type="submit"
            value="Edit Product"
          />
        </div>
      </form>
    </div>
  );
}
