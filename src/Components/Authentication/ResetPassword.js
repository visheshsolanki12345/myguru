import React, { Fragment, useState } from 'react';
import Loader from "../Loader/Loader";
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom';

const ResetPassword = ({ match }) => {

    let token = match.params.token
    const history = useHistory();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);
    const [loading, setLoading] = useState(false)
    const alert = useAlert();

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const togglePassword2 = () => {
        setPasswordShown2(!passwordShown2);
    };

    const register = async () => {
        setLoading(true)
        let item = { password, token }
        if (password.length < 8 || confirmPassword.length < 8) {
            return alert.error("Password should be 8 digit!")
        }
        if (password !== confirmPassword) {
            return alert.error("Password did not Match!")
        }
        await fetch(`${process.env.REACT_APP_API_URL}/api/account/password_reset/confirm/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }).then((result) => {
            setLoading(false)
            if (result.status === 200) {
                setPassword("")
                setConfirmPassword("")
                alert.success("Password Reset Successfully!")
                history.push("/login")
                return
            } else {
                result.json().then((resp) => {
                    alert.error(resp.detail)
                })
            }

        })
    }
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="section layout_padding Login margn-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="loginform">
                                        <div className="text">Password Reset</div>
                                        {
                                            passwordShown ?
                                                <>
                                                    <div className="field"> <i className="fa fa-key"></i> <div className='eyeIcon2'><i className="fa fa-eye" onClick={togglePassword}></i></div> <input type={passwordShown ? "text" : "password"} placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} /> </div>
                                                </>
                                                :
                                                <>
                                                    <div className="field"> <i className="fa fa-key"></i> <div className='eyeIcon2'><i className="fa fa-eye-slash" onClick={togglePassword}></i></div> <input type={passwordShown ? "text" : "password"} placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} /> </div>
                                                </>
                                        }
                                        {
                                            passwordShown2 ?
                                                <>
                                                    <div className="field"> <i className="fa fa-key"></i> <div className='eyeIcon2'><i className="fa fa-eye" onClick={togglePassword2}></i></div> <input type={passwordShown2 ? "text" : "password"} placeholder="Re-Enter Password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} /> </div>
                                                </>
                                                :
                                                <>
                                                    <div className="field"> <i className="fa fa-key"></i> <div className='eyeIcon2'><i className="fa fa-eye-slash" onClick={togglePassword2}></i></div> <input type={passwordShown2 ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} /> </div>
                                                </>
                                        }
                                        <button className="login_btn" onClick={register}>Reset Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>

    )
};

export default ResetPassword;
