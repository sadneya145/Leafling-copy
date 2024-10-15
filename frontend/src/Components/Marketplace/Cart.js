//cart.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import Navbar from '../Navbar/Navbar'; // Import the Navbar
import SecondaryNavbar from './MarketPlaceSidebar/SecondSidebar';
import Footer from '../Footer/Footer';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate for routing

    useEffect(() => {
        // Fetch cart from localStorage when component loads
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const increaseQuantity = (productId) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const decreaseQuantity = (productId) => {
        const updatedCart = cart
            .map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0); // Remove item if quantity is 0

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const handleProceedToPayment = () => {
        navigate('/home/marketplace/payment'); // Use navigate to go to the payment page
    };

    return (
        <>
            <Navbar />
            <SecondaryNavbar />
            <div className="cart-page">
                <h2>Your Cart</h2>
                {cart.length > 0 ? (
                    <>
                        {cart.map((product) => (
                            <div className="cart-item" key={product.id}>
                                <img src={product.image} alt={product.name} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p className="cart-item-price">Price: &#8377;{product.new_price}</p>
                                    <div className="cart-item-quantity">
                                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="cart-summary">
                            <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            <p>Total Price: &#8377;{cart.reduce((acc, item) => acc + item.quantity * item.new_price, 0)}</p>
                            <button className="payment-button" onClick={handleProceedToPayment}>
                                Proceed to Payment
                            </button>
                            <br />
                            <Link to="/home/marketplace" className="back-to-shopping-button">
                                Back to Shopping
                            </Link>
                        </div>
                    </>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
