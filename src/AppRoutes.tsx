import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { AdminLayout } from './layouts/AdminLayout/AdminLayout';
import { RequireAdmin } from './auth/RoleGuard';
import { BookingsDashboardPage } from './pages/admin/agenda/BookingsDashboardPage';
import { DisponibilidadePage } from './pages/admin/agenda/DisponibilidadePage';
import { PaginaCatalogoAdmin } from './pages/admin/catalog';
import { PaginaFormularioServico } from './pages/admin/catalog/PaginaFormularioServico';
import { DashboardPage } from './pages/admin/dashboard/DashboardPage';
import { LoginPage } from './pages/public/Login';
import { PublicBookingPage } from './pages/public/PublicBookingPage';
import { BookingStatusPage } from './pages/public/BookingStatusPage/BookingStatusPage';
import { Home } from './pages/public/Home/Home';
import { ServiceCategoryPage } from './pages/public/ServiceCategoryPage/ServiceCategoryPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage/ServiceDetailPage';
import { PublicLayout } from './layouts/PublicLayout';

export const rotas = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicLayout>
        <Home />
      </PublicLayout>
    ),
  },
  {
    path: '/servicos/:categorySlug',
    element: (
      <PublicLayout>
        <ServiceCategoryPage />
      </PublicLayout>
    ),
  },
  {
    path: '/servicos/:categorySlug/:serviceSlug',
    element: (
      <PublicLayout>
        <ServiceDetailPage />
      </PublicLayout>
    ),
  },
  {
    path: '/agendar',
    element: <PublicBookingPage />,
  },
  {
    path: '/booking/:bookingId/status',
    element: <BookingStatusPage />,
  },
  {
    path: '/agendar/pagamento/status/:bookingId',
    element: <BookingStatusPage />,
  },
  {
    path: '/admin/login',
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
  },
  {
    path: '/admin',
    element: (
      <AuthProvider>
        <RequireAdmin />
      </AuthProvider>
    ),
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'catalog',
            element: <Navigate to="/admin/catalog/services" replace />,
          },
          {
            path: 'catalog/services',
            element: <PaginaCatalogoAdmin />,
          },
          {
            path: 'catalog/services/new',
            element: <PaginaFormularioServico />,
          },
          {
            path: 'catalog/services/:serviceId/edit',
            element: <PaginaFormularioServico />,
          },
          {
            path: 'bookings',
            element: <BookingsDashboardPage />,
          },
          {
            path: 'availability',
            element: <Navigate to="/admin/availability/rules" replace />,
          },
          {
            path: 'availability/rules',
            element: <DisponibilidadePage />,
          },
          {
            path: '*',
            element: <Navigate to="/admin" replace />,
          },
        ]
      }
    ]
  }
]);

export function AppRoutes() {
  return <RouterProvider router={rotas} />;
}
