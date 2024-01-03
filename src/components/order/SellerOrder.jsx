// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
// export default function SellerOrder(props) {
//   // Get orders by the user
//   const [store, setStore] = useState({});
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     getStore();
//     getOrders();
//   }, [props])

//   function getOrders() {
//     // get the store id owned by this seller
//     Axios.get(`/orderitem/store?id=${store._id}`, props.headers)
//     .then(res => {
//         setOrders(res.data.orders);
//     })
//   }

//   function getStore() {
//     Axios.get(`/user/store?user=${props.userData._id}`, props.headers)
//     .then(res => {
//         setStore(res.data.store);
//     })
//   }

//   const allOrders = orders.map((order, index) => (
//     <tr key={index}>
//         <td>{order._id}</td>
//         <td>{order.product._id}</td>
//         <td>{order.product.name}</td>
//         <td>{order.quantity}</td>
//         <td>{order.status}</td>
//     </tr>
// ));

//   return (
//     <div>
//       <h1>Orders inside dashboard</h1>
//       <table class="table">
//         <thead>
//           <th scope='col'>Order ID</th>
//           <th scope='col'>Product ID</th>
//           <th scope='col'>Product Name</th>
//           <th scope='col'>Quantity</th>
//           <th scope='col'>Status</th>
//         </thead>
//         <tbody>
//           {allOrders}
//         </tbody>
//       </table>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export default function SellerOrder(props) {

  // Get orders by the user
  const [orders, setOrders] = useState([]);
  const [store, setStore] = useState({});  
  useEffect(() => {
    getOrders();
  }, [props])

  function getOrders() {
    Axios.get(`/order/user?id=${props.userData._id}`, props.headers)
    .then(res => {
      setOrders(res.data.orders);
    })
  }

  function getStore() {
    Axios.get(`/user/store?user=${props.userData._id}`, props.headers)
    .then(res => {
        setStore(res.data.store);
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
        <p>{store._id}</p>
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
