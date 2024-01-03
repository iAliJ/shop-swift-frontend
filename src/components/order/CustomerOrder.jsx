import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export default function CustomerOrder(props) {

  // Get orders by the user
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, [props])

  function getOrders() {
    Axios.get(`/order/user?id=${props.userData._id}`, props.headers)
    .then(res => {
      setOrders(res.data.orders);
    })
  }

  const allOrders = orders.map((order, index) => (
    <tr key={index}>
        <td>{order._id}</td>
        <td>BHD {order.price}</td>
        <td>{order.status}</td>
    </tr>
));

  return (
    <div>
      <h1>Orders inside dashboard</h1>
      <table class="table">
        <thead>
          <th scope='col'>Order ID</th>
          <th scope='col'>Total Price</th>
          <th scope='col'>Status</th>
        </thead>
        <tbody>
          {allOrders}
        </tbody>
      </table>
    </div>
  )
}
