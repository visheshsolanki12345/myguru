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
import axios from 'axios'

const ImageQuiz1 = ({ test }) => {

    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState(0);
    const [sect, setSect] = useState(0);
    const [timeSection, setTimeSection] = useState("");
    const [questionLen, setQuestionLen] = useState(test.data && test.data.filter((e) => e.section.section === test.data[0].section.section).length);
    const [sectionWiseTime, setSectionWiseTime] = useState("");
    const [backup, setBackup] = useState([]);
    // const [sectionABC, setSectionABC] = useState([]);
    let lastSection = []
    let timeArray = []
    let filterSectionAbc = []
    let filterSectionAbcforSection = []


    let sectionABC = JSON.parse(localStorage.getItem("array"))
    

    const getInterestSec = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/interest-sections/`)
        localStorage.setItem("array", JSON.stringify(data && data.map((e) => e.sectionInterest)));
        // setSectionABC(propertyValues)
    }
    

    const findAbc = (abc) => {
        if (sectionABC.find((e) => e === abc)) {
            return true
        }
        else {
            return false
        }
    }

    const filterAbc = (abc) => {
        let fil = backup.filter((p) => p.imageOneQuizeCorrect.section.section === abc)
        if (fil.length !== 0) {
            filterSectionAbc.push(fil)
        }
    }

    const filterAbcforSection = (abc) => {
        let fil = test.data && test.data.filter((p) => p.section.section === abc)
        if (fil.length !== 0) {
            filterSectionAbcforSection.push(fil)
        }

    }


    const filterMap = () => {
        sectionABC.map((e) => filterAbc(e))
    }

    const filterMapSection = () => {
        sectionABC.map((e) => filterAbcforSection(e))
    }

    let arrs = []

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds == 0) {
                if (minutes == 0) {
                    clearInterval(myInterval)
                    if (arrs && sect === arrs.length - 1) {
                        if (lastSection[0] == arrs[sect]) {
                            return history.push('/result')
                        }
                    }
                    let backupFilter = test.data && test.data.filter((p) => p.section.section === arrs[sect + 1])
                    setMinutes(backupFilter[0].section.duration)

                    if (arrs && sect < arrs.length - 1) {

                        setSect(sect + 1)
                    }
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
    let oneOption = 'One Quiz Correct Test'
    let imageTest = "One Images Quiz Correct Test"
    let allOption = "Mulitpal Quiz Select Test"
    let threeOption = "Three Quiz Test"
    let fiveOption = "Five Quiz Test"


    const alert = useAlert();
    const history = useHistory();

    const [radioselect, setRadioSelect] = useState();
    let user = JSON.parse(localStorage.getItem('user-details'));

    let Class = localStorage.getItem('Class')
    let typeOfTest = localStorage.getItem('typeOfTest')
    let classSection = localStorage.getItem('classSection')


    let arra = []

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem("time")
        localStorage.removeItem("timeing")
        localStorage.removeItem("array")
        if (test && test.length === 0) {
            let id = localStorage.getItem("id")
            let item = { id, classSection }
        }
        getBackupData()
        getBackupDataFindTime()
        getInterestSec()
    }, [dispatch])

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
            });
        });
    }

    const getBackupDataFindTime = async () => {
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
                getTime(resp)
            });
        });
    }


    const getTime = (resp) => {
        setSectionWiseTime(test.data && test.data[0].section.duration)

        if (resp && resp.length === 0) {
            localStorage.setItem("time", test.data && test.data[0].section.duration)
            setMinutes(localStorage.getItem("time"))
            setSeconds(0)
            // setQuestionLen(firstTime.length)
            setSectionWiseTime(localStorage.getItem("time"))
            localStorage.removeItem("timeing")

        } else {
            let a = test.data && test.data[0].section.section
            if (resp && resp.find((p) => p.imageOneQuizeCorrect.section.section === a)) {
                let backupFilter = resp && resp.filter((p) => p.imageOneQuizeCorrect.section.section === a)
                if (backupFilter[backupFilter.length - 1].lastTime.split("-")[1] === '0') {
                    setSeconds(1)
                } else {
                    setSeconds(backupFilter[backupFilter.length - 1].lastTime.split("-")[1])
                }
                setMinutes(backupFilter[backupFilter.length - 1].lastTime.split("-")[0])
                localStorage.removeItem("timeing")
            }
        }
    }

    const handleSect = (a, index) => {
        console.log('section', a)
        console.log('index', index)
        const lastTime = `${minutes}-${seconds}`
        const section = arrs[sect]
        let item = { lastTime, section }
        fetch(`${process.env.REACT_APP_API_URL}/api/last-time/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
                let firstTime = test.data && test.data.filter((e) => e.section.section === a)
                setQuestionLen(firstTime.length)
                setSectionWiseTime(firstTime[0].section.duration)
                getBackup()
                setSect(index)
                window.scrollTo(0, 0)
                if (backup.length !== 0) {
                    let check = findAbc(a)
                    if (check == true) {
                        filterMap()
                        filterMapSection()
                        let resp = filterSectionAbc[0]
                        setQuestionLen(([].concat.apply([], filterSectionAbcforSection).length))
                        setSectionWiseTime(timeArray[0])
                        if (filterSectionAbc.length !== 0) {
                            if (localStorage.getItem('timeing') == '1') {
                                return
                            } else {
                                if (resp[resp.length - 1].lastTime.split("-")[1] === '0') {
                                    setSeconds(1)
                                } else {
                                    setSeconds(resp[resp.length - 1].lastTime.split("-")[1])
                                }
                                setMinutes(resp[resp.length - 1].lastTime.split("-")[0])
                                localStorage.setItem('timeing', '1')
                                return
                            }
                        }
                    }

                    if (backup && backup.find((p) => p.imageOneQuizeCorrect.section.section === a)) {
                        let check = findAbc(a)
                        if (check === false) {
                            let resp = backup && backup.filter((p) => p.imageOneQuizeCorrect.section.section === a)

                            if (resp[resp.length - 1].lastTime.split("-")[1] === '0') {
                                setSeconds(1)
                            } else {
                                setSeconds(resp[resp.length - 1].lastTime.split("-")[1])
                            }
                            setMinutes(resp[resp.length - 1].lastTime.split("-")[0])
                            localStorage.removeItem("timeing")
                        } else {
                            setSeconds(0)
                            setMinutes(timeArray[0])
                            filterMap()
                            console.log(filterSectionAbc)
                            setQuestionLen(filterSectionAbc[0].length)
                            localStorage.setItem('timeing', '1')
                        }

                    } else {
                        let check = findAbc(a)
                        if (check === true) {
                            setSeconds(0)
                            setMinutes(timeArray[0])
                            setTimeSection(timeArray[0])
                            filterMap()
                            localStorage.setItem('timeing', '1')
                        } else {
                            let firstTime = test.data && test.data.filter((e) => e.section.section === a)
                            setSeconds(0)
                            setMinutes(firstTime[0].section.duration)
                            localStorage.removeItem("timeing")
                        }
                    }
                } else {
                    let check = findAbc(a)
                    if (check === true) {
                        setSeconds(0)
                        setMinutes(timeArray[0])
                        localStorage.setItem('timeing', '1')
                    } else {
                        firstTimeFunc(a)
                    }
                }
            });
        });
    }


    test.discreption &&
        test.discreption.forEach((item, index) => {
            timeArray.push(item.title.duration);
            //   if (item.typeOfTest.selectTest === imageTest) {
            //     localStorage.setItem("time", item.title.duration)
            //   }
        });

    const firstTimeFunc = (a) => {
        setSeconds(0)
        let fillFirstData = test.data && test.data.filter((e, i) => a === e.section.section)
        setMinutes(fillFirstData[0].section.duration)
    }

    //new code
    const submit = (section, question, object, rightAns, marks) => {
        console.log(rightAns)
        console.log(object)

        const lastTime = `${minutes}-${seconds}`
        var carrer = ''
        if (findAbc(section) === true) {
            return sendDataResult(typeOfTest, Class, section, question, marks[0], carrer, lastTime, object)
        }
        if (rightAns === object) {
            alert.success("Right Ans")
            sendDataResult(typeOfTest, Class, section, question, marks, carrer, lastTime, object)
            return
        } else {
            alert.error("Wrong Ans")
            let marks = 0
            sendDataResult(typeOfTest, Class, section, question, marks, carrer, lastTime, object)
            return
        }
    };


    const sendDataResult = async (typeOfTest, Class, section, question, marks, carrer, lastTime, object) => {
        let item = { typeOfTest, Class, section, question, marks, carrer, classSection, lastTime, object };
        await fetch(`${process.env.REACT_APP_API_URL}/api/test/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user && user.access}`,
            },
            body: JSON.stringify(item),
        }).then((result) => {
            result.json().then((resp) => {
                getBackupData()
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


    const handleRadio = (i) => {
        setRadioSelect(i)
    }
    test.discreption &&
        test.discreption.forEach((item, index) => {
            rows.push(item.typeOfTest.selectTest);
        });



    if (test.data) {
        for (i = 0; i < test.data.length; i++) {
            arra.push(test.data[i].section.section)
            // timeSectionArray.push(test.data[i].section.duration)
        }
        arrs = new Set(arra)
        arrs = Array.from(arrs)
    }
    lastSection.push(arrs[arrs.length - 1])

    // console.log(sectionABC)
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
                        <Typography variant='h5' >Total Questions: {questionLen}</Typography>
                        <Typography variant="h5">Total Time:{Number(sectionWiseTime)} </Typography>
                        <Typography variant="h4" style={{ display: 'flex' }}>Time Left: &nbsp; </Typography>
                        {minutes === 0 && seconds === 0
                            ? ''
                            : <>
                                <Typography variant='h4' style={{ color: 'red' }}> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Typography>
                            </>
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
                            {arrs && arrs.map((a, index) => <div className='p-3'> <Button key={index} variant='contained' className={classes.buttons} onClick={() => handleSect(a, index)} style={{ background: sect === index ? "linear-gradient(45deg, #FFBD35 30%, #FFBD35 90%)" : 'linear-gradient(45deg, #548CFF 30%, #548CFF 90%)', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}><Typography variant='h5' style={{ color: 'white', fontWeight: '700', fontSize: '' }}>{a}</Typography></Button></div>
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
                                            <FormLabel component="legend"><Typography variant='h4' className='d-flex row'>
                                                <div> Q{i + 1}. {e.questionText ? e.questionText : ""}</div>  {e.question ? <img style={{ height: '400px', width: '400px' }} src={process.env.REACT_APP_API_URL + e.question}></img> : ""}</Typography></FormLabel>

                                            <RadioGroup
                                                aria-label=""
                                                defaultValue=""
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel
                                                    checked={
                                                        e.aText ?
                                                            backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.aText ? true : false)
                                                            :
                                                            backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.a ? true : false)
                                                    }
                                                    name={e.id} value={e.a ? e.a : e.aText}
                                                    control={<Radio />}

                                                    onChange={() => submit(e.section.section, e.question ? e.question : e.questionText, e.a ? e.a : e.aText, e.rightAns, findAbc(e.section.section) === false ? e.section.number : test.discreption && test.discreption.map((n) => n.selectNumber.a))}
                                                    label={<Typography variant='h5' className='d-flex row'> <div>{e.aText ? e.aText : ""}</div> {e.a ? <img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.a}></img> : ""}</Typography>} />


                                                <FormControlLabel
                                                    checked={
                                                        e.bText ?
                                                            backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.bText ? true : false)
                                                            :
                                                            backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.b ? true : false)
                                                    }
                                                    name={e.id} value={e.b ? e.b : e.bText}

                                                    onChange={() => submit(e.section.section, e.question ? e.question : e.questionText, e.b ? e.b : e.bText, e.rightAns, findAbc(e.section.section) === false ? e.section.number : test.discreption && test.discreption.map((n) => n.selectNumber.b)
                                                    )}

                                                    control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.bText ? e.bText : ""}</div>  {e.b ? <img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.b}></img> : ""}</Typography>} />

                                                <FormControlLabel
                                                    checked={
                                                        e.cText ?
                                                            backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.cText ? true : false)
                                                            :
                                                            backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.c ? true : false)
                                                    }
                                                    name={e.id} value={e.c ? e.c : e.cText}

                                                    onChange={() =>
                                                        submit(e.section.section, e.question ? e.question : e.questionText, e.c ? e.c : e.cText, e.rightAns, findAbc(e.section.section) === false ? e.section.number : test.discreption && test.discreption.map((n) => n.selectNumber.c))}
                                                    control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.cText ? e.cText : ""}</div> {e.c ? <img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.c}></img> : ""}</Typography>} />

                                                {e.d || e.dText ?
                                                    <FormControlLabel
                                                        checked={
                                                            e.dText ?
                                                                backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.dText ? true : false)
                                                                :
                                                                backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.d ? true : false)
                                                        }
                                                        name={e.id} value={e.d ? e.d : e.dText}

                                                        onChange={() =>
                                                            submit(e.section.section, e.question ? e.question : e.questionText, e.d ? e.d : e.dText, e.rightAns, findAbc(e.section.section) === false ? e.section.number : test.discreption && test.discreption.map((n) => n.selectNumber.d))}
                                                        control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.dText ? e.dText : ""}</div>{e.d ? <img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.d}></img> : ""}</Typography>} /> : ''}

                                                {e.e || e.eText ? <FormControlLabel
                                                    checked={
                                                        e.eText ?
                                                            backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.eText ? true : false)
                                                            :
                                                            backup && backup.find((p) => p.imageOneQuizeCorrect.id === e.id && p.userClickObj === e.e ? true : false)
                                                    }
                                                    name={e.id} value={e.e ? e.e : e.eText}

                                                    onChange={() =>
                                                        submit(e.section.section, e.question ? e.question : e.questionText, e.e ? e.e : e.eText, e.rightAns, findAbc(e.section.section) === false ? e.section.number : test.discreption && test.discreption.map((n) => n.selectNumber.e))}
                                                    control={<Radio />} label={<Typography variant='h5' className='d-flex row'> <div>{e.eText ? e.eText : ""}</div>{e.e ? <img style={{ height: '100px', width: '100px' }} src={process.env.REACT_APP_API_URL + e.e}></img> : ""}</Typography>} /> : ''}
                                            </RadioGroup>
                                        </FormControl>
                                    </Container>
                                }
                            }
                            )
                        }
                        <Grid container align='left' >
                            <Grid item xs={6} md={8} > <Button onClick={() => sect > 0 && sect < arrs.length ? handleSect(arrs[sect - 1], sect - 1) : ''} ><div className="button_slidenext slide_rightnext" >Previous</div></Button>
                            </Grid>

                            {
                                sect < arrs.length - 1 ?
                                    <Grid item xs={6} md={4} > <Button onClick={() => sect < arrs.length - 1 ? handleSect(arrs[sect + 1], sect + 1) : ''} > <div className="button_slidenext slide_rightnext" >Next</div></Button>
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
