import React, { useEffect } from "react"
import { Link } from 'react-router-dom'

import { getTest } from '../../actions/Test/TestAction'
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { Button } from "@mui/material";
import './triangle.css'


const Assessment = () => {

    const { test, loading } = useSelector((state) => state.test)
    const dispatch = useDispatch();

    useEffect(() => {
        if (test && test.length === 0) {
            let id = localStorage.getItem("id")
            let item = { id }
            dispatch(getTest(item));
        }
    }, [dispatch])


    let timeArray = []
    test.discreption &&
        test.discreption.forEach((item, index) => {
            timeArray.push(item.title.duration);
            localStorage.setItem("time", item.title.duration)
        });

    // if (loading) {
    //     return <Loader />
    // }

    return (
        <div>
            {/* <!-- Welcome My Guru section  --> */}
            <div className="section margin-top_7">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="full">
                                <div className="mt-4">
                                    <img className="col-lg-2 img-fluid" src="assets/images/logo.png" alt="" />
                                    <h1 className="text-center fs-1 fw-bold">Career Assessment Test</h1>
                                </div>
                                <div className="full mt-3">
                                    <h1 className="text-start mt-3 ml-4 fw-bold gray">General Instructions</h1>
                                    <div className=" ">
                                        <h1 className="text-center mt-3 gray">Please read the instructions carefully</h1>
                                        <p style={{ textAlign: 'left', fontSize: '19px', fontWeight: '500', marginLeft: '20px' }}>Instructions for students:</p>
                                    </div>
                                    <div>
                                        <ul style={{ textAlign: 'left', fontSize: '14px' }}  >
                                            <div>
                                                {
                                                    test.discreption && test.discreption.map((e) =>
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: e.title.generalInstructions }}
                                                        />
                                                    )
                                                }
                                            </div>

                                        </ul>
                                    </div>
                                    <div style={{ padding: '40px' }}>
                                        <Link to='/testpage'>   <Button >  <div className="button_slide slide_down">Proceed to Test </div></Button> </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end section --> */}
        </div>
    )
}

export default Assessment