import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import './OrderForm.css';

function OrderForm({ onOrderComplete }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('inside');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const price = location === 'inside' ? 120 : 170;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!message.trim()) {
      setError('Please enter a message for your potato!');
      return;
    }
    
    if (message.length > 50) {
      setError('Message must be 50 words or less');
      return;
    }

    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        name: name.trim() || 'Anonymous',
        message: message.trim(),
        location,
        price,
        status: 'pending',
        paymentVerified: false,
        createdAt: new Date(),
      });

      onOrderComplete(docRef.id);
    } catch (err) {
      console.error("Error adding order:", err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-form-container">
      <h2>Order Your PotatoPai</h2>
      <p className="potato-description">Send a potato with a personalized message to your loved ones!</p>
      
      <form onSubmit={handleSubmit} className="potato-form">
        <div className="form-group">
          <label htmlFor="name">Your Name (optional):</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Potato Lover"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Your Message (max 50 words):</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something sweet for your potato recipient..."
            maxLength={300}
            required
          />
          <small>{message.length}/300 characters</small>
        </div>
        
        <div className="form-group">
          <label>Delivery Location:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="location"
                value="inside"
                checked={location === 'inside'}
                onChange={() => setLocation('inside')}
              />
              Inside Dhaka (Tk 120)
            </label>
            <label>
              <input
                type="radio"
                name="location"
                value="outside"
                checked={location === 'outside'}
                onChange={() => setLocation('outside')}
              />
              Outside Dhaka (Tk 170)
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="screenshot">Payment Screenshot (after placing order):</label>
          <input
            type="file"
            id="screenshot"
            accept="image/*"
            onChange={(e) => setPaymentScreenshot(e.target.files[0])}
            disabled
          />
          <small>You'll be able to upload after placing order</small>
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" disabled={isSubmitting} className="potato-button">
          {isSubmitting ? 'Placing Order...' : `Order Now (Tk ${price})`}
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
