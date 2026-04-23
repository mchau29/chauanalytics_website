import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';

export const router = createBrowserRouter([
  { path: '/', Component: HomePage },
  { path: '/article', Component: ArticlePage },
]);
