import { Grid } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react'
import './careerpage.css'
import Careerpagebottom from './Careerpagebottom';
import CheckyourAptitude from './CheckyourAptitude';
import Loader from "../Loader/Loader";
import { useAlert } from 'react-alert'
import { getCarrerPageFunc } from '../../actions/carrer/user/CarrerAction';
import { useSelector, useDispatch } from 'react-redux'


const CareerPage = ({ match }) => {
    const dispatch = useDispatch()
    const { loading, error, userCarrerPage } = useSelector((state) => state.userCarrerPage);
    const alert = useAlert()

    useEffect(() => {
        dispatch(getCarrerPageFunc(match.params.id))
    }, [dispatch, userCarrerPage.length, alert, error])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className='careerpage_main'>
                    <div className='careerpage_baner_image'> <img style={{ width: "100%" }} src={userCarrerPage && userCarrerPage.carrerPage && `${process.env.REACT_APP_API_URL}`+userCarrerPage.carrerPage.bannerImage}></img></div>
                    <div className='careerpage_checkaptitude'>
                        <Grid container align='center' justify='space-between' spacing={2}>
                            <Grid item lg={4} md={4} ms={12} xs={12}> <CheckyourAptitude /></Grid>
                            <Grid item lg={4} md={4} ms={12} xs={12}> <CheckyourAptitude data={userCarrerPage && userCarrerPage.carrerPage && userCarrerPage.carrerPage.description}/></Grid>
                            <Grid item lg={4} md={4} ms={12} xs={12}> <CheckyourAptitude /></Grid>
                        </Grid>
                    </div>
                    <Careerpagebottom data={userCarrerPage && userCarrerPage}/>
                </div>
            )}
        </Fragment>
    )
};

export default CareerPage;
