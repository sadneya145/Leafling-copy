import React, { useState, useEffect } from 'react';
import './SubBoxes.css'; // Import your custom CSS file
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'; // Import the Navbar
import Footer from '../Footer/Footer';
import sub1 from '../../Assets/hero_right.png';
import sub2 from '../../Assets/hero_right.png';
import sub3 from '../../Assets/hero_right.png';
import sub4 from '../../Assets/hero_right.png';

// Carousel component for displaying subscription box images with auto-slide
const BannerImage = () => {
    return (
        <div className="banner">
            <img
                src="https://images.squarespace-cdn.com/content/v1/62ea9c46cf3b956517f2f77e/ef382577-d1ed-4469-b7f3-62ab44fcdcc2/y2matecom-House-Plant-Shop-Packi.gif?format=1000w"
                alt="Plant Subscription"
                className="banner-image"
            />
        </div>
    );
};
// New section explaining what a subscription box is
const SubscriptionBoxExplanation = () => {
    return (
        <div className="subscription-box-explanation">
            <h2>What is a Plant Subscription Box?</h2>
            <p>
                A plant subscription box is a curated package of plant-related products, delivered to your doorstep on a regular basis.
                Each box contains a selection of items centered around plant care, gardening essentials, and nature-inspired goods.
                Whether you are a seasoned plant parent or just getting started, these boxes provide a fun and convenient way to explore new plant varieties,
                organic plant care solutions, and seasonal gardening tips. Let nature come to you, one box at a time!
            </p>
        </div>
    );
};

// New section explaining the company's motive
const CompanyMotive = () => {
    return (
        <div className="company-motive">
            <h2>Our Mission</h2>
            <p>
                At <strong>Leafling</strong>, we believe that connecting with nature should be easy and accessible for everyone.
                Our subscription boxes are carefully curated to bring you closer to nature, with a focus on organic, sustainable, and eco-friendly products.
                From rare plant varieties to DIY herb gardening kits, we aim to make every delivery a fresh experience.
                Join us on a journey towards greener living, and let's cultivate a more sustainable world together.
            </p>
        </div>
    );
};

// Cards component for displaying different types of subscription boxes
const Cards = () => {
    const boxes = [
        { name: 'Herb Garden Box', description: 'Grow your own fresh herbs with curated seeds, soil, and pots.', img: 'https://www.gardenersbox.com/wp-content/uploads/2018/06/mygardenbox-subscription-768x768.jpeg' },
        { name: 'Houseplant Starter Box', description: 'Perfect for beginners, with easy-care houseplants and care instructions.', img: 'https://images.squarespace-cdn.com/content/v1/62ea9c46cf3b956517f2f77e/94f0d72a-4d51-4097-855c-030b11cafd23/4_Rare_Monthly_Box_NewCard+%281%29.png' },
        { name: 'Plant Care Essentials', description: 'Natural fertilizers, organic soil, and tools to keep your plants thriving.', img: 'https://cdn11.bigcommerce.com/s-t5geqn/images/stencil/1280x1280/products/1154/1599/kit__55739.1712280981.jpg?c=2' },
        { name: 'Succulent Surprise', description: 'A monthly selection of unique succulents to brighten up your space.', img: 'https://www.gardenersbox.com/wp-content/uploads/2018/06/lazyflora-subscription.jpeg' },
        { name: 'Seasonal Blooms Box', description: 'Receive a selection of seasonal flowering plants, perfect for your garden.', img: 'https://www.gardenersbox.com/wp-content/uploads/2018/06/not-on-the-highstreet-subscription-768x768.jpg.webp' },
        { name: 'Edible Plants Box', description: 'Grow your own food with organic seeds and guides for edible plants.', img: 'https://www.gardenersbox.com/wp-content/uploads/2018/06/plant-grow-subscription-768x768.jpg.webp' },
        { name: 'Mixed Box- Small', description: 'A mix of small plant goodies, perfect for plant lovers.', img: 'https://www.ugaoo.com/cdn/shop/products/dip-your-toes-31259018002564.png?v=1675578245&width=360' },
        { name: 'Mixed Box- Medium', description: 'A medium-sized mix of plant care and new plant arrivals.', img: 'https://www.ugaoo.com/cdn/shop/products/swim-in-the-green-31259019116676.png?v=1675619831&width=360' },
        { name: 'Mixed Box- Large', description: 'A large collection for serious plant enthusiasts.', img: 'https://www.ugaoo.com/cdn/shop/products/dive-deep-31259020329092.png?v=1675578247&width=360' },
    ];

    return (
        <div className="cards">
            {boxes.map((box, index) => (
                <div key={index} className="card">
                    <img src={box.img} alt={box.name} className="card-img" />
                    <div className="card-content">
                        <h3>{box.name}</h3>
                        <p>{box.description}</p>
                        <button>Order now</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const SubBoxes = () => {
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div>
            <Navbar />
            <BannerImage />
            <SubscriptionBoxExplanation /> {/* New section added here */}
            <CompanyMotive />
            <Cards />
            <Footer />
        </div>
    );
};

export default SubBoxes;
