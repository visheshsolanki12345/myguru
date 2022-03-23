import React from 'react'
import { Button, Container, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

const ReferenceTable = () => {
    return (
        <div style={{ padding: '10px' }}>
            <Typography variant='h3'>REFERENCE TABLE FOR SUBJECT / STREAM PREFERENCE</Typography>
            <Typography variant='h4'>On the basis of your aptitude test score, ability and interest inventory, following table will help you to understand your Preference of streams.</Typography>
            <Grid container style={{ border: '1px solid black' }}>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{ border: '1px solid black' }}>  <Typography variant='h4' style={{ color: 'black' }}>Options.</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}><Typography variant='h4' style={{ color: 'black' }}>Subject / Stream</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}><Typography variant='h4' style={{ color: 'black' }}>Student Score
                    Aptitude / Interest*</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ border: '1px solid black' }}><Typography variant='h4' style={{ color: 'black' }}>Average score required</Typography>
                </Grid>


                {/* separate */}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>1</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>Maths in any stream</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}> <Typography variant='h5' style={{ color: 'black' }}>(1) Numerical Ability  <br />
                    (2) Logical Reasoning  <br />
                    (3) Interest – A                     </Typography>

                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>6 and above</Typography>
                </Grid>
                {/* separate */}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>2</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>Science (Engineering and allied fields) – Physics, Chemistry</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}> <Typography variant='h5' style={{ color: 'black' }}>(1) Mechanical Ability        <br />
                    (2) Logical Reasoning        <br />
                    (3) Abstract Reasoning       <br />
                    (4) Interest – G
                </Typography>

                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>6 and above</Typography>
                </Grid>
                {/* separate */}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>3</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>Science (Medical and allied fields) – Physics, Chemistry, Biology</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}> <Typography variant='h5' style={{ color: 'black' }}>(1) Mechanical Ability       <br />
                    (2) Logical Reasoning     <br />
                    (3) Abstract Reasoning     <br />
                    (4) Interest – B
                </Typography>

                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>6 and above</Typography>
                </Grid>
                {/* separate */}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>4</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>Commerce</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}> <Typography variant='h5' style={{ color: 'black' }}>(1) Logical Reasoning         <br />
                    (2) Abstract Reasoning       <br />
                    (3) Interest – E               <br />
                    (4) Interest – K
                </Typography>

                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>6 and above</Typography>
                </Grid>
                {/* separate */}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>5</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>Humanities</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}> <Typography variant='h5' style={{ color: 'black' }}>(1) Logical Reasoning         <br />
                    (2) Abstract Reasoning      <br />
                    (3) Interest – E            <br />
                    (4) Interest – D             <br />
                    (5) Interest – I             <br />
                    (6) Interest – J              <br />
                    (7) Interest – L
                </Typography>

                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>5 and above</Typography>
                </Grid>
                {/* separate */}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>6</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>English in any stream</Typography></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ border: '1px solid black' }}> <Typography variant='h5' style={{ color: 'black' }}>(1) Verbal Ability             <br />
                    (2) Interest – D              <br />
                    (3) Interest – J
                </Typography>

                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{ border: '1px solid black' }}><Typography variant='h5' style={{ color: 'black' }}>5 and above</Typography>
                </Grid>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={12} xl={12} style={{ fontSize: '15px', textAlign: "left" }}>
                * &nbsp; You may select the subject/stream as per the highest average score obtained for the subject/stream. If you do not meet the criterion of average score, you have to put in lot of effort and hard work to make it possible.
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} style={{ fontSize: '15px', textAlign: "left" }}>
                * &nbsp; Maths in any stream suggested only if you get 6 and above score in Option 1.
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} style={{ fontSize: '15px', textAlign: "left" }}>
                * &nbsp; In case your medium of instruction is English and your score is less than 5, you have to put in more effort to improve your English.
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} style={{ fontSize: '15px', textAlign: "left" }}>
                * &nbsp; If you wish to choose any other vocational subject, you may do so as per your interest.
            </Grid>
        </div>
    )
}

export default ReferenceTable