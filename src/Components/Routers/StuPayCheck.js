import React, { Fragment, useEffect, useState } from "react";
import { Redirect, Route, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'

const StuPayCheck = ({component: Component, ...rest }) => {

  let user = JSON.parse(localStorage.getItem('user-details'));
  let Class = localStorage.getItem('Class')
  let typeOfTest = localStorage.getItem('typeOfTest')

  const [data, setData] = useState()
  const history = useHistory()
  const alert = useAlert();

  useEffect(() => {
    if (!localStorage.getItem('user-details')) {
      history.push("./login")
    }
    if (!localStorage.getItem('Class')) {
      history.push("./")
    }
    getData()
  }, [])
  

  const getData = async () => {
    let item = { typeOfTest, Class };
    await fetch(`${process.env.REACT_APP_API_URL}/api/payment-router/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user && user.access}`,
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp)
      });
    });
  };

  return (
    <Fragment>
      {(
        <Route
          {...rest}
          render={(props) => {
            if (data && data === 402) {
              return alert.error("Your Test Attempt Finish"), <Redirect to="/" />;
            }

            // if (isAuthenticated === true && user && user.isAdmin == false ) {
            //   return <Redirect to="/login" />;
            // }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  )
}

export default StuPayCheck
