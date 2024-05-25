import { RouteObject, createBrowserRouter } from 'react-router-dom';
import CalculatorPage from '#/pages/CalculatorPage';
import AppLayout from './AppLayout';
import GroceriesListPage from './pages/GroceriesListPage';
import ToBuyPage from './pages/ToBuyPage';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/calculator',
        element: <CalculatorPage />,
        handle: {
            searchable: true
        }
    },
    {
        path: '/groceries',
        element: <GroceriesListPage />,
        handle: {
            searchable: true
        }
    },
    {
        path: '/to-buy',
        element: <ToBuyPage />
    },
    {
        path: '/stores',
        element: <StoresPage />
    }
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: routes
    }
])

export default router;