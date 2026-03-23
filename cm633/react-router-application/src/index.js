import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PageGettingStarted from "./components/PageGettingStarted";
import PageApplication from "./components/PageApplication";
import PageReview from "./components/PageReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageGettingStarted />,
  },
  {
    path: "/application",
    element: <PageApplication />,
  },
  {
    path: "/review",
    element: <PageReview />,
    action: async ({ request }) => {
      const formData = await request.formData();
      console.log(Object.fromEntries(formData));

      return Object.fromEntries(formData);
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
