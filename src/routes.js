import React, { lazy, Suspense } from 'react';
import { Routes as Routing, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Loading from './components/Loading/Loading';
import MavContextProvider from './context/MavContext';

// Lazy load pages and components
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));

function Routes() {
  return (
    <MavContextProvider>
      <Routing>
        <Route exact path="/" element={<LandingPage />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/results"
          element={
            <Suspense fallback={<Loading />}>
              <ResultsPage />
            </Suspense>
          }
        />
      </Routing>
    </MavContextProvider>
  );
}

export default Routes;
