import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import WatchlistProvider from '@/providers/WatchlistProvider.js';
import MovieFeedProvider from '@providers/MovieFeedProvider.jsx';
import AuthProvider from '@providers/AuthProvider.jsx';
import MainLayout from '@layouts/MainLayout.jsx';
import NotFound from '@pages/NotFound.jsx';
import WatchList from '@pages/WatchList';
import Discover from '@pages/Discover.jsx';
import AiChat from '@components/chat/AiChat.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Discover />} />
      <Route path="watchlist" element={<WatchList />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <MovieFeedProvider>
          <RouterProvider router={router} />
          <AiChat />
        </MovieFeedProvider>
      </WatchlistProvider>
    </AuthProvider>
  )
}

export default App;
