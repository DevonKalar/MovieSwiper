import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Index from '@pages/index.jsx';
import { MoviesProvider } from './providers/MoviesContext';
import NotFound from '@pages/NotFound.jsx';
import WatchList from '@components/WatchList.jsx';
import DiscoverCard from '@components/DiscoverCard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    // Login Routes

    // Main Routes
    <Route path="/" element={<Index />}>
      <Route index element={<DiscoverCard />} />
      <Route path="likes" element={<WatchList />} />
      <Route path="*" element={<NotFound />} />
    </Route>

    // Account Routes

    // Not Found Route
    
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
