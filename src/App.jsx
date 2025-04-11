import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';
import PotatoHeader from './components/PotatoHeader';
import OrderForm from './components/OrderForm';
import AdminLogin from './components/AdminLogin';
import AdminOrders from './components/AdminOrders';
import './styles/App.css';

function App() {
  const [admin, setAdmin] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleAdminLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAdmin(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
      setAdmin(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleOrderComplete = (id) => {
    setOrderComplete(true);
    setOrderId(id);
  };

  const handleNewOrder = () => {
    setOrderComplete(false);
    setOrderId('');
  };

  return (
    <Router>
      <div className="potato-app">
        <PotatoHeader admin={admin} onLogout={handleAdminLogout} />
        
        <main className="potato-main">
          <Routes>
            <Route path="/" element={
              orderComplete ? (
                <PaymentInstructions orderId={orderId} onNewOrder={handleNewOrder} />
              ) : (
                <OrderForm onOrderComplete={handleOrderComplete} />
              )
            } />
            <Route path="/admin" element={
              admin ? (
                <AdminOrders />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <footer className="potato-footer">
          <p>© 2023 PotatoPai - The Potato Lover's Paradise</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
