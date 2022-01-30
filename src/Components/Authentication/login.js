import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/pogo-slider.min.css";
import "../css/style.css";
import "../css/custom.css";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import dotenv from 'dotenv'
import { FaFacebookF } from "react-icons/fa";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './login.css'

const Login = () => {

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  const onGoogleLoginFailure = (response) => {
    // console.log(response);
  }

  const onGoogleLoginSuccess = (response) => {
    // console.log('google', response)
    setLoading(true)
    let email = response.profileObj.email
    let name = response.profileObj.name
    let campus = 'student'
    let password = uuidv4()
    register(campus, name, email, password)
    localStorage.setItem("image", response.profileObj.imageUrl)
    setLoading(false)
  }



  const responseFacebook = (response) => {
    console.log('facebook', response)
    setLoading(true)
    let email = response.email
    let name = response.name
    let campus = 'student'
    let password = uuidv4()
    register(campus, name, email, password)
    setLoading(false)
  }

  const register = (campus, name, email, password) => {
    let item = { campus, name, email, password }
    fetch(`${process.env.REACT_APP_API_URL}/api/account/register/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        // console.log(resp)
        if (result.status !== 200) {
          alert.error(resp.detail)
        }
        if (result.status === 200) {
          localStorage.setItem("user-details", JSON.stringify(resp));
          history.push("/")
        }
      })
    })
  }


  const history = useHistory();
  const [loading, setLoading] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const alert = useAlert();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  dotenv.config()
  const login = () => {
    let item = { username, password };
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/account/login/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      // console.log("Result", result.status)
      if (result.status !== 401) {
        alert.success("Login Successful!");
      }
      result.json().then((resp) => {
        // console.log(resp)
        setLoading(false);
        if (result.status !== 200) {
          alert.error("User name password incorrect!!!");
        }
        if (result.status === 200) {
          localStorage.setItem("user-details", JSON.stringify(resp));
          history.push("/");
          setUsername("");
          setPassword("");
        }
      });
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <body
        id="home"
        data-spy="scroll"
        data-target="#navbar-wd"
        data-offset="98"
      >

        <section className="inner_banner margin-top_7">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="full">
                  <h3>Login/Signup</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Popular Programs section --> */}

        {/* <!-- margin-top_50 --> */}
        <div className="section layout_padding Login">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="why_us_login">
                  <div className="text">Benefits of Registration with us:-</div>
                  <div className="why_us_login_inner">
                    <ul>
                      <li>Manage your Orders</li>
                      <li>Manage your Tests easily</li>
                      <li>Connect with your campus</li>
                      <li>
                        Save Videos and watch whenever you want in one click
                      </li>
                      <li>Manage your appointments with our counsellors</li>
                      <li>
                        Save Videos and watch whenever you want in one click
                      </li>
                      <li>Manage your appointments with our counsellors</li>
                    </ul>
                    <button
                      type="button"
                      className="btn btn-info mt-3"
                      onclick="window.location.href='about-us.html';"
                    >
                      Learn More
                    </button>
                  </div>
                  <p className="mt-3 mb-1">
                    <b>For more details you can contact us at:-</b>
                  </p>
                  <ul className="login_contact">
                    <li>
                      <i className="fa fa-map-marker"></i>
                      <span>ABC, Laxmi Nagar, New Delhi-110001. India</span>
                    </li>
                    <li>
                      <i className="fa fa-process.env.Relope"></i>
                      <span>info@gmail.com</span>
                    </li>
                    <li>
                      <i className="fa fa-phone"></i>
                      <span>+91-9876543210</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="loginform">
                  <div className="text">Login</div>
                  <div className="field">
                    {" "}
                    <i className="fa fa-user"></i>
                    <select name="profile" id="profile">
                      <option value="select" selected>
                        Select User Profile
                      </option>
                      <option value="student">Student</option>
                      <option value="campus">Campus</option>
                      <option value="counsellor">
                        Counsellor/Educationist
                      </option>
                      <option value="superadmin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </select>
                  </div>
                  <div className="field">
                    {" "}
                    <i classNameName="fa fa-process.env.Relope-o"></i>
                    <input
                      type="text"
                      placeholder="Email & Username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  {passwordShown ? (
                    <>
                      <div className="field">
                        {" "}
                        <i className="fa fa-key"></i>{" "}
                        <div className="eyeIcon">
                          <i className="fa fa-eye" onClick={togglePassword}></i>
                        </div>{" "}
                        <input
                          type={passwordShown ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="field">
                        {" "}
                        <i className="fa fa-key"></i>{" "}
                        <div className="eyeIcon">
                          <i
                            className="fa fa-eye-slash"
                            onClick={togglePassword}
                          ></i>
                        </div>{" "}
                        <input
                          type={passwordShown ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />{" "}
                      </div>
                    </>
                  )}
                  {/* <button onClick={togglePassword}>Show Password</button> */}
                  <button className="login_btn" onClick={login}>
                    Login
                  </button>
                  <Link to="/signup" className="float-left">   password-reset
                    Not Register? Signup Now
                  </Link>
                  <Link to="/password-reset" className="float-right">   
                  Forgot Password?
                  </Link>
   
                  <div className="clearfix"></div>
                  <div className="social-buttons" style={{display:'flex',gap:'20px',justifyContent:"space-evenly"}}>

                    <div >
                    <FacebookLogin
                      appId="2739846806322407"
                      autoLoad={false}
                      fields="name,email,picture"
                      scope="public_profile,user_friends"
                      callback={responseFacebook}
                      cssClass="my-facebook-button-class"
                      icon={<FaFacebookF/>} />
                    </div>
                    <div>
                    <GoogleLogin
                      // clientId="550540451855-qbl4rikdvcm8dh5qc1f2qvkoqcu66rts.apps.googleusercontent.com" // local host clind id
                      clientId="357478272810-6otro27noaikntroie2t7fv1220062nu.apps.googleusercontent.com" // deploye clind id
                      buttonText="Google"
                      onSuccess={onGoogleLoginSuccess}
                      onFailure={onGoogleLoginFailure} 
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- end section --> */}

        <div className="clearfix"></div>
      </body>
    </div>
  );
};

export default Login;
