import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../../images/Assets/cross_icon.svg'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
// import Sidebar from '../Sidebar/Sidebar'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([])

  const fetchInfo = async () => {
    await fetch('http://localhost:5000/getproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const remove_product = async (id) => {
    await fetch('http://localhost:5000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    await fetchInfo();
  }
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product, index) => {
            return <> <div key={index} className='listproduct-format-main listproduct-format'>
              <img src={product.image} className='listproduct-product-icon' alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => { remove_product(product.id) }} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
              <hr />
            </>
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ListProduct
