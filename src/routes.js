import React from 'react';
import { Routes as Routing, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
//import AboutPage from './pages/AboutPage';
//import ContactPage from './pages/ContactPage';

function Routes() {
  return (
    <Routing>
      <Route exact path="/" element={<LandingPage />} />
    </Routing>
  );
}

export default Routes;
