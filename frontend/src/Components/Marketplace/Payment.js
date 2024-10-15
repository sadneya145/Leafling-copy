// Payment.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import CardForm from './CardForm';
import './Payment.css';

const Payment = () => {
    const location = useLocation();
    const cart = location.state?.cart || []; // Fallback to an empty array

    const [selectedCart, setSelectedCart] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('visa');
    const [rotateCard, setRotateCard] = useState(false);

    const handlePay = () => {
        setSelectedCart(cart);
    };

    const handleCardSubmit = (cardDetails) => {
        console.log('Processing payment for cart:', selectedCart);
        console.log('Card details:', cardDetails);

        setCardNumber(cardDetails.cardNumber);
        setCardType(cardDetails.cardNumber ? determineCardType(cardDetails.cardNumber) : 'visa');
        setSelectedCart(null);
    };

    const determineCardType = (number) => {
        if (number.startsWith('4')) return 'visa';
        if (number.startsWith('5')) return 'mastercard';
        if (number.startsWith('3')) return 'amex';
        return 'visa';
    };

    return (
        <div className="payment">
            <h2>Proceed to Payment</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="order-summary">
                        <h3>Your Order</h3>
                        {cart.map((item, index) => (
                            <div key={item.id || index} className="cart-item">
                                <h4>{item.name}</h4>
                                <p>Price: &#8377;{item.new_price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total: &#8377;{(item.new_price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <p>
                            <strong>Total Amount: &#8377;{cart.reduce((acc, item) => acc + (item.new_price * item.quantity), 0).toFixed(2)}</strong>
                        </p>
                        <button onClick={handlePay}>Pay Now</button>
                    </div>
                    {selectedCart && (
                        <div className="payment-section">
                            <h3>Pay for Your Order</h3>
                            <Card values={{ cardNumber, cardType, rotateCard }} />
                            <CardForm onSubmit={handleCardSubmit} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Payment;
