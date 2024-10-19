import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Uncomment if needed
import ProductList from './ProductList';
import axios from 'axios';
import './Marketplace.css';
import Navbar from '../Navbar/Navbar'; // Import the Navbar
import SecondaryNavbar from './MarketPlaceSidebar/SecondSidebar';
import Footer from '../Footer/Footer';

const Marketplace = ({ addOrder }) => {
  // const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  useEffect(() => {
    fetchCartData();
    fetchProductsData();
  }, []);

  const fetchCartData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Consider displaying an error message to the user instead of using a state
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
      // Handle error
    }
  };

  const fetchProductsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getproducts');
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products data:', error);
      // Handle error
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

  // You can re-add these functions later if needed
  // const updateQuantity = (productId, quantity) => { /* Function logic */ };
  // const handleCheckout = () => { /* Function logic */ };

  // Function to handle category selection
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
      <Footer />
    </div>
  );
};

export default Marketplace;
