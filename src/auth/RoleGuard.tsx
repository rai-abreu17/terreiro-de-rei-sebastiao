import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export function RequireAdmin(): React.ReactElement {
  const location = useLocation();
  const { user, estaAutenticada, isLoading } = useAuth();

  if (isLoading) {
    return <div aria-busy="true">Validando sessão...</div>;
  }

  if (!estaAutenticada || !user) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ returnTo: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
}
