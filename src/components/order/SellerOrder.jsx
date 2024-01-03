import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export default function SellerOrder(props) {

  // Get orders by the user
  const [user, setUser] = useState(props.userData);
  const [store, setStore] = useState(loadStore());
  const [orders, setOrders] = useState(loadOrders());

  useEffect(() => {
    setUser(props.userData);
  }, [props])

  function loadOrders() {
    // get the store id owned by this seller
    Axios.get(`/orderitem/store?id=${store._id}`, props.headers)
    .then(res => {
        return res.data.orderItems;
    })
  }

  function loadStore() {
    console.log(props.userData._id);
    Axios.get(`/user/store?user=${props.userData._id}`, props.headers)
    .then(res => {
        return res.data.store;
    })
  }

  const allOrders = orders.map((order, index) => (
    <tr key={index}>
        <td>{order._id}</td>
        <td>{order.product._id}</td>
        <td>{order.product.name}</td>
        <td>{order.quantity}</td>
        <td>{order.status}</td>
    </tr>
));

  return (
    <div>
      <h1>Orders inside dashboard</h1>
      <table class="table">
        <thead>
          <th scope='col'>Order ID</th>
          <th scope='col'>Product ID</th>
          <th scope='col'>Product Name</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Status</th>
        </thead>
        <tbody>
          {allOrders}
        </tbody>
      </table>
    </div>
  )
}
