import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/OrderForm.css';

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
      <form onSubmit={handleSubmit}>
        {/* আপনার ফর্ম UI এখানে */}
      </form>
    </div>
  );
}

export default OrderForm;
