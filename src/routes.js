import React, { lazy, Suspense } from 'react';
import { Routes as Routing, Route } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import MavContextProvider from './context/MavContext';
import Header from './components/Header/Header';

// Lazy load pages and components
const UploadDocument = lazy(() => import('./pages/UploadDocument'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));

function Routes() {
  return (
    <MavContextProvider>
      <Header />
      <Routing>
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
          path="/features"
          element={
            <Suspense fallback={<Loading />}>
              <FeaturesPage />
            </Suspense>
          }
        />
      </Routing>
    </MavContextProvider>
  );
}

export default Routes;
