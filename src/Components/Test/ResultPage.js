import React, { useState, useEffect, Fragment } from 'react'
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert'
import { Table } from 'react-bootstrap';
import PieChar from './PieChar'
import BarChart, { Bpp } from './BarChart'
import './triangle.css'
import { useSelector, useDispatch } from "react-redux";
import { getTest } from '../../actions/Test/TestAction';
import { Button, Container, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Demo from './BarChart'
import ChartMain from './BarChart';
import Analysis from './Analysis';
import { Link, useHistory } from 'react-router-dom'



const tableData = {
    color: "#000"
}


const ResultPage6To9 = () => {

    //mui styles
    const useStyle = makeStyles((theme) => ({
        container: {
            padding: '150px 0 10px 0'
        },
        congrid: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        headbutton: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
        }

    }))

    const classes = useStyle()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const alert = useAlert()
    const history = useHistory()
    let user = JSON.parse(localStorage.getItem('user-details'));
    const dispatch = useDispatch();
    let Class = localStorage.getItem('Class')
    let typeOfTest = localStorage.getItem('typeOfTest')
    let resultTitle = localStorage.getItem('resultTitle')
    let discription = localStorage.getItem('discription')

    const { test } = useSelector((state) => state.test)

    useEffect(() => {
        if (test && test.length === 0) {
            let id = localStorage.getItem("id")
            let item = { id }
            dispatch(getTest(item));
        }
        getResult()
    }, [dispatch])

    const getResult = () => {
        let item = { Class, typeOfTest }
        fetch(`${process.env.REACT_APP_API_URL}/api/result/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user && user.access}`
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
                setData(resp)
                if (result.status !== 200) {
                    alert.error(resp)
                }
                if (resp === 404){
                    alert.error("You Need to pay")
                    return history.push('/')
                }
                deleteReportData()
                deleteBackup()
                paymentDecriment()
                setLoading(false)
            })
        })
    }


    const deleteReportData = async () => {
        let item = { Class, typeOfTest }
        await fetch(`${process.env.REACT_APP_API_URL}/api/delete-result/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
            });
        });
    };


    const deleteBackup = async () => {
        let item = { Class, typeOfTest }
        await fetch(`${process.env.REACT_APP_API_URL}/api/delete-backup/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
            });
        });
    };

    const paymentDecriment = async () => {
        let item = { Class, typeOfTest }
        await fetch(`${process.env.REACT_APP_API_URL}/api/payment-decriment/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
                if(resp === 404){
                    alert.error("Your need pay")
                    history.push('/')
                }
            });
        })
    };



    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (

                <Container className={classes.container}>
                    <Container>
                        <Grid container className={classes.congrid}>
                            <Grid item >
                                <Button className={classes.headbutton}><Typography variant='h4' style={{ color: 'white', padding: '5px' }}>{test.discreption && test.discreption.map((e) => e.resultTitle.mainHeading)} </Typography></Button>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.congrid}>
                            <Grid item >
                                <Typography variant='h5' style={{ padding: '10px' }}>{resultTitle}</Typography>
                                <Typography variant='h5' style={{ padding: '10px' }}>{discription}</Typography>
                            </Grid>
                        </Grid>


                    </Container>
                    {/* Table result */}
                    <Container>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell ><Typography variant='h4'>Area</Typography></TableCell>
                                        <TableCell align='left' ><Typography variant='h4'>Score</Typography></TableCell>
                                        <TableCell align='left'><Typography variant='h4'>Maximum Score</Typography></TableCell>
                                        <TableCell align='left' ><Typography variant='h4'>Grade</Typography></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((e) => (
                                        <TableRow key={e.section}>
                                            <TableCell component="th" scope="row">
                                                <Typography variant='h5'>{e.section}</Typography>
                                            </TableCell>
                                            <TableCell ><Typography variant='h5'>{e.totalCount}</Typography></TableCell>
                                            <TableCell><Typography variant='h5'>{e.totalNoQu}</Typography></TableCell>
                                            <TableCell ><Typography variant='h5'>{e.grade}</Typography></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Container>
                        {/* <div className="center mb-5">
                        <div className="mx-5 w-75">
                            <h2>Key to Grades</h2>
                            <table className="table text-left border text-center">
                                <thead>
                                    <tr className="score_card">
                                        <th scope="col">Area</th>
                                        <th scope="col">Score</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data.map((e) =>
                                            <tr>
                                                <td>{e.section}</td>
                                                {
                                                    Object.entries(e.interpretatio.grade.the_json).map(([k, v]) =>
                                                        <td>{`${k} - ${v}`}</td>
                                                    )}

                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div> */}

                    {
                        typeOfTest === "Mulitpal Quiz Select Test" ? (
                            
                    <Container>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell ><Typography variant='h4'>Career and Cluster</Typography></TableCell>
                                        <TableCell align='left' ><Typography variant='h4'>Section</Typography></TableCell>
                                       
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((e) => (
                                        <TableRow key={e.section}>
                                            <TableCell component="th" scope="row">
                                                <Typography variant='h5'>{e.carrer.newCareer}</Typography>
                                            </TableCell>
                                            <TableCell ><Typography variant='h5'>{e.section}</Typography></TableCell>
                                          

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Container>
                        )
                            :
                            <></>


                    }

                    <Container>
                        <Grid container className={classes.congrid}>
                            <Grid item >
                                <Typography variant='h3' style={{ padding: '30px' }}>Bar Graph Of Your Score</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container>
                        <Bpp data={data && data} />
                    </Container>
                    <Container >
                        <Analysis data={data && data}></Analysis>
                    </Container>
                </Container>

            )}
        </Fragment>
    )
}

export default ResultPage6To9
