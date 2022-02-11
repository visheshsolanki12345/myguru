import { Divider, Grid, Typography, Container, CircularProgress } from '@mui/material';
import React, { Fragment, } from 'react';
import { getVideoSingleFunc } from '../../../actions/carrer/user/VideoCarrerAction';
import Loader from '../../Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { timeSince } from '../../CommanFunction/time'
import { post } from '../../CommanFunction/PaytemPayment'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";


const VideoSinglePage = ({ match }) => {

   const dispatch = useDispatch()
   const { loading, error, singleVideo } = useSelector((state) => state.singleVideo);
   const history = useHistory();
   const alert = useAlert()

   useEffect(() => {
      dispatch(getVideoSingleFunc(match.params.id))
   }, [dispatch, alert, error, match.params.id])

   if (singleVideo && singleVideo.ORDER_ID) {
      return (
          <BasicModal data={singleVideo && singleVideo} />
      )
  }

   return (
      <Fragment>
         {loading ? (
            <Loader />
         ) : (
            <Container>
            <Typography variant='h3'>Title : {singleVideo && singleVideo.title}</Typography>
               <Grid container justify='space-between'>
                  <Grid align='left' item lg={6}><Typography variant='h5'> Publis Date: <span style={{color:'green'}}>{timeSince(singleVideo && singleVideo.createAt)}</span> </Typography></Grid>
                  <Grid align='right' item lg={6}> <Typography variant='h5'> Category: {singleVideo && singleVideo && singleVideo.carrer && singleVideo.carrer.carrer} </Typography>  </Grid>
                  
               </Grid>
               <Divider />
               <Grid container>
                  <Grid item xs={11} sm={11} md={11} lg={11}>
                     {<>
                           <div>
                              <div >
                                 <iframe
                                    width="100%"
                                    height="450px"
                                    src={singleVideo && singleVideo.embedUrl}
                                 >
                                 </iframe>
                              </div>
                            
                                   </div>
                                   <Grid container >
                                     
                                       <Grid item lg={6} align='left'>
                                     <Typography variant='h5'>Description  {singleVideo && singleVideo.sortDescription}</Typography>


                                       </Grid>
                                       <Grid item align='right' lg={6}>
                                       <Typography variant='h5'>Earnings <span style={{fontWeight:'700',color:'green'}}>{singleVideo && singleVideo.earnings}</span>  </Typography>


                                       </Grid>
                                       <Grid item align='left' lg={6}>
                                       <Typography variant='h5'>price:<span style={{fontWeight:'800',color:'blue'}}>₹{singleVideo && singleVideo.price}</span>  </Typography>



                                       </Grid>

                                       <Grid align='right' item lg={6}>
                                      
                                        <Typography variant='h6'>Rating:<span style={{fontWeight:'700',color:'green'}}>{singleVideo && singleVideo.rating}</span>  </Typography>
                                        <Typography variant='h6'>Views: <span style={{fontWeight:'700',color:'green'}}>{singleVideo && singleVideo.noView}</span> </Typography>
                                    
                                       </Grid>
                                   </Grid>
                                    </>
                                     
                     }

                  </Grid>
               </Grid>
            </Container>
         )}
      </Fragment>
   )
};

export default VideoSinglePage;


export const BasicModal = ({ data }) => {
   const history = useHistory();
   const [open, setOpen] = useState(true)
   const [loading, setLoading] = useState(false)

   const style = {
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       width: 400,
       bgcolor: 'background.paper',
       border: '2px solid #000',
       boxShadow: 24,
       p: 4,
   };

   const payment = () => {
       setLoading(true)
       var information = {
           action: "https://securegw-stage.paytm.in/order/process",
           params: data && data
       }
       post(information);
   }
   const goBack = () => {
       history.push('/video-page')
   }

   return (
       <div>
           <Modal
               open={open}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
           >
               <Box sx={style}>
                   {loading ? (
                       <CircularProgress color="secondary" />
                   ) : (
                       <div>
                           <Typography id="modal-modal-title" variant="h6" component="h2">
                               <CancelIcon
                                   style={{ cursor: "pointer", fontSize: "30px" }}
                                   onClick={() => goBack()}
                               />
                           </Typography>
                           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                           </Typography>
                           <Button onClick={() => payment()}>Countinue Payment</Button>
                       </div>
                   )}
               </Box>
           </Modal>
       </div>
   );
}
