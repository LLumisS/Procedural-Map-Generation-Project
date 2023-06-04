import Auth from './pages/Auth';
import Generator from './pages/Generator';
import Homepage from './pages/Homepage';
import Saves from './pages/Saves';
import {
  SAVES_ROUTE,
  GENERATOR_ROUTE,
  HOMEPAGE_ROUTE,
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
} from './utils/consts';

export const authRoutes = [
  {
    path: SAVES_ROUTE,
    Component: Saves
  },
];

export const publicRoutes = [
  {
    path: GENERATOR_ROUTE,
    Component: Generator
  },
  {
    path: HOMEPAGE_ROUTE,
    Component: Homepage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
];
