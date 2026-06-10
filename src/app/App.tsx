import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';

// Normalisasi double slashes di URL path secara realtime agar tidak memicu 404
if (typeof window !== 'undefined' && window.location.pathname.includes('//')) {
  const cleanPath = window.location.pathname.replace(/\/+/g, '/');
  window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
}


export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}