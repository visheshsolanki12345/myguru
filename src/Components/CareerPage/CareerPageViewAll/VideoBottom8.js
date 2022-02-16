import { FaAngleRight, FaListUl } from "react-icons/fa";
import Carousel from 'react-elastic-carousel'

import axios from 'axios'
import React, { Fragment, useState } from 'react';
import { Divider, Grid, Typography, Container, Button } from '@mui/material';
import Loader from "../../Loader/Loader";
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { timeSince } from '../../CommanFunction/time'
import Rating from "@material-ui/lab/Rating";
import { Box, Modal } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";

const VideoBottom8 = () => {

    const [open, setOpen] = useState(false) 
    const [loading, setLoading] = useState(false) 

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        overflow: 'scroll',
        height: '100%',
        p: 4,
    };


    useEffect(() => {
        getVideoFunc()
    }, [])

    const userInfo = JSON.parse(localStorage.getItem('user-details'))
    const [video, setVideo] = useState([])
    const [data, setData] = useState([])

    const getVideoFunc = async () => {
        setLoading(true)
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        let All = `/api/video/all-video/`
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + All, config)
        setVideo(data)
        setLoading(false)
    }

    const videoFunc = (e) => {
        setData(e)
        setOpen(true)
    }


    const videoFuncClose = (e) => {
        setOpen(false)
    }

    if (loading){
        return (<Loader />)
    }

    return <>
        {/* View All page */}
        <div className="careerpagebottom8_guruexpert_video">
            {/* guru exper video common heading */}
            <div className="careerpagebottom8_heading">
                <div className="careerpagebottom8_featurearticle_heading">
                    {" "}
                    All Video
                </div>
                <div className="careerpagebottom8_featurearticle_viewall">
                    <Button onClick={() => videoFunc(video && video.allVideo && video.allVideo)}> View All <FaAngleRight /></Button>
                </div>
            </div>
        </div>
        <Divider />
        <Grid container >
            <Carousel itemsToScroll={1} itemsToShow={3}>
                {
                    video && video.allVideo && video.allVideo.map((e) =>
                        <Grid container lg={12} justify='space-between'>

                            <Grid item lg={12}>

                                <Grid item lg={12} style={{ padding: '20px' }}>
                                    <Link to={`/video-page/${e.id}`} >
                                        <img
                                            style={{ width: '100%', height: '100%' }}
                                            src={`${process.env.REACT_APP_API_URL}` + e.thumbnailImage}
                                        >
                                        </img>
                                    </Link>
                                </Grid>

                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Title : {e.title}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Views :  {e.noView}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>
                                        <Rating
                                            value={e.rating}
                                            readOnly={true}
                                            precision={0.5}
                                        /> {e.rating}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Payable : {e.earnings}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Price : {e.price}</span>
                                </Grid>

                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Publish Date : {timeSince(e.createAt)}</span>
                                </Grid>

                            </Grid>
                        </Grid>
                    )}
            </Carousel>

        </Grid>
        <div className="careerpagebottom8_guruexpert_video">
            {/* guru exper video common heading */}
            <div className="careerpagebottom8_heading">
                <div className="careerpagebottom8_featurearticle_heading">
                    {" "}
                    Latest Video
                </div>

                <div className="careerpagebottom8_featurearticle_viewall">
                    <Button onClick={() => videoFunc(video && video.allCreate && video.allCreate)}> View All <FaAngleRight /></Button>
                </div>
            </div>
        </div>
        <Divider />
        <Grid container >
            <Carousel itemsToScroll={1} itemsToShow={3}>
                {
                    video && video && video.allCreate && video.allCreate.map((e) =>
                        <Grid container lg={12} justify='space-between'>

                            <Grid item lg={12}>

                                <Grid item lg={12} style={{ padding: '20px' }}>
                                    <Link to={`/video-page/${e.id}`} >
                                        <img
                                            style={{ width: '100%', height: '100%' }}
                                            src={`${process.env.REACT_APP_API_URL}` + e.thumbnailImage}
                                        >
                                        </img>
                                    </Link>
                                </Grid>

                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Title : {e.title}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Views :  {e.noView}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>
                                        <Rating
                                            value={e.rating}
                                            readOnly={true}
                                            precision={0.5}
                                        /> {e.rating}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Payable : {e.earnings}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Price : {e.price}</span>
                                </Grid>

                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Publish Date : {timeSince(e.createAt)}</span>
                                </Grid>

                            </Grid>
                        </Grid>
                    )}
            </Carousel>

        </Grid>


        {/* trending */}
        <div className="careerpagebottom8_guruexpert_video">
            {/* guru exper video common heading */}
            <div className="careerpagebottom8_heading">
                <div className="careerpagebottom8_featurearticle_heading">
                    {" "}
                    Tranding Video
                </div>

                <div className="careerpagebottom8_featurearticle_viewall" >
                    <Button onClick={() => videoFunc(video && video.trandVideo && video.trandVideo)}> View All <FaAngleRight /></Button>
                </div>
            </div>
        </div>
        <Divider />
        <Grid container >
            <Carousel itemsToScroll={1} itemsToShow={3}>
                {
                    video && video && video.trandVideo && video.trandVideo.map((e) =>
                        <Grid container lg={12} justify='space-between'>

                            <Grid item lg={12}>

                                <Grid item lg={12} style={{ padding: '20px' }}>
                                    <Link to={`/video-page/${e.id}`} >
                                        <img
                                            style={{ width: '100%', height: '100%' }}
                                            src={`${process.env.REACT_APP_API_URL}` + e.thumbnailImage}
                                        >
                                        </img>
                                    </Link>
                                </Grid>

                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Title : {e.title}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Views :  {e.noView}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>
                                        <Rating
                                            value={e.rating}
                                            readOnly={true}
                                            precision={0.5}
                                        /> {e.rating}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Payable : {e.earnings}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Price : {e.price}</span>
                                </Grid>

                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Publish Date : {timeSince(e.createAt)}</span>
                                </Grid>

                            </Grid>
                        </Grid>
                    )}
            </Carousel>
        </Grid>
        {/* Carrer */}
        <div className="careerpagebottom8_guruexpert_video">
            {/* guru exper video common heading */}
            <div className="careerpagebottom8_heading">
                <div className="careerpagebottom8_featurearticle_heading">
                    {" "}
                    Careers
                </div>

                <div className="careerpagebottom8_featurearticle_viewall" >
                <Link to='/video-page'>
                    <Button > View All <FaAngleRight /></Button>
                </Link>
                </div>
            </div>
        </div>
        <Divider />
        <Grid container >
            <Carousel itemsToScroll={1} itemsToShow={3}>
                {
                    video && video && video.trandVideo && video.trandVideo.map((e) =>
                        <Grid container lg={12} justify='space-between'>

                            <Grid item lg={12}>

                                <Grid item lg={12} style={{ padding: '20px' }}>
                                    <Link to={`/video-page/${e.id}`} >
                                        <img
                                            style={{ width: '100%', height: '100%' }}
                                            src={`${process.env.REACT_APP_API_URL}` + e.thumbnailImage}
                                        >
                                        </img>
                                    </Link>
                                </Grid>

                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Title : {e.title}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Views :  {e.noView}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>
                                        <Rating
                                            value={e.rating}
                                            readOnly={true}
                                            precision={0.5}
                                        /> {e.rating}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Payable : {e.earnings}</span>
                                </Grid>
                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Price : {e.price}</span>
                                </Grid>

                                <Grid item lg={6}>
                                    <span style={{ color: 'black', fontSize: '15px' }}>Publish Date : {timeSince(e.createAt)}</span>
                                </Grid>

                            </Grid>
                        </Grid>
                    )}
            </Carousel>
        </Grid>
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <CancelIcon
                                style={{ cursor: "pointer", fontSize: "30px" }}
                                onClick={() => videoFuncClose()}
                            />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Grid container >

                                <Grid container direction='column' style={{ padding: "10px" }} >
                                    <Grid item xs={12} sm={6} md={4} lg={12}>
                                        {
                                            data && data.map((e) =>
                                                <Link to={`/video-page/${e.id}`} >

                                                    <Grid container style={{ padding: '10px' }} >
                                                        <Grid item lg={3}>

                                                            <img style={{ height: '160px', width: '200px' }} src={`${process.env.REACT_APP_API_URL}` + e.thumbnailImage} />
                                                        </Grid>
                                                        <Grid item align='left' justify='start' lg={8}>
                                                            <span style={{ fontSize: '16px', fontWeight: "600", color: 'black' }}>Title : {e.title}</span> <br />
                                                            <span style={{ fontSize: '14px', fontWeight: "500", color: 'black' }}>Description : {e.sortDescription}</span>    <br />
                                                            <span style={{ fontSize: '13px', fontWeight: "400", color: 'black' }}>  Earnings  {e.earnings}</span>    <br />
                                                            <span style={{ fontSize: '13px', fontWeight: "400", color: 'black' }}>  Publis Date {timeSince(e.createAt)}</span>   <br />
                                                            <span style={{ fontSize: '13px', fontWeight: "400", color: 'black' }}>   Publish By {e.user.last_name} </span>  <br />
                                                            <span style={{ fontSize: '13px', fontWeight: "400", color: 'black' }}>     Carrer {e.carrer.carrer} </span>  <br />
                                                        </Grid>
                                                        <Grid item lg={1}>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <Rating
                                                                    value={e.rating}
                                                                    readOnly={true}
                                                                    precision={0.5}
                                                                />
                                                                <span style={{ fontSize: '13px', fontWeight: "400", color: 'black' }}>      Rating: {e.rating} </span>
                                                                <span style={{ fontSize: '13px', fontWeight: "400", color: 'black' }}>      Views: {e.noView} </span>
                                                                <Typography variant='h5'></Typography>


                                                            </div>
                                                            <Typography variant='h5'>price:  <span style={{ fontWeight: '800', color: 'blue' }}>₹{e.price}</span></Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider />
                                                </Link>
                                            )
                                        }

                                    </Grid>

                                </Grid>
                            </Grid>
                        </Typography>
                    </div>
                </Box>
            </Modal>
        </div>
    </>
};

export default VideoBottom8;




