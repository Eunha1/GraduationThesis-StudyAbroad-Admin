import DashBoard from '../pages/Dashboard/Dashboard';
import Error from '../pages/Error/Error';

export const ROUTER = [
  { key: 'not found', path: '*', element: <Error />, layout: null },
  { key: 'dashboard ', path: '/dashboard', element: <DashBoard /> },
];
