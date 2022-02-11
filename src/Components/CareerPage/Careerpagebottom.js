import { Container, Grid } from '@mui/material';
import React from 'react';
import Careerpagebottom4 from './Careerpagebottom4';
import Careerpagebottom8 from './Careerpagebottom8';

const Careerpagebottom = ({data}) => {
    return <div className='careerpagebottom_main'>
        <Container>
            <Grid container  spacing={2}>
            <Grid item align='left' lg={3}><Careerpagebottom4/></Grid>
            <Grid item lg={9}><Careerpagebottom8 data={data}/></Grid>
      </Grid>
      </Container>
  </div>;
};

export default Careerpagebottom;
