import React, { useState, useEffect } from "react";
import '../css/bootstrap.min.css'
import '../css/pogo-slider.min.css'
import '../css/style.css'
import '../css/custom.css'
import './triangle.css'

import { useAlert } from 'react-alert'
import Loader from '../Loader/Loader'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { getTest } from '../../actions/Test/TestAction'
import ImageQuiz from "./TypeOfTest/ImageQuiz";
import { Avatar, Button, Checkbox, Container, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const Testpage = () => {
  const { test, loading } = useSelector((state) => state.test)

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
  let oneOption = 'One Quiz Correct Test'
  let imageTest = "One Images Quiz Correct Test"
  let allOption = "Mulitpal Quiz Select Test"
  let threeOption = "Three Quiz Test"
  let fiveOption = "Five Quiz Test"
  let arrs = []

  const alert = useAlert();
  const history = useHistory();
  const [loadingMain, setLoadingMain] = useState(false);
  const [data, setData] = useState([]);
  const [dataExam, setDataExam] = useState([]);
  const [count, setCount] = useState(1);
  const [dataTemp, setDataTemp] = useState([]);
  const [sect, setSect] = useState(0);
  const [radioselect, setRadioSelect] = useState();
  let user = JSON.parse(localStorage.getItem('user-details'));
  const [backup, setBackup] = useState([]);
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
    checkPayment()
    getBackupData()
  }, [dispatch])

  const qutionCount = []

  const submit = (marks, section, obj, rightAns, question, carrer) => {
    const lastTime = `${minutes}-${seconds}`
    // console.log('marks', marks)
    // console.log('section', section)
    // console.log('obj', obj)
    // console.log('rightAns', rightAns)
    // console.log('question', question)
    if (typeOfTest === oneOption) {
      if (rightAns === obj) {
        sendDataResult(typeOfTest, Class, section, question, marks[0], carrer, lastTime, obj)
        return alert.success("Right Ans")
      } else {
        if (rightAns !== obj) {
          let marks = 0
          sendDataResult(typeOfTest, Class, section, question, marks[0], carrer, lastTime, obj)
          return alert.error("Wrong Ans")
        }
      }
    } else {
      if (typeOfTest === allOption || typeOfTest === threeOption || typeOfTest === fiveOption) {
        sendDataResult(typeOfTest, Class, section, question, marks[0], carrer, lastTime, obj)
      }
    }
  }

  const sendDataResult = async (typeOfTest, Class, section, question, marks, carrer, lastTime, object) => {
    let item = { typeOfTest, Class, section, question, marks, carrer, classSection, lastTime, object };
    // console.log(item)
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
  test.discreption &&
    test.discreption.forEach((item, index) => {
      timeArray.push(item.title.duration);
      if (item.typeOfTest.selectTest !== imageTest) {
        localStorage.setItem("time", item.title.duration)
      }
    });

  test.discreption && localStorage.setItem("resultTitle", test.discreption.map((e, i) => e.resultTitle.title))
  test.discreption && localStorage.setItem("discription", test.discreption.map((e) => e.resultTitle.discription))


  if (test.data) {
    for (i = 0; i < test.data.length; i++) {
      arra.push(test.data[i].section.section)
    }
    arrs = new Set(arra)
    arrs = Array.from(arrs)
  }

  const checkPayment = async () => {
    let item = { typeOfTest, Class, classSection };
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
        if (resp === 402) {
          localStorage.removeItem("")
          alert.error("you need to pay")
          history.push('/')
        }
      });
    });
  };

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {
        typeOfTest === imageTest ?
          (
            <ImageQuiz test={test && test} />
          ) : (<>
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
                    {arrs && arrs.map((a, index) => <div className='p-3'> <Button key={index} variant='contained' className={classes.buttons} onClick={() => handleSect(index)} style={{ background: sect === index ? "linear-gradient(45deg, #FFBD35 30%, #FFBD35 90%)" : 'linear-gradient(45deg, #548CFF 30%, #548CFF 90%)', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}><Typography variant='h5' style={{ color: 'white', fontWeight: '700', fontSize: '12px' }}>{a}</Typography></Button></div>

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

                            <FormLabel component="legend"><Typography variant='h4'>Q{i + 1}. {e.question}</Typography></FormLabel>
                            <RadioGroup
                              aria-label=""
                              defaultValue=""
                              name="radio-buttons-group"
                            >
                              <FormControlLabel checked={
                                oneOption === typeOfTest ?
                                  backup && backup.find((p) => p.oneQuizeCorrect.id === e.id && p.userClickObj === e.a) :
                                  typeOfTest === allOption ?
                                    backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.a) :
                                    typeOfTest === fiveOption ? backup && backup.find((p) => p.fiveQuize.id === e.id && p.userClickObj === e.a) :
                                      typeOfTest === threeOption ?
                                        backup && backup.find((p) => p.threeQuize.id === e.id && p.userClickObj === e.a) : ""
                              }
                                name={typeOfTest === allOption ? true : e.id} value={e.a}
                                disabled={oneOption === typeOfTest && backup && backup.find((p) => p.oneQuizeCorrect.id === e.id ? true : false)}
                                onChange={() => submit(test.discreption && test.discreption.map((e) => typeOfTest === oneOption ? e.selectNumber.rightAns : e.selectNumber.a),
                                  e.section.section, e.a, e.rightAns, e.question, e.career ? e.career.newCareer : "")} control={typeOfTest === allOption ? <Checkbox checked={
                                    backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.a ? true : false)} /> : <Radio />} label={<Typography variant='h5'>{e.a}</Typography>} />

                              <FormControlLabel checked={
                                oneOption === typeOfTest ?
                                  backup && backup.find((p) => p.oneQuizeCorrect.id === e.id && p.userClickObj === e.b) :
                                  typeOfTest === allOption ?
                                    backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.b) :
                                    typeOfTest === fiveOption ? backup && backup.find((p) => p.fiveQuize.id === e.id && p.userClickObj === e.b) :
                                      typeOfTest === threeOption ?
                                        backup && backup.find((p) => p.threeQuize.id === e.id && p.userClickObj === e.b) : ""
                              }

                                name={typeOfTest === allOption ? false : e.id} value={e.b}
                                disabled={oneOption === typeOfTest && backup && backup.find((p) => p.oneQuizeCorrect.id === e.id ? true : false)}
                                onChange={() => submit(test.discreption && test.discreption.map((e) => typeOfTest === oneOption ? e.selectNumber.rightAns : e.selectNumber.b),
                                  e.section.section, e.b, e.rightAns, e.question, e.career ? e.career.newCareer : ""
                                )} control={typeOfTest === allOption ? <Checkbox checked={
                                  backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.b ? true : false)} /> : <Radio />} label={<Typography variant='h5'>{e.b}</Typography>} />
                              <FormControlLabel checked={
                                oneOption === typeOfTest ?
                                  backup && backup.find((p) => p.oneQuizeCorrect.id === e.id && p.userClickObj === e.c) :
                                  typeOfTest === allOption ?
                                    backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.c) :
                                    typeOfTest === fiveOption ? backup && backup.find((p) => p.fiveQuize.id === e.id && p.userClickObj === e.c) :
                                      typeOfTest === threeOption ?
                                        backup && backup.find((p) => p.threeQuize.id === e.id && p.userClickObj === e.c) : ""
                              }

                                name={typeOfTest === allOption ? false : e.id} value={e.c}
                                disabled={oneOption === typeOfTest && backup && backup.find((p) => p.oneQuizeCorrect.id === e.id ? true : false)}
                                onChange={() =>
                                  submit(test.discreption && test.discreption.map((e) => typeOfTest === oneOption ? e.selectNumber.rightAns : e.selectNumber.c),
                                    e.section.section, e.c, e.rightAns, e.question, e.career ? e.career.newCareer : "")} control={typeOfTest === allOption ? <Checkbox checked={
                                      backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.c ? true : false)} /> : <Radio />} label={<Typography variant='h5'>{e.c}</Typography>} />
                              {e.d ? <FormControlLabel checked={
                                oneOption === typeOfTest ?
                                  backup && backup.find((p) => p.oneQuizeCorrect.id === e.id && p.userClickObj === e.d) :
                                  typeOfTest === allOption ?
                                    backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.d) :
                                    typeOfTest === fiveOption ? backup && backup.find((p) => p.fiveQuize.id === e.id && p.userClickObj === e.d) :
                                      ""
                              }
                                name={typeOfTest === allOption ? false : e.id} value={e.d}
                                disabled={oneOption === typeOfTest && backup && backup.find((p) => p.oneQuizeCorrect.id === e.id ? true : false)}
                                onChange={() =>
                                  submit(test.discreption && test.discreption.map((e) => typeOfTest === oneOption ? e.selectNumber.rightAns : e.selectNumber.d),
                                    e.section.section, e.d, e.rightAns, e.question, e.career ? e.career.newCareer : ""
                                  )} control={typeOfTest === allOption ? <Checkbox checked={
                                    backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.d ? true : false)} /> : <Radio />} label={<Typography variant='h5'>{e.d}</Typography>} /> : ''}
                              {e.e ? <FormControlLabel checked={
                                oneOption === typeOfTest ?
                                  backup && backup.find((p) => p.oneQuizeCorrect.id === e.id && p.userClickObj === e.e) :
                                  typeOfTest === allOption ?
                                    backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.e) :
                                    typeOfTest === fiveOption ? backup && backup.find((p) => p.fiveQuize.id === e.id && p.userClickObj === e.e) :
                                      ""
                              }
                                name={typeOfTest === allOption ? false : e.id} value={e.e}
                                disabled={oneOption === typeOfTest && backup && backup.find((p) => p.oneQuizeCorrect.id === e.id ? true : false)}
                                onChange={() =>
                                  submit(test.discreption && test.discreption.map((e) => typeOfTest === oneOption ? e.selectNumber.rightAns : e.selectNumber.e),
                                    e.section.section, e.e, e.rightAns, e.question, e.career ? e.career.newCareer : "")} control={typeOfTest === allOption ? <Checkbox checked={
                                      backup && backup.find((p) => p.multipalQuize.id === e.id && p.userClickObj === e.e ? true : false)} /> : <Radio />} label={<Typography variant='h5'>{e.e}</Typography>} /> : ''}
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
                    <div className="transition"></div> 
                  </Link>
                </Grid>
              </Grid>
            </Container></>
            )
      }

    </>

  );
};

export default Testpage;
