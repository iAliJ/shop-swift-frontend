import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function UserProductsTable(props) {
  const [userProducts, setUserProducts] = useState([]);
  useEffect(() => {
    getUserProducts();
  }, []);

  const getUserProducts = () => {
    Axios.get(`/user/product?user=${props.userData._id}`)
      .then((res) => {
        
        console.log("res",res.data);
        setUserProducts(res.data.product);
      })
      .catch((err) => {
        console.error('Error getting user products:', err);
      });
  };


  const handleEdit = (productId) => {
    const selectedProduct = userProducts.find((product) => product._id === productId);
    props.onEdit(selectedProduct);
  };

  const handleDelete = (productId) => {
    Axios.get(`/product/delete?id=${productId}`)
      .then((res) => {
        console.log(`Product with ID ${productId} deleted successfully`);
        // Update the state after deletion
        setUserProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((err) => {
        console.error(`Error deleting product with ID ${productId}:`, err);
      });
  };
  
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Available Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userProducts && userProducts.map((product, index) => (
            <tr key={product._id}>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.availableQuantity}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  to={`edit/${product._id}`}
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
