

import '../css/bootstrap.min.css'
import '../css/pogo-slider.min.css'
import '../css/style.css'
import '../css/custom.css'
import { useAlert } from 'react-alert'
import Loader from '../Loader/Loader'
import React, { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { getTest } from '../../actions/Test/TestAction'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { Button } from '@mui/material'
import './triangle.css'

const PaymentSummary = () => {

    //------------------------------------- Hooks & Variable ------------------------------------------------//
    const [test, setTest] = useState([])
    const [loading, setLoading] = useState()
    const dispatch = useDispatch();
    const alert = useAlert()
    let user = JSON.parse(localStorage.getItem('user-details'));
    let cont = localStorage.getItem('continue')
    let id = localStorage.getItem("id")
    let classSection = localStorage.getItem("classSection")
    const history = useHistory()

    useEffect(() => {
        let item = { id, classSection }
        getData(item)
    }, [])


    //  paytem
    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    function isObj(val) {
        return typeof val === 'object'

    }

    function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    function buildForm({ action, params }) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }
    function post(details) {
        setLoading(true)
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
        setLoading(false)
    }

    const payTemPayment = async () => {
        setLoading(true)
        let item = { id, classSection }
        await fetch(`${process.env.REACT_APP_API_URL}/api/test-payment-done/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
                if (resp === 304) {
                    alert.error("Payment processed")
                    return history.push("/")
                } else {
                    var information = {
                        action: "https://securegw-stage.paytm.in/order/process",
                        params: resp
                    }
                    post(information);
                    setLoading(false)
                }
            });
        });
    };

    var rows = []
    var rows2 = []

    const getData = async () => {
        setLoading(true)
        let item = { id, classSection }
        await fetch(`${process.env.REACT_APP_API_URL}/api/test-info/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            if (result.status === 401){
                return history.push('/login')
            }
            result.json().then((resp) => {
                setTest(resp)
                resp.discreption.forEach((item, index) => {
                    rows.push(item.typeOfTest.selectTest);
                });
                resp.discreption.forEach((item, index) => {
                    rows2.push(item.className.newClass);
                });
                localStorage.setItem("typeOfTest", rows[0])
                localStorage.setItem("Class", rows2[0])
                rows.length = 0
                rows2.length = 0
                setLoading(false)
            });
        });
    };


    // styles material ui
    const useStyle = makeStyles((theme) => ({
        container: {
            padding: '150px 0 10px 0',
            maxWidth: '100%!important',

        },
        contagrid: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        careerass: {
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            background: 'linear-gradient(45deg, #548CFF 30%, #FF8E53 90%)',
            maxWidth: '100%!important',
            marginTop: '5px',
            padding: '20px',
        },
        buttons: {
            background: 'linear-gradient(45deg, #009628 30%, #009628 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            width: '170px',
            padding: '10px 30px',
        }


    }))
    const classes = useStyle()


    const continueTest = async () => {
        let item = { id, classSection }
        dispatch(getTest(item));
        history.push('/paymentassessment')
    }

    //------------------------------------- Loader ------------------------------------------------//
    if (loading) {
        return <Loader />
    }

    //------------------------------------- Main Root ------------------------------------------------//
    return (
        <Container className={classes.container}>
            <Grid className={classes.contagrid} container style={{ background: 'linear-gradient(45deg, #548CFF 30%, #FF8E53 90%)' }}>
                <Grid item> <Typography variant='h3' style={{ color: 'white' }}  >Payment Summary</Typography></Grid>
            </Grid>
            <Container className={classes.careerass}>
                <Grid container>
                    <Grid item lg={12}> <Typography variant='h2' style={{ color: 'white' }}>Career Assessment Test</Typography></Grid>
                    <Grid item lg={6}>
                        {
                            test.discreption && test.discreption.map((e) =>
                                <div className="float-left" key={e.id}>
                                    <Typography variant='h4' className="text-start mt-3 text-light">Duration : <span>{e.title.duration}</span> minutes</Typography>
                                    <Typography variant='h4' className="text-start mt-3 text-light">Student Name : <span>{user && user.last_name}</span></Typography>
                                    {/* <h1 className="text-start mt-3 fw-bold text-light">Date : <span>{e.date}</span></h1> */}
                                    <Typography variant='h4' className="text-start mt-3 text-light">Class : <span>{e.className.newClass}</span></Typography>
                                    <Typography variant='h4' className="text-start mt-3 text-light">Test Instruction : <span>{e.title.description}</span></Typography>
                                </div>
                            )
                        }
                    </Grid>
                    <Grid item lg={6}><div className="float-right mr-5">
                        <img style={{ width: "250px" }} className="img-fluid" src="assets/images/logo.png" alt="image" />
                        {
                            test.discreption && test.discreption.map((e) =>
                                <Typography variant='h3' className="mt-4 mr-5 text-light" key={e.id}>Amount to be paid:<b> ₹ {e.title.price}</b></Typography>
                            )
                        }

                        {
                            cont ?
                                <Button onClick={() => continueTest()} ><div className="button_slide slide_right"> Continue </div></Button>
                                :
                                test.signal && test.signal === '201' ?
                                    <Button  onClick={() => continueTest()} ><div className="button_slide slide_right"> Continue </div></Button>
                                    :
                                    <Button  onClick={() => payTemPayment()}><div className="button_slide slide_right"> Pay </div></Button>
                        }
                    </div></Grid>

                </Grid>
            </Container>
        </Container>
    )
}

export default PaymentSummary
