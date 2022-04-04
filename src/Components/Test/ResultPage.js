import React, { useState, useEffect, Fragment } from 'react'
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert'
import { Table } from 'react-bootstrap';
import { Bpp } from './BarChart'
import './triangle.css'
import { useSelector, useDispatch } from "react-redux";
import { getTest } from '../../actions/Test/TestAction';
import { Button, Container, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Analysis from './Analysis';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Divider from '@mui/material/Divider';
import SideBarChart from './TypeOfTest/SideBarChart';
import ReferenceTable from './ReferenceTable';
import ScrollToTop from '../ScrollToTop';


const ResultPage6To9 = () => {


    //mui styles
    const useStyle = makeStyles((theme) => ({
        container: {
            padding: '100px 0 10px 0'
        },
        congrid: {
          
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
    const [data2, setData2] = useState([])
    const [carrerData, setCarrerData] = useState([])
    const [loading, setLoading] = useState(true)
    const alert = useAlert()
    const history = useHistory()
    let user = JSON.parse(localStorage.getItem('user-details'));
    const dispatch = useDispatch();
    let Class = localStorage.getItem('Class')
    let typeOfTest = localStorage.getItem('typeOfTest')
    let resultTitle = localStorage.getItem('resultTitle')
    let discription = localStorage.getItem('discription')
    let classSection = localStorage.getItem('classSection')

    let filNot = []
    let filterSectionAbcforSection = []


    const { test } = useSelector((state) => state.test)


    useEffect(() => {
        if (test && test.length === 0) {
            let id = localStorage.getItem("id")
            let item = { id, classSection }
            dispatch(getTest(item));
        }
        if (localStorage.getItem('typeOfTest') === "Mulitpal Quiz Select Test") {
            carrer_get()
        }

        getResult()
    }, [dispatch])

    const getResult = () => {
        let item = { Class, typeOfTest, classSection }
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
                if (typeOfTest == "One Images Quiz Correct Test") {
                    setData(resp[1])
                    setData2(resp[0])
                } else {
                    setData(resp)
                    console.log(data)
                }
                if (resp === 404) {
                    alert.error("You Need to pay")
                    return history.push('/')
                }
                setLoading(false)
            })
        })
    }

    const carrer_get = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/carrer-description/`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Authorization: `Bearer ${user && user.access}`,
            },
        }).then((result) => {
            result.json().then((resp) => {
                setCarrerData(resp)
            });
        });
    };
    // console.log(carrerData)


    let array = []
    let arrayy = []
    data2 &&
        data2.forEach((e, index) => {
            array.push(e.totalCount);
            arrayy.push(e.section);
        });

    
    return (
        <Fragment>
            <ScrollToTop/>
            {loading ? (
                <Loader />
            ) : (
                <Container className={classes.container}>
                    <Container>
                        <Grid container className={classes.congrid}>
                            <Grid item lg={10} >
                                <Button className={classes.headbutton}><Typography variant='h4' style={{ color: 'white', padding: '5px' }}>{test.discreption && test.discreption.map((e) => e.resultTitle.mainHeading)} </Typography></Button>

                            </Grid>
                            <Grid item lg={2} >

                                <Button className={classes.headbutton} onClick={() => window.print()}><Typography variant='h4' style={{ color: 'white', padding: '5px' }}>Print</Typography></Button>
                            </Grid>
                        </Grid>

                        <Container style={{ marginTop: '30px' }}>
                            {
                                test.discreption && test.discreption.map((e) =>

                                    <div
                                        dangerouslySetInnerHTML={{ __html: e.resultTitle.discription }}
                                    />
                                )
                            }
                        </Container>

                        {/* 
                        <Grid container className={classes.congrid}>
                            <Grid item >
                                <Typography variant='h4' style={{ padding: '10px' }}>{resultTitle}</Typography>
                                <Typography style={{ padding: '10px', textAlign: 'left', fontSize: '19px' }}>{discription}</Typography>
                            </Grid>
                        </Grid> */}
                    </Container>

                    {/* career cluster description */}

                    {
                        typeOfTest == "One Images Quiz Correct Test" || typeOfTest === "Mulitpal Quiz Select Test" ?
                            <Container style={{ marginTop: '30px' }}>
                                {typeOfTest == "One Images Quiz Correct Test" ? <h1 style={{ textAlign: 'center' }}>General Information about various Abilities:</h1>
                                    : <h1 style={{ textAlign: 'center' }}>General Information about various Career Clusters:</h1>}

                                {test.discreption && test.discreption.map((e) =>
                                    <>
                                        <Grid container style={{ paddingTop: '20px' }}>
                                            {
                                                Object.entries(e.resultTitle.the_json).map(([k, v]) =>
                                                    <div style={{ textAlign: 'left', padding: '10px' }}>
                                                        <Typography variant='h4'>{k}: <Typography variant='h5'>{v}</Typography></Typography>
                                                        <Divider />
                                                    </div>
                                                )
                                            }
                                        </Grid>
                                    </>
                                )}
                            </Container>
                            :
                            ""
                    }



{/* key to grade */}

<div className="center mb-5 mt-5">
                        <div className="mx-5 w-100">
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
                                                {
                                                    e.interpretatio ?
                                                        <td><Typography variant='h5'>{e.section}</Typography></td>
                                                        :
                                                        <></>
                                                }

                                                {
                                                    e.interpretatio ?
                                                        Object.entries(e.interpretatio.grade.the_json && e.interpretatio.grade.the_json).map(([k, v]) =>
                                                            <td><Typography variant='h5'>{`${k} - ${v}`}</Typography></td>
                                                        ) :
                                                        <></>
                                                }

                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                        

                        {/* Table result */}
                        





                    <Container style={{ paddingTop: '40px' }}>
                        {
                            typeOfTest === "Mulitpal Quiz Select Test" ?
                                <h1>Your Test Score & Performance Index for Career Cluster Assessment</h1>
                                :
                                ""
                        }
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col"><Typography variant='h5'>Serial No.</Typography></th>
                                     <th scope="col"><Typography variant='h5'>Area</Typography></th>
                                    <th scope="col"><Typography variant='h5'>Score</Typography></th>
                                    <th scope="col"><Typography variant='h5'>Maximum Score</Typography></th>
                                    <th scope="col"><Typography variant='h5'>Grade</Typography></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((e,i) =>
                                    <tr>
                                        <td><Typography variant='h5'>{i+1}</Typography></td>
                                        <td><Typography variant='h5'>{e.section}</Typography></td>
                                        <td><Typography variant='h5'>{Math.ceil(e.totalCount)}</Typography></td>
                                        <td><Typography variant='h5'>{Math.ceil(e.totalNoQu)}</Typography></td>
                                        <td><Typography variant='h5'>{e.grade}</Typography></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Container>


                

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
                                           {/* <TableBody>
                                            {data.map((e) => (
                                                <TableRow key={e.section}>
                                                    <TableCell component="th" scope="row">
                                                        <Typography variant='h5'>{e.carrer.newCareer}</Typography>
                                                    </TableCell>
                                                    <TableCell ><Typography variant='h5'>{e.section}</Typography></TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody> */}
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
                                {
                                    typeOfTest === "Mulitpal Quiz Select Test" ?
                                        <Typography variant='h3' style={{ padding: '30px' }}>Career Cluster AssessmentBar Chart</Typography>

                                        :
                                        <Typography variant='h3' style={{ padding: '30px' }}>Bar Graph Of Your Score</Typography>

                                }
                            </Grid>
                        </Grid>
                    </Container>
                    <Container>
                        <Bpp datas={data && data} />
                    </Container>
                     {typeOfTest === "Mulitpal Quiz Select Test" ? (
                
                <Container>
                    <Grid container style={{padding:"10px 0"}}>
                        {data.map((e,i) =>
                            
                         <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{border:'1px solid black'}}>
                                <Typography variant='h4' style={{ color: 'black' }}> {i+1}.{ e.section}</Typography>
                     </Grid>)
                        }
                </Grid>
                </Container>) : ""}
                    <Container >
                        <Analysis data={data && data} carrerData={carrerData && carrerData}></Analysis>
                    </Container>
                </Container>
            )}

           


            {
                typeOfTest === "Mulitpal Quiz Select Test" ?
                    <Container>
                        <Typography variant='h4' style={{ 'fontWeight': '600px', color:"black",textAlign:"left" }}>
                            * If marks are below 8 in the three top Career Clusters suggested above. It is important that you need to work hard (put more efforts) in these cluster if opted by you.

                        </Typography>
                        <Typography variant='h4' style={{ 'fontWeight': '800px', color:"black",textAlign:'right' }}>
                            Chairperson
                            (ABERD)

                          </Typography>
                    </Container>
                    :
                    ""
            }

            <div>
                {
                    typeOfTest === "One Images Quiz Correct Test" ?
                        <ResultPage data={data2} array={array && array} arrayy={arrayy && arrayy} loading={loading} />
                        :
                        ""
                }

            </div>
        </Fragment>

    )
}

export default ResultPage6To9




export const ResultPage = ({ data, array, arrayy,loading }) => {
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
    let typeOfTest = localStorage.getItem('typeOfTest')
    const classes = useStyle()


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Container className={classes.container}>
                    {/* Table result */}
                    <div>
                        <h1 style={{ textAlign: 'center' }}>IMPORTANCE OF INTEREST INVENTORY</h1>
                        <Typography style={{ textAlign: 'left', fontSize: "19px" }}>The interest inventories are designed to help into areas where you are likely to find the greatest job satisfaction. It is not a measure of general or specific abilities, including intelligence. Such traits are related to a person performance on the job than to their satisfaction on the job. These factors or traits like aptitude, abilities, intelligence and personality should be determined by other means and should be considered alongwith the interest scores.</Typography>
                    </div>
                    <Container>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                            
                                
                                    <th scope="col"><Typography variant='h5'>Id</Typography></th>
                                    <th scope="col"><Typography variant='h5'>Score</Typography></th>
                                    <th scope="col"><Typography variant='h5'>Maximum Score</Typography></th>
                                    <th scope="col"><Typography variant='h5'>Grade</Typography></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((e) =>
                                    <tr>
                                        <td><Typography variant='h5'>{e.index}</Typography></td>
                                        <td><Typography variant='h5'>{e.totalCount}</Typography></td>
                                        <td><Typography variant='h5'>{e.totalNoQu}</Typography></td>
                                        <td><Typography variant='h5'>{e.grade}</Typography></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Container>


                    <div className="center mb-5 mt-5">
                        <div className="mx-5 w-100">
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
                                                {
                                                    e.interpretatio ?
                                                        <td><Typography variant='h5'>{e.section}</Typography></td>
                                                        :
                                                        <></>
                                                }

                                                {
                                                    e.interpretatio ?
                                                        Object.entries(e.interpretatio.grade.the_json).map(([k, v]) =>
                                                            <td><Typography variant='h5'>{`${k} - ${v}`}</Typography></td>
                                                        ) :
                                                        <></>
                                                }

                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Container>
                        <Grid container className={classes.congrid}>
                            <Grid item >
                                <Typography variant='h3' style={{ padding: '30px' }}>Bar Graph Of Your Score</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container>
                        <SideBarChart arrayOne={array} arrayTwo={arrayy} />
                    </Container>
                    <Container >
                        <Analysis data={data && data}></Analysis>
                    </Container>
            <ReferenceTable />
                </Container>)}
             
        </Fragment>
    )
}

