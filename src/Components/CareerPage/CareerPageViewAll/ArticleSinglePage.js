import React, { Fragment } from 'react';
import { CircularProgress, Divider, Typography } from '@material-ui/core';
import { Grid } from '@mui/material';
import Loader from '../../Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { getArticleSingleFunc } from '../../../actions/carrer/user/ArticleAction';
import { timeSince } from '../../CommanFunction/time'
import { post } from '../../CommanFunction/PaytemPayment'


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";


const ArticleSinglePage = ({ match }) => {

    const dispatch = useDispatch()
    const { loading, error, singleArticle } = useSelector((state) => state.singleArticle);
    const history = useHistory();
    const alert = useAlert()

    useEffect(() => {
        dispatch(getArticleSingleFunc(match.params.id))
    }, [dispatch, alert, error, match.params.id])



    if (singleArticle && singleArticle.ORDER_ID) {
        return (
            <BasicModal data={singleArticle && singleArticle} />
        )
    }


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div>
                        <Grid container justify='space-between'>
                            <Grid item> Name {singleArticle && singleArticle.user && singleArticle.user.last_name}</Grid>
                        </Grid>
                        <Divider />
                        <div>
                            <Typography variant='h4'></Typography>
                            <Typography variant='h4'>time : {timeSince(singleArticle.createAt)}</Typography>
                            <Typography variant='h4'>price : {singleArticle.ammount}</Typography>
                            <Typography variant='h4'>Title : {singleArticle && singleArticle && singleArticle.studentArticle && singleArticle.studentArticle.title}</Typography>
                            <Typography variant='h4'>Heading : {singleArticle && singleArticle && singleArticle.studentArticle && singleArticle.studentArticle.heading}</Typography>
                            <Typography variant='h4'>Heading : {singleArticle && singleArticle && singleArticle.studentArticle && singleArticle.studentArticle.description}</Typography>

                            <img src={singleArticle && singleArticle && singleArticle.studentArticle && `${process.env.REACT_APP_API_URL}` + singleArticle.studentArticle.bannerImage}></img>

                            <img src={singleArticle && singleArticle && singleArticle.studentArticle && `${process.env.REACT_APP_API_URL}` + singleArticle.studentArticle.thumbnailImage}></img>

                            <Grid container justify='space-between'>
                                <Grid item> Rating {singleArticle && singleArticle.rating}</Grid>
                                <Grid item> No View {singleArticle && singleArticle.noView}</Grid>
                                <Grid item> ammount {singleArticle && singleArticle.ammount}</Grid>
                                <Grid item> paymentChoices {singleArticle && singleArticle.paymentChoices}</Grid>
                                <Grid item> No View {timeSince(singleArticle && singleArticle.createAt)}</Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
};

export default ArticleSinglePage;


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
        history.push('/article-page')
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
