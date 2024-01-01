import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Axios from 'axios';
import AddProduct from '../../../components/product/AddProduct';
import EditProduct from '../../../components/product/EditProduct';

export default function ProductIndex(props) {
  useEffect(() => {
    checkIfUserOwnsProduct();
  }, []);

  const userId = props.userData._id;
  const [hasProduct, setHasProduct] = useState(false);

  function checkIfUserOwnsProduct() {
    Axios.get(`/user/product?user=${userId}`)
      .then((res) => {
        if (res.data.product) {
          setHasProduct(true);
        } else {
          setHasProduct(false);
        }
      })
      .catch((err) => {
        console.log('Error checking if user owns product');
        console.log(err);
      });
  }

  return (
    <>
      {props.userData.role === 'seller' ? (
        <h1>Welcome to your product page</h1>
      ) : (
        <Navigate to="/" replace={true} />
      )}
      <div>
        {hasProduct ? (
          <EditProduct userData={props.userData} headers={props.headers} />
        ) : (
          <AddProduct
            setHasProduct={setHasProduct}
            userData={props.userData}
            headers={props.headers}
          />
        )}
      </div>
    </>
  );
}
