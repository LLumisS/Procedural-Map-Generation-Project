import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
  const isAuth = false;
  return (
    <Routes>
      {isAuth === true && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact/>
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact/>
      ))}
    </Routes>
  );
};

export default AppRouter;
