// eslint-disable-next-line import/named
import { RouteObject, createBrowserRouter } from "react-router-dom";
import ProtectedLayout from "../../layout/ProtectedLayout";
import DashboardPage from "../../pages/DashboardPage";

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
