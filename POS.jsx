import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import './POS.css';

const POS = () => {
  const { cartItems = [], addToCart, removeFromCart, placeOrder } = useContext(CartContext);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', img: '', category: 'Appetizers' });

  const [productsByCategory, setProductsByCategory] = useState({
    Appetizers: [
      { name: 'Cheesy Garlic Bread', description: '4 pcs served with tomato dip', price: 150, img: '/images/cheesy-garlic-bread.jpg' },
      { name: 'PeriPeri Wings', description: '4 pcs served with Dip Sauce', price: 150, img: '/images/periperi-wings.jpg' },
      { name: 'Mad Fries', description: 'Large fries served with dip', price: 150, img: '/images/mad-fries.jpg' },
    ],
    Dessert: [
      { name: 'Chocolate Lava Cake', description: '', price: 150, img: '/images/lava-cake.jpg' },
      { name: 'Double Chocolate Cookie', description: '', price: 150, img: '/images/choco-cookie.jpg' },
    ],
    Dips: [
      { name: 'Chipotle', description: 'Chipotle Dip Sauce', price: 60, img: '/images/chipotle.jpg' },
      { name: 'MAD Dip', description: 'MAD Dip Signature', price: 60, img: '/images/maddip.jpg' },
      { name: 'Ranch', description: 'Ranch Dip Sauce', price: 60, img: '/images/ranch.jpg' },
    ],
    Pizza: [
      { name: 'Cheese Lover', description: 'Cheddar, Mozzarella, Cheese', price: 700, img: '/images/cheese-lover.jpg' },
      { name: 'Creamy Tikka Pizza', description: 'Chicken Tikka, Ranch Sauce, Cheese', price: 700, img: '/images/creamy-tikka.jpg' },
      { name: 'Chipotle Pizza', description: 'Chicken, Salsa, Chipotle Sauce', price: 700, img: '/images/chipotle-pizza.jpg' },
      { name: 'Fajita Pizza', description: 'Spicy Chicken, Onions, Peppers', price: 700, img: '/images/fajita.jpg' },
    ],
  });

  const handlePlaceOrder = async () => {
    if (cartItems.length > 0) {
      await placeOrder();
      alert('Order placed successfully!');
    }
  };

  const handleAddProduct = () => {
    setProductsByCategory(prev => ({
      ...prev,
      [newProduct.category]: [...prev[newProduct.category], { ...newProduct, price: parseInt(newProduct.price, 10) }]
    }));
    setNewProduct({ name: '', description: '', price: '', img: '', category: 'Appetizers' });
    setProductModalOpen(false);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="zettle-pos dark-theme">
      <div className="products-section">
        {Object.keys(productsByCategory).map(category => (
          <div key={category} className="product-category">
            <h2>{category}</h2>
            <div className="product-grid">
              {productsByCategory[category].map((product, index) => (
                <div key={index} className="product-card" onClick={() => addToCart(product)}>
                  <img src={product.img} alt={product.name} />
                  <div className="info">
                    <strong>{product.name}</strong>
                    <p>{product.description}</p>
                    <p>Rs.{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>Cart</h2>
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-row">
              <span>{item.name}</span>
              <span>Rs.{item.price}</span>
              <button onClick={() => removeFromCart(item.name)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div>Total: Rs.{totalPrice}</div>
          <button className="place-order" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
            Place Order
          </button>
        </div>
      </div>

      <button 
        className="edit-button bottom-left"
        onClick={() => setProductModalOpen(true)}
      >
        Edit/Add Product
      </button>

      {isProductModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.img}
              onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              {Object.keys(productsByCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button onClick={handleAddProduct}>Add Product</button>
            <button onClick={() => setProductModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;
