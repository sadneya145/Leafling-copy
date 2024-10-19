import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import axios from 'axios';
import './Marketplace.css';
import Navbar from '../Navbar/Navbar'; // Import the Navbar
import SecondaryNavbar from './MarketPlaceSidebar/SecondSidebar';
import Footer from '../Footer/Footer';

const Marketplace = ({ addOrder }) => {
  const [cart, setCart] = useState([]); // State for cart
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCartData();
    fetchProductsData();
  }, []);

  const fetchCartData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('User is not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/getcart', {}, {
        headers: {
          'auth-token': token
        }
      });
      setCart(response.data || []);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const fetchProductsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getproducts');
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products data:', error);
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('User is not authenticated. Please log in.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/addtocart', { itemId: productId }, {
        headers: {
          'auth-token': token
        }
      });
      fetchCartData();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('User is not authenticated. Please log in.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/removefromcart', { itemId: productId }, {
        headers: {
          'auth-token': token
        }
      });
      fetchCartData();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div>
      <Navbar />
      <SecondaryNavbar onCategorySelect={handleCategorySelect} />
      <div className="mainpage-1">
        <div className="content-2">
          <ProductList products={filteredProducts} addToCart={addToCart} removeFromCart={removeFromCart} />
        </div>
      </div>

      {/* Cart Section */}
      <div className="cart-section">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - Price: &#8377;{item.price.toFixed(2)} 
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;
