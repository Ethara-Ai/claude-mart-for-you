import { createContext, useContext, useEffect, useState } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);

      if (existingItem) {
        // Check if we can add more (respect stock limit)
        if (existingItem.quantity >= product.stock) {
          return prev;
        }
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    // Don't exceed stock
    const finalQuantity = Math.min(quantity, product.stock);

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: finalQuantity } : item
      )
    );
  };

  const incrementQuantity = (productId) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cartItems.find(item => item.id === productId);

    if (!product || !cartItem) return;

    if (cartItem.quantity < product.stock) {
      updateQuantity(productId, cartItem.quantity + 1);
    }
  };

  const decrementQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    if (!cartItem) return;

    updateQuantity(productId, cartItem.quantity - 1);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      if (!product) return total;
      const price = product.onSale ? product.originalPrice : product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      if (!product) return total;
      return total + product.price * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItems = () => {
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.id);
      return {
        ...product,
        quantity: item.quantity,
      };
    }).filter(item => item.id); // Filter out any items where product wasn't found
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getCartTotal,
    getCartSubtotal,
    getCartItemCount,
    getCartItems,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
