import { Box, Grid, List, ListItem, makeStyles, Typography } from '@material-ui/core'
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTest } from '../../actions/Test/TestAction';
import Piechart from './PieChar';


const Analysis = ({ data }) => {

  const [count, setCount] = useState({})
  let typeOfTest = localStorage.getItem('typeOfTest')
  let classSection = localStorage.getItem('classSection')
  let multipalTest = "Mulitpal Quiz Select Test"

  let rows = []
  let rows2 = []

  let arra = []
  let arrs = []
  let counts;
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.test)
  useEffect(() => {
    if (test && test.length === 0) {
      let id = localStorage.getItem("id")
      let item = { id, classSection }
      dispatch(getTest(item));
    }

  }, [dispatch])

  if (test.data) {
    for (let i = 0; i < test.data.length; i++) {
      arra.push(test.data[i].section.section)
    }
    counts = arra.reduce((acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }), []);

  }
  


  data &&
    data.forEach((item, index) => {
      rows.push(item.totalCount);
    });
  findLargest3();


  function findLargest3() {
    rows && rows.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);

    rows2.push(rows.slice(0, 3))
  }

  // console.log(rows2)


  const steps = ['Below Average', 'Average', 'High'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const useStyle = makeStyles((theme) => ({
    triangle: {
      width: '0',
      height: '0',
      borderLeft: '40px solid transparent',
      borderRight: '40px solid transparent',
      borderBottom: '80px solid  #5aff15',
      [theme.breakpoints.down('md')]: {
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderBottom: '40px solid  #5aff15',
      }
    },
    priangle: {
      width: '0',
      height: '0',
      borderLeft: '40px solid transparent',
      borderRight: '40px solid transparent',
      borderBottom: '80px solid #5555',
      [theme.breakpoints.down('md')]: {
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderBottom: '40px solid  #5aff15',
      }
    },
    cont: {
      display: 'flex',
      padding: '0 30px',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        padding: '0',
      }
    },
    fontsize: {
      fontSize: '18px',
      padding: '0 30px',
      [theme.breakpoints.down('md')]: {
        padding: '0',
      }
    }


  }))
  const classes = useStyle()
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  return (
    <>

      {data && data.map((r, i) => {
        return <div style={{ padding: '40px' }}>
          <Grid container className={classes.cont} style={{ border: '1px solid #96CCFE' }}>
            <Grid item md={12} lg={2} style={{ border: '1px solid #96CCFE', textAlign: 'center' }}>
              <Typography variant='h3' >{i + 1}</Typography>
            </Grid>
            <Grid item md={12} lg={10}>
              <Grid container className='d-flex align-items-center justify-content-center' lg={12} style={{ border: '1px solid #96CCFE' }}>

                <Grid item lg={12} style={{ border: '1px solid #96CCFE' }}>
                  <Typography variant='h4'>{r.section}</Typography>
                </Grid>

                <Grid item lg={12} style={{ border: '1px solid #96CCFE' }}>
                  <Typography style={{ fontSize: '18px' }}>Grade range (Darkened Area)</Typography>
                </Grid>



                <Grid item lg={12} style={{ border: '1px solid #96CCFE' }}>
                  <Typography variant='h4'>Maximum Score:{r.totalNoQu}</Typography>
                </Grid>
                <Grid container direction='column' lg={12}>
                  <Grid item style={{ border: '1px solid #96CCFE' }}>

                    <div className="d-flex ">
                      {
                        r.interpretatio && r.interpretatio ?
                          Object.entries(r.interpretatio.grade.the_json && r.interpretatio.grade.the_json).map(([k, v]) =>
                            <div className='text-center p-5'>
                              {
                                r.grade === k ?
                                  <>
                                    <Typography variant='h5'>{v}</Typography>
                                    <div className={classes.triangle}></div>
                                    <Typography variant='h5'>{k}</Typography>
                                    <Typography variant='h5' className='d-flex center text-danger'>{r.totalCount}</Typography>
                                  </>
                                  :
                                  <>
                                    <Typography variant='h5'>{v}</Typography>
                                    <div className={classes.priangle}></div>
                                    <Typography variant='h5'>{k}</Typography>
                                  </>
                              }
                            </div>
                          ) : ""
                      }


                      <Grid item style={{ padding: '10px', borderLeft: '1px  solid #96CCFE' }}>
                        <Piechart Newdata={r.totalCount} totalNo={r.totalNoQu} />
                      </Grid>
                    </div>


                  </Grid>


                </Grid>
              </Grid>
              <Grid container lg={12} style={{ border: '1px solid #96CCFE' }}><Typography style={{ fontSize: '19px' }}><b>&nbsp;Score:</b>
                &nbsp; Your test score in {r.section}  {r.totalCount}  out of {r.totalNoQu}   ({r.grade})</Typography>
              </Grid>

              {
                multipalTest !== typeOfTest?
                r.interpretatio && r.interpretatio ?
                  Object.entries(r.interpretatio.the_title && r.interpretatio.the_title).map(([k, v]) =>
                    r.grade === k ?
                      <div>
                      
                        <Grid container lg={12} style={{ border: '1px solid #96CCFE' }}><Typography className='d-flex row' align='left' style={{ fontSize: '19px' }}> <b>Interpretation:</b> <span>{v}</span></Typography></Grid>
                        <Grid container lg={12} style={{ border: '1px solid #96CCFE' }}>

                          <List className='mt-2 mx-1'>
                            <Typography className='d-flex row' align='left' style={{ fontSize: '19px' }}><b>What you can do / What more you can do:</b>
                            </Typography>
                            {
                              Object.entries(r.interpretatio.the_json && r.interpretatio.the_json).map(([k, v]) =>
                                r.grade === k ?

                                  v.split("<==>").map((p) =>
                                    <ListItem style={{ listStyleType: "circle" }}>
                                      <Typography variant='h5'>{p}</Typography>
                                    </ListItem>
                                  )
                                  :
                                  <>
                                  </>
                              )}
                          </List>
                        </Grid>
                      </div>
                      :
                      <></>
                  )
                  :
                  ""
                  :
                  ""
              }

            </Grid>
          </Grid>
        </div>
      })}
      <Grid container lg={12} style={{ border: '1px solid #96CCFE' }}>

        <List className='mt-2 mx-4'>
          <Typography className='d-flex row' align='left' style={{ fontSize: '15px' }}><b>Based on the data available from Career Cluster Assessment, three top Career Clusters are suggested as below:</b>
          </Typography>
          {
            typeOfTest === "Mulitpal Quiz Select Test" &&

            data && data.map((k, i) =>
              rows2 && rows2.map((r) =>
                r.map((p) =>
                  p === k.totalCount ?
                    <>
                      <ListItem style={{ fontSize: '15px' }}>{i + 1}. {k.section} ({k.totalCount}-{k.grade})</ListItem>

                    </>
                    :
                    ""
                )))

          }
        </List>
      </Grid>


    </>
  )
}

export default Analysis