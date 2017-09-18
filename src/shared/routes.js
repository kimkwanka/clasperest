import Home from '../client/components/Home';
import Dashboard from '../client/components/Dashboard';
import Recent from '../client/components/Recent';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/recent',
    exact: true,
    component: Recent,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
  },
];

export default routes;
