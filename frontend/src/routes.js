import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Login = React.lazy(() => import('./views/Login'));

const routes = [
    {path : '/admin/login', exact: true, name: 'Home', element: Login },
    { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
]
export default routes