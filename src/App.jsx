import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import UserProvider from '@providers/UserProvider.jsx';
import MainLayout from '@layouts/MainLayout.jsx';
import NotFound from '@pages/NotFound.jsx';
import WatchList from '@pages/WatchList.jsx';
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
    <UserProvider>
      <RouterProvider router={router} />
      <AiChat />
    </UserProvider>
  )
}

export default App;
