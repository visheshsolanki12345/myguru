import { Container } from '@mui/material'
import  Grid from '@mui/material/Grid'
import React from 'react'
import VideoBottom4 from './VideoBottom4'
import VideoBottom8 from './VideoBottom8'

const VideoTrending = () => {
  return (
    <div className='careerpagebottom_main'>
    <Container>
        <Grid container  spacing={2}>
        <Grid item align='left' lg={3}><VideoBottom4/></Grid>
        <Grid item lg={9}><VideoBottom8 /></Grid>
  </Grid>
  </Container>
    </div>
  )
}

export default VideoTrending