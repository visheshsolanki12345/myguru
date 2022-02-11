
import React from "react";
import { Redirect, Route } from "react-router-dom";

function Prodected({ component: Component, ...restOfProps }) {
  const isAuthenticated = (localStorage.getItem('user-details'))

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default Prodected

