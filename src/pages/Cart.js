import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(10);
      setCouponApplied(true);
    } else if (couponCode === 'SAVE20') {
      setDiscount(20);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.08;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping + tax - discountAmount;

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <div className="empty-cart-icon">🛒</div>
            <p className="empty-cart">Your cart is empty</p>
            <p className="empty-cart-subtitle">Add some products to get started</p>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              <div className="cart-header">
                <h2>Items ({cartItems.length})</h2>
              </div>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="cart-item-info">
                          <img src={item.image} alt={item.name} />
                          <div>
                            <h3>{item.name}</h3>
                            <p className="item-category">{item.category}</p>
                            {item.stock < 10 && (
                              <p className="stock-warning">Only {item.stock} left!</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="item-price">${item.price.toFixed(2)}</td>
                      <td>
                        <div className="quantity-controls">
                          <button onClick={() => handleDecrement(item)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncrement(item)}>+</button>
                        </div>
                      </td>
                      <td className="item-total">${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button onClick={() => handleRemove(item.id)} className="remove-btn">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary-section">
              <div className="cart-summary">
                <h2>Order Summary</h2>
                
                <div className="coupon-section">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button 
                    onClick={handleApplyCoupon} 
                    disabled={couponApplied}
                    className="apply-coupon-btn"
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>

                {couponApplied && (
                  <div className="coupon-success">
                    ✓ Coupon "{couponCode}" applied successfully!
                  </div>
                )}

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount ({discount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="checkout-btn">Proceed to Checkout</button>

                <div className="payment-methods">
                  <p>We accept:</p>
                  <div className="payment-icons">
                    <span>💳</span>
                    <span>💵</span>
                    <span>🏦</span>
                  </div>
                </div>
              </div>

              <div className="promo-banner">
                <h3>💡 Tips</h3>
                <ul>
                  <li>Use code SAVE10 for 10% off</li>
                  <li>Use code SAVE20 for 20% off</li>
                  <li>Free shipping on orders over $100</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;