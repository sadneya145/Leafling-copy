//productlist.js
import React, { useEffect, useState } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch product data
  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/getproducts');
      const data = await response.json();

      // Add an initial quantity of 0 to each product
      const updatedProducts = data.map((product) => ({
        ...product,
        quantity: 0, // Start with quantity 0
        description: "This is a beautiful plant that brings life and freshness to any space.",
      }));

      setAllProducts(updatedProducts);

      // Fetch cart from localStorage on initial render
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);

      // Update initial product quantities based on cart
      const updatedProductQuantities = updatedProducts.map((product) => {
        const cartItem = storedCart.find((item) => item.id === product.id);
        return cartItem ? { ...product, quantity: cartItem.quantity } : product;
      });
      setAllProducts(updatedProductQuantities);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Add to cart or update quantity
  const addToCart = (productId) => {
    const product = allProducts.find((item) => item.id === productId);
    if (product) {
      const updatedCart = cart.find((item) => item.id === productId)
        ? cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
        : [...cart, { ...product, quantity: 1 }];

      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage

      // Update product quantity on main page
      setAllProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  // Remove from cart or decrease quantity
  const removeFromCart = (productId) => {
    const product = allProducts.find((item) => item.id === productId);
    if (product) {
      if (product.quantity > 1) {
        // Decrease quantity
        const updatedCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        // Remove from cart when quantity reaches 0
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      // Update the quantity on the main page
      setAllProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  return (
    <div className="product-list">
      {allProducts.length > 0 ? (
        <>
          {allProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="product-price">Price: &#8377;{product.new_price}</p>
              </div>

              <div className="product-actions">
                {/* If quantity is 0, show Add to Cart button */}
                {product.quantity === 0 ? (
                  <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                ) : (
                  // Once added to cart, show - quantity +
                  <div className="quantity-controls">
                    <button onClick={() => removeFromCart(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => addToCart(product.id)}>+</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
