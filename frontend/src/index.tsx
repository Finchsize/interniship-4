import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import "./styles/index.css";

// Elements
import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { SignIn } from "./pages/SignIn";
import { Login } from "./pages/Login";

const fetcher = (url: any, sentData: any) => {
  fetch(process.env.REACT_APP_API + url, sentData).then((res) => res.json());
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
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
