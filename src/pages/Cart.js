import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { 
  ShoppingCartIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  TicketIcon,
  CreditCardIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    if (couponCode === 'SAVE10') {
      setDiscount(10);
      setCouponApplied(true);
    } else if (couponCode === 'SAVE20') {
      setDiscount(20);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 10) : 0;
  const tax = subtotal * 0.08;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping + tax - discountAmount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <ShoppingCartIcon className="h-10 w-10 text-primary-600" />
          <h1 className="text-4xl font-bold text-gray-800">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="card p-16 text-center animate-fade-in">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 text-lg mb-8">Add some amazing products to get started!</p>
            <a 
              href="/" 
              className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="card p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in">
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />

                  {/* Product Info */}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-2xl font-bold text-primary-600">${item.price.toFixed(2)}</p>
                    {item.stock < 10 && (
                      <p className="text-sm text-orange-500 font-semibold">
                        ⚠️ Only {item.stock} left in stock!
                      </p>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="text-lg font-bold text-gray-800 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <PlusIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Total</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                    title="Remove item"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Coupon Section */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <TicketIcon className="h-6 w-6 text-primary-600" />
                  <h3 className="text-xl font-bold text-gray-800">Apply Coupon</h3>
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError('');
                    }}
                    disabled={couponApplied}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none disabled:bg-gray-100"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      couponApplied
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>

                {couponApplied && (
                  <div className="flex items-center space-x-2 bg-green-50 text-green-700 p-3 rounded-lg">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">Coupon applied successfully!</span>
                  </div>
                )}

                {couponError && (
                  <div className="flex items-center space-x-2 bg-red-50 text-red-700 p-3 rounded-lg">
                    <XCircleIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">{couponError}</span>
                  </div>
                )}

                <div className="bg-primary-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-primary-900 mb-2">Available Codes:</p>
                  <ul className="text-sm text-primary-700 space-y-1">
                    <li>• <strong>SAVE10</strong> - 10% off</li>
                    <li>• <strong>SAVE20</strong> - 20% off</li>
                  </ul>
                </div>
              </div>

              {/* Summary */}
              <div className="card p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <TruckIcon className="h-4 w-4" />
                      <span>Shipping</span>
                    </div>
                    <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center text-2xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Proceed to Checkout
                </button>

                <div className="flex items-center justify-center space-x-3 text-gray-500 text-sm pt-4">
                  <CreditCardIcon className="h-5 w-5" />
                  <span>Secure Payment</span>
                </div>
              </div>

              {/* Free Shipping Banner */}
              {subtotal < 100 && subtotal > 0 && (
                <div className="card p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200">
                  <p className="text-sm font-semibold text-orange-800">
                    🚚 Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                  <div className="mt-2 bg-white rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-yellow-400 h-full transition-all"
                      style={{ width: `${(subtotal / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;