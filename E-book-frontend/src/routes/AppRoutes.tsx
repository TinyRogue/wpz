import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Account from '../pages/account/Account';
import AddBook from '../pages/add-book/AddBook';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';
import Phrases from '../pages/phrases/Phrases';
import Register from '../pages/register/Register';
import { routes } from '../static/routes';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path={routes.home}
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path={routes.phrases}
          element={
            <Layout>
              <Phrases />
            </Layout>
          }
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path={routes.addBook}
          element={
            <Layout>
              <AddBook />
            </Layout>
          }
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path={routes.account}
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
