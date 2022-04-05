import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { TopLargeNavBar }from './components';
// Page imports
import { AboutPage, ContactPage, Home, ReviewsPage, ScheduleAppointment } from './pages';

const stripePromise = loadStripe(process.env.REACT_APP_TEST_SECRET || '');

function App() {
  return (
    <Elements
      stripe={stripePromise}
    >
      <Router>
        <TopLargeNavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='reviews' element={<ReviewsPage />} />
          <Route path='schedule' element={<ScheduleAppointment />} />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
