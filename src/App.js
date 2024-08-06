import './App.css';
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from './Components/ProtectedRoute';

import Register from "./Account/Register";
import Login from './Account/Login';
import Home from './Account/Home';
import EditAccount from './Account/EditAccount';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-account",
    element: (
      <ProtectedRoute>
        <EditAccount />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
