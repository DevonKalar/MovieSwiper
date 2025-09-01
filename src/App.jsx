import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import SwipeFeed from './pages/SwipeFeed';
import LikeFeed from './pages/LikeFeed';
import { MoviesProvider } from './providers/MoviesContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    // Login Routes

    // Main Routes
    <Route path="/" element={<MainLayout />}>
      <Route index element={<SwipeFeed />} />
      <Route path="likes" element={<LikeFeed />} />
    </Route>

    // Account Routes

    // Default redirect
  )
);

function App() {
  return (
    <MoviesProvider>
      <RouterProvider router={router} />
    </MoviesProvider>
  )
}

export default App;
