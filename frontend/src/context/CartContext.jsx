import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage or api based on login state
  useEffect(() => {
    if (user) {
      api.get('/cart').then((res) => {
        if (res.data?.items) {
          setCart(res.data.items);
        }
      }).catch(console.error);
    } else {
      const saved = localStorage.getItem('eden_cart');
      if (saved) {
        try {
          setCart(JSON.parse(saved));
        } catch(e){}
      }
    }
  }, [user]);

  // Sync back to storage or api
  useEffect(() => {
    if (user) {
      // delay sync or simple sync
      const syncCart = async () => {
        try {
          await api.post('/cart', { items: cart });
        } catch(e) {}
      };
      syncCart();
    } else {
      localStorage.setItem('eden_cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product_id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product_id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        product_id: product.id, 
        title: product.title, 
        price: product.price, 
        image: product.image,
        quantity: 1 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.product_id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) => prev.map(item => {
      if (item.product_id === productId) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
