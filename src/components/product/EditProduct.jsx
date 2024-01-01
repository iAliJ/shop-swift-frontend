import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function EditProduct() {

    const userId = props.userData._id;
    const [productData, setProductData] = useState({user: userId})
    const navigate = useNavigate();

    useEffect(() => {
        getProductData(userId);
    }, [])

    const handleChange = (e) => {
        const product = {...productData};
        product[e.target.name] = e.target.value;
        setProductData(product)
    }
    
    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const product = {...productData};
        setProductData(product);
        updateProduct(productData);
    }

    function getProductData(userId) {
        Axios.get(`/user/product?user=${userId}`)
        .then((res) => {
            setProductData(res.data.product);
        })
    }

    function updateProduct(product) {
        console.log(product);
        Axios.post('/product/edit', product, props.headers)
        .catch((err) => {
            console.log('error updating product');
            console.log(err);
        });
    }

  return (

    <div>
            <h2>Modify Product!</h2>
            <form onSubmit={handleUpdateProduct}>
                <div>
                    <label className="form-label my-3" for="productName">Product Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} placeholder="Enter product name" value={productData.name}/>
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
            placeholder="Enter product price" value={productData.price}
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
            placeholder="Enter product category" value={productData.category}
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
            placeholder="Enter product image URL"
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
            <input className='btn btn-primary my-3' type="submit" value="Edit Product"/>
                </div>
                </form>
              



    </div>

  )
}
