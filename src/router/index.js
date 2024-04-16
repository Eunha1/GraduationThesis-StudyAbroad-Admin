import DashBoard from '../pages/Dashboard/Dashboard';
import Error from '../pages/Error/Error';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Home from '../pages/Home/Home';
import Article from '../pages/Article/Article';
import AddArticle from '../pages/Article/AddArticle';
import OfferLetter from '../pages/File/OfferLetter';
export const ROUTER = [
  { key: 'not found', path: '*', element: <Error />, layout: null },
  { key: 'home', path: '/', element: <Home /> },
  { key: 'dashboard ', path: '/dashboard', element: <DashBoard /> },
  { key: 'login', path: '/login', element: <Login />, layout: null },
  { key: 'article', path: '/article', element: <Article /> },
  { key: 'add-article', path: '/article/add-article', element: <AddArticle /> },
  { key: 'offer-letter-file', path: '/offer-letter', element: <OfferLetter /> },
  {
    key: 'forgot-password',
    path: '/forgot-password',
    element: <ForgotPassword />,
    layout: null,
  },
];
