import React, { Fragment, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Divider, Grid, Typography, Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Loader from "../../Loader/Loader";
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getVideoFunc } from '../../../actions/carrer/user/VideoCarrerAction'
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { timeSince } from '../../CommanFunction/time'
import { getCarrerFunc } from '../../../actions/carrer/user/CarrerAction';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Rating from "@material-ui/lab/Rating";

const VideoPageViewAll = () => {
    const { loading, error, video, videoPageCount, videoTotalPagesCount } = useSelector((state) => state.video);
    const { userCarrer } = useSelector((state) => state.userCarrer);
    const dispatch = useDispatch()
    const history = useHistory();
    const alert = useAlert()

    const [currentPage, setCurrentPage] = useState("");
    const [currentPageVideo, setCurrentPageVideo] = useState(1);
    const [carrerId, setCarrerId] = useState();



    useEffect(() => {
        if (video.length === 0) {
            dispatch(getVideoFunc(currentPage, carrerId))
        }
        if (userCarrer.length === 0) {
            dispatch(getCarrerFunc())
        }
        if (carrerId) {
            dispatch(getVideoFunc(currentPageVideo, carrerId))
            return
        }
        if (currentPage) {
            dispatch(getVideoFunc(currentPage, carrerId))
            return
        }
    }, [dispatch, alert, error, currentPage, carrerId, currentPageVideo])


    let rows = []

    userCarrer && userCarrer.forEach((item, index) => {
        rows.push({
            id: item.id,
            label: item.carrer,
        });
    });

    const setCurrentPageNo = (event, value) => {
        setCurrentPage(value);
    };

    const setCurrentPageNoVideo = (event, value) => {
        setCurrentPageVideo(value);
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Container>
                    <Grid container justify='space-between' style={{ padding: '40px' }}>
                        <Grid item align='left' justify='center' lg={6}>
                            <div >
                                {
                                    video && video && video.videoCarrer && video.videoCarrer.map((e) =>


                                        <Grid container direction='column' >
                                            <Grid item></Grid>

                                        </Grid>


                                    )
                                }


                            </div>

                        </Grid>
                        <Grid align='right' justify='end' item lg={6}>

                            <Autocomplete
                                // disablePortal
                                // id="combo-box-demo"
                                onChange={(event, newValue) => {
                                    setCarrerId(newValue.id);
                                }}
                                options={rows && rows}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Search Carrer" />}
                            />

                        </Grid>
                    </Grid>




                    <div>

                    </div>
                    <Grid container direction='column' style={{ padding: "10px" }} >
                        <Grid item xs={12} sm={6} md={4} lg={12}>
                            {
                                video && video && video.videoCarrer && video.videoCarrer.map((e) =>
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
                                readOnly= {true}
                                precision = {0.5}
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
                    <Stack spacing={2}>
                        {
                            carrerId ?
                                <Pagination count={videoTotalPagesCount} color="secondary" page={videoPageCount} onChange={setCurrentPageNoVideo} />
                                :
                                <Pagination count={videoTotalPagesCount} color="secondary" page={videoPageCount} onChange={setCurrentPageNo} />
                        }
                    </Stack>
                </Container>
            )}
        </Fragment>
    )
};

export default VideoPageViewAll;

