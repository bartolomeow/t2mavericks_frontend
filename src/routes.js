import React, { lazy, Suspense } from 'react';
import { Routes as Routing, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Loading from './components/Loading/Loading';
import MavContextProvider from './context/MavContext';

// Lazy load pages and components
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PromptPage = lazy(() => import('./pages/PromptPage'));
const UploadDocument = lazy(() => import('./pages/UploadDocument'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));

function Routes() {
  return (
    <MavContextProvider>
      <Routing>
        <Route exact path="/landing" element={<LandingPage />} />
        <Route
          exact
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/prompts"
          element={
            <Suspense fallback={<Loading />}>
              <PromptPage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <UploadDocument />
            </Suspense>
          }
        />
        <Route
          exact
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
