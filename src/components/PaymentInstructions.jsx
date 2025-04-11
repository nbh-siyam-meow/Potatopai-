import { useState } from 'react';
import { ref, uploadBytes, getStorage } from 'firebase/storage';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { storage, db } from '../firebase';

function PaymentInstructions({ orderId, onNewOrder }) {
  const [screenshot, setScreenshot] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleScreenshotUpload = async (e) => {
    e.preventDefault();
    
    if (!screenshot) {
      setError('Please select a screenshot file');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Upload the screenshot to Firebase Storage
      const storageRef = ref(storage, `payment-screenshots/${orderId}`);
      await uploadBytes(storageRef, screenshot);

      // Update the order document with screenshot uploaded status
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        paymentScreenshot: true,
      });

      setUploadSuccess(true);
    } catch (err) {
      console.error("Error uploading screenshot:", err);
      setError('Failed to upload screenshot. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="payment-instructions">
      <h2>Your PotatoPai Order #{orderId}</h2>
      <div className="payment-details">
        <h3>Payment Instructions</h3>
        <ol>
          <li>Send <strong>Tk {120}</strong> to bKash/Nagad: <strong>01780683269</strong> (Send Money)</li>
          <li>Make sure to include your order number <strong>#{orderId}</strong> in the reference</li>
          <li>Upload the payment confirmation screenshot below</li>
        </ol>
        
        {!uploadSuccess ? (
          <form onSubmit={handleScreenshotUpload} className="screenshot-form">
            <div className="form-group">
              <label htmlFor="screenshot">Upload Payment Screenshot:</label>
              <input
                type="file"
                id="screenshot"
                accept="image/*"
                onChange={(e) => setScreenshot(e.target.files[0])}
                required
              />
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <button type="submit" disabled={isUploading} className="potato-button">
              {isUploading ? 'Uploading...' : 'Submit Screenshot'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <p>✅ Thank you! Your payment screenshot has been received.</p>
            <p>We'll process your PotatoPai order soon!</p>
            <button onClick={onNewOrder} className="potato-button">
              Place Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentInstructions;
