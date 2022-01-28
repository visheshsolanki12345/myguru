import React, { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { Avatar, Button, Container, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getTest } from "../../../actions/Test/TestAction";
import '../triangle.css'

const ImageQuiz1 = ({ test }) => {

    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState(0);

    // console.log()
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    history.push('/result')
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    let rows = []

    const useStyle = makeStyles((theme) => ({
        container: {
            padding: '150px 0 10px 0'
        },
        grids1: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            padding: '5px',

        }
        ,
        grids2: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            padding: '5px'
        },
        buttons: {
            background: 'green',
            border: 0,
            borderRadius: 3,

            color: 'white',
            height: 60,
            padding: '0 30px',
            width: '240px',
            "&:hover": {
                background: '#eb3838'
            }
        },
        buttons1: {
            background: 'linear-gradient(45deg, #548CFF 30%, #548CFF 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',

            border: 0,
            borderRadius: 3,
            fontSize: '15px',
            color: 'white',
            height: 50,
            padding: '0 30px',
            width: '140px',

        },
        congrid: {
            alignItems: 'start',
            justifyContent: 'start',
            margin: '20px',
            [theme.breakpoints.down('md')]: {
                alignItems: 'center',
                justifyContent: 'center',
            }
        },
        headbutton: {
            background: "linear-gradient(45deg, #009628 30%, #009628 90%)",
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
        }
    }))
    const classes = useStyle()
    let i;

    let arrs = []

    const alert = useAlert();
    const history = useHistory();
    const [sect, setSect] = useState(0);
    const [radioselect, setRadioSelect] = useState();
    const [backup, setBackup] = useState([]);
    let user = JSON.parse(localStorage.getItem('user-details'));
    let arra = []

    const dispatch = useDispatch();

    const handleSect = (index) => {
        setSect(index)
        window.scrollTo(0, 0)
        getBackup()

    }
    //new code

    let Class = localStorage.getItem('Class')
    let typeOfTest = localStorage.getItem('typeOfTest')
    let classSection = localStorage.getItem('classSection')



    useEffect(() => {
        if (test && test.length === 0) {
            let id = localStorage.getItem("id")
            let item = { id, classSection }
            dispatch(getTest(item));
        }
        getBackupData()
    }, [dispatch])


    const submit = (marks, section, obj, rightAns, question) => {
        const lastTime = `${minutes}-${seconds}`
        var carrer = ''


        if ("/media/" + rightAns === obj) {
            alert.success("Right Ans")
            sendDataResult(typeOfTest, Class, section, question, marks[0], carrer, lastTime, obj)
            return
        } else {
            alert.error("Wrong Ans")
            let marks = 0
            sendDataResult(typeOfTest, Class, section, question, marks[0], carrer, lastTime, obj)
            return
        }
    };


    const sendDataResult = async (typeOfTest, Class, section, question, marks) => {
        let item = { typeOfTest, Class, section, question, marks, classSection };
        await fetch(`${process.env.REACT_APP_API_URL}/api/save-result/`, {
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


    const getBackup = async () => {
        let item = { typeOfTest, Class, classSection }
        await fetch(`${process.env.REACT_APP_API_URL}/api/get-backup/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
                setBackup(resp)
            });
        });
    };

    const getBackupData = async () => {
        let item = { typeOfTest, Class, classSection }
        await fetch(`${process.env.REACT_APP_API_URL}/api/get-backup/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
                setBackup(resp)
                if (resp.length !== 0) {
                    if (resp[resp.length - 1].lastTime.split("-")[1] === '0') {
                        setSeconds(1)
                    } else {
                        setSeconds(resp[resp.length - 1].lastTime.split("-")[1])
                    }
                    setMinutes(resp[resp.length - 1].lastTime.split("-")[0])
                    return getBackupData
                }
                setMinutes(localStorage.getItem("time"))
            });
        });
    };


    const handleRadio = (i) => {
        setRadioSelect(i)
    }
    test.discreption &&
        test.discreption.forEach((item, index) => {
            rows.push(item.typeOfTest.selectTest);
        });

    let timeArray = []
    if (backup && backup.length === 0) {
        test.discreption &&
            test.discreption.forEach((item, index) => {
                timeArray.push(item.title.duration);
                localStorage.setItem("time", item.title.duration)
            });
    }


    if (test.data) {
        for (i = 0; i < test.data.length; i++) {
            arra.push(test.data[i].section.section)
        }
        arrs = new Set(arra)
        arrs = Array.from(arrs)
    }



    return (
        <>

            <Container className={classes.container}>
                <Grid container>
                    <Grid item xs={6} sm={6} className={classes.grids1}>
                        <div style={{ marginBottom: '10px' }}><Avatar src="/broken-image.jpg" /></div>
                        <Typography variant='h5' >Candidate Name: {user && user.last_name}</Typography>
                        <Typography variant="h5">Exam Name: {Class} th</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} className={classes.grids2}>
                        <Typography variant='h5' >Total Questions: {test.data && test.data.length}</Typography>
                        <Typography variant="h5">Total Time:{test.discreption && Number(test.discreption[0].title.duration)} </Typography>
                        <Typography variant="h4" style={{ display: 'flex' }}>Time Left: &nbsp; </Typography>
                        {minutes === 0 && seconds === 0
                            ? ''
                            : <>
                                <Typography variant='h4' style={{ color: 'red' }}> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Typography> </>
                        }
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={3} className={classes.grids1}>
                        <Typography variant="h3" style={{ alignSelf: 'center' }}>Sections </Typography>

                        <Container>
                            {arrs && arrs.map((a, index) => <div className='p-3'> <Button key={index} variant='contained' className={classes.buttons} onClick={() => handleSect(index)} style={{ background: sect === index ? "linear-gradient(45deg, #FFBD35 30%, #FFBD35 90%)" : 'linear-gradient(45deg, #548CFF 30%, #548CFF 90%)', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}><Typography variant='h5' style={{ color: 'white', fontWeight: '700', fontSize: '' }}>{a}</Typography></Button></div>

                            )}
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={9} className={classes.grids2}>
                        {

                            test.data && test.data.map((e, i) => {
                                if (arrs[sect] == e.section.section) {

                                    return <Container align='left'>
                                        <Divider light='false' />
                                        <FormControl component="fieldset">

                                            <FormLabel component="legend"><Typography variant='h4' className='d-flex row'> <div> Q{i + 1}. {e.questionText}</div>  <img style={{ height: '400px', width: '400px' }} src={process.env.REACT_APP_API_URL + e.question}></img></Typography></FormLabel>
                                            <RadioGroup
                                                aria-label=""
                                                defaultValue=""
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel checked={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.a)}
                                                    name={e.id} value={e.a}
                                                    disabled={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id ? true : false)}
                                                    onChange={() => submit(test.discreption && test.discreption.map((e) => e.selectNumber.rightAns),
                                                        e.section.section, e.a, e.rightAns, e.question)} control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.aText}</div> <img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.a}></img></Typography>} />

                                                <FormControlLabel checked={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.b)}
                                                    name={e.id} value={e.b}
                                                    disabled={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id ? true : false)}
                                                    onChange={() => submit(test.discreption && test.discreption.map((e) => e.selectNumber.rightAns),
                                                        e.section.section, e.b, e.rightAns, e.question,
                                                    )}

                                                    control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.bText}</div>  <img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.b}></img></Typography>} />

                                                <FormControlLabel checked={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.c)}
                                                    name={e.id} value={e.c}
                                                    disabled={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id ? true : false)}
                                                    onChange={() =>
                                                        submit(test.discreption && test.discreption.map((e) => e.selectNumber.rightAns),
                                                            e.section.section, e.c, e.rightAns, e.question)} control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.cText}</div> <img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.c}></img></Typography>} />
                                                {e.d ? <FormControlLabel checked={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.d)}
                                                    name={e.id} value={e.d}
                                                    disabled={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id ? true : false)}
                                                    onChange={() =>
                                                        submit(test.discreption && test.discreption.map((e) => e.selectNumber.rightAns),
                                                            e.section.section, e.d, e.rightAns, e.question,
                                                        )} control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.dText}</div><img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.d}></img></Typography>} /> : ''}

                                                {e.e ? <FormControlLabel checked={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.e)}
                                                    name={e.id} value={e.e}
                                                    disabled={backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id ? true : false)}
                                                    onChange={() =>
                                                        submit(test.discreption && test.discreption.map((e) => e.selectNumber.rightAns),
                                                            e.section.section, e.e, e.rightAns, e.question)} control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.eText}</div><img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.e}></img></Typography>} /> : ''}
                                            </RadioGroup>
                                        </FormControl>

                                    </Container>
                                }
                            }

                            )
                        }
                        <Grid container align='left' >
                            <Grid item xs={6} md={8} > <Button onClick={() => sect > 0 && sect < arrs.length ? handleSect(sect - 1) : ''} ><div className="button_slidenext slide_rightnext" >Previous</div></Button>
                            </Grid>

                            {
                                sect < arrs.length - 1 ?
                                    <Grid item xs={6} md={4} > <Button onClick={() => sect < arrs.length - 1 ? handleSect(sect + 1) : ''} > <div className="button_slidenext slide_rightnext" >Next</div></Button>
                                    </Grid>
                                    :
                                    <Grid item xs={6} md={4} > <Link to="/result" ><Button > <div className="button_slidenext slide_rightnext" >Submit</div></Button></Link>
                                    </Grid>
                            }
                        </Grid>

                    </Grid>

                </Grid>
                <Grid container className={classes.congrid}>
                    <Grid item >
                        <Link to="/result" >
                            <span className="btn10">Submit Test</span>
                            <div className="transition"></div>      </Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ImageQuiz1;
