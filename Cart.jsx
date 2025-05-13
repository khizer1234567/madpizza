import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "../App.css";

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <h3>Your Cart</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>Rs. {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5>Total: Rs. {cart.reduce((sum, item) => sum + item.price, 0)}</h5>
    </div>
  );
};

export default Cart;
