import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const { orderHistory } = useContext(CartContext);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orderHistory.map(order => (
          <div key={order.id} className="order">
            <h3>Order #{order.id}</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.name} - Rs.{item.price}</li>
              ))}
            </ul>
            <strong>Total: Rs.{order.total}</strong>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
