import React, { Fragment, useState } from 'react';
import Loader from "../Loader/Loader";
import { useAlert } from 'react-alert'


const ResetPasswordEmail = () => {
    const alert = useAlert();
    const [email, setEmail] = useState("")

    const [loading, setLoading] = useState(false)

    const sendPasswordReset = async () => {
        setLoading(true)
        let item = { email }
        await fetch(`${process.env.REACT_APP_API_URL}/api/account/password_reset/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }).then((result) => {
            setLoading(false)
            if (result.status === 200) {
                setEmail("")
                alert.success("Check your Email")
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

                                        <div className="field"> <i className="fa fa-process.env.Relope-o"></i> <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} /> </div>

                                        <button className="login_btn" onClick={sendPasswordReset}>Reset Password</button>
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

export default ResetPasswordEmail;
