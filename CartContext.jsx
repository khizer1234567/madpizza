import React, { createContext, useEffect, useState } from 'react';
import { openDB } from 'idb';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // --- IndexedDB setup ---
  const dbName = 'madPizzaPOS';
  const storeName = 'orders';

  const initDB = async () => {
    return await openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      }
    });
  };

  const saveToIndexedDB = async (order) => {
    const db = await initDB();
    await db.put(storeName, order);
  };

  const loadFromIndexedDB = async () => {
    const db = await initDB();
    return await db.getAll(storeName);
  };

  // --- Load orders from storage on mount ---
  useEffect(() => {
    const loadOrders = async () => {
      const localData = localStorage.getItem('orderHistory');
      if (localData) {
        setOrderHistory(JSON.parse(localData));
      } else {
        const dbOrders = await loadFromIndexedDB();
        setOrderHistory(dbOrders);
        localStorage.setItem('orderHistory', JSON.stringify(dbOrders));
      }
    };
    loadOrders();
  }, []);

  // --- Cart actions ---
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const placeOrder = async () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
    };
    const updatedHistory = [...orderHistory, newOrder];
    setOrderHistory(updatedHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
    await saveToIndexedDB(newOrder);
    setCart([]);
    console.log("Order placed:", newOrder);
  };

  return (
    <CartContext.Provider value={{
      cartItems: cart,
      addToCart,
      removeFromCart,
      placeOrder,
      orderHistory
    }}>
      {children}
    </CartContext.Provider>
  );
};
