import { RouteObject, createBrowserRouter } from 'react-router-dom';
import CalculatorPage from '#/pages/CalculatorPage';
import AppLayout from './AppLayout';
import GroceriesListPage from './pages/GroceriesListPage';
import ToBuyPage from './pages/ToBuyPage';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <CalculatorPage />
    },
    {
        path: '/calculator',
        element: <CalculatorPage />
    },
    {
        path: '/groceries',
        element: <GroceriesListPage />
    },
    {
        path: '/to-buy',
        element: <ToBuyPage />
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