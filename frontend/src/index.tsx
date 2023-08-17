import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/Fetcher";
import "./styles/index.css";

// Elements
import Layout from "./components/Layouts/Layout";
import OnboardingLayout from "./components/Layouts/Onboarding Layout";
import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { SignIn } from "./pages/SignIn";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import User from "./pages/User";
import userLoader from "./pages/User/loader";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <OnboardingLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-in/register/:nickname",
        element: <Register />,
      },
      {
        path: "/sign-in/login/:nickname",
        element: <Login />,
      },
    ],
  },
  {
    path: "/user/:nickname",
    element: <User />,
    loader: userLoader,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
