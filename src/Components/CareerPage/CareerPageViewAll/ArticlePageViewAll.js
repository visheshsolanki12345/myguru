import React, { Fragment, useState, useEffect } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { Container, Grid } from '@mui/material';
// import SearchBar from "material-ui-search-bar";
// import Pagination from 'react-js-pagination';
import Stack from '@mui/material/Stack';
import './careerpageviewall.css'
import Pagination from '@mui/material/Pagination';

import Loader from "../../Loader/Loader";
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getArticleFunc } from '../../../actions/carrer/user/ArticleAction'
import { useHistory, Link } from 'react-router-dom';
import { timeSince } from '../../CommanFunction/time'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getCarrerFunc } from '../../../actions/carrer/user/CarrerAction';


const ArticlePageViewAll = () => {


  const dispatch = useDispatch()
  const { loading, error, allArticle, ariclePageCount, aricleTotalPagesCount } = useSelector((state) => state.allArticle);
  const { userCarrer } = useSelector((state) => state.userCarrer);
  const history = useHistory();
  const alert = useAlert()

  const [currentPage, setCurrentPage] = useState("");
  const [currentPageCarrer, setCurrentPageCarrer] = useState(1);

  const [carrerId, setCarrerId] = useState("");

  useEffect(() => {
    if (allArticle.length === 0) {
      dispatch(getArticleFunc(currentPage, carrerId))
    }
    if (userCarrer.length === 0) {
      dispatch(getCarrerFunc())
    }
    if (carrerId) {
      dispatch(getArticleFunc(currentPageCarrer, carrerId))
      return
    }
    if (currentPage) {
      dispatch(getArticleFunc(currentPage, carrerId))
      return
    }
    
  }, [dispatch, alert, error, currentPage, carrerId, currentPageCarrer])

  const setCurrentPageNo = (event, value) => {
    setCurrentPage(value);
  };

  const setCurrentPageNoCarrer = (event, value) => {
    setCurrentPageCarrer(value);
  };

  let rows = []

  userCarrer && userCarrer.forEach((item, index) => {
    rows.push({
      id: item.id,
      label: item.carrer,
    });
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <div>
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
          </div>
          <Grid container justify='space-between'>
            <Grid item> Category </Grid>
            <Grid item> Date </Grid>
          </Grid>
          <Divider />
          <Grid container>
            {
              allArticle.editorArticle && allArticle.editorArticle.map((e) =>
                <Link to={`/article-page/${e.id}`} >
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <div>
                      <img style={{ width: '160px', height: "160px" }} src={`${process.env.REACT_APP_API_URL}` + e.studentArticle.bannerImage}></img>
                      <Typography variant='h4'>{e.studentArticle.title}</Typography>
                      <Typography variant='h4'>{e.studentArticle.heading}</Typography>
                      <Typography variant='h5'>{e.studentArticle.description}</Typography>
                      <div style={{ display: 'flex' }}> <Typography variant='h6'> Created By: {e.user.last_name} </Typography> <Typography variant='h6'> Times {timeSince(e.createAt)} </Typography>
                        <Typography variant='h6'>Rating: {e.noView}</Typography>
                        <Typography variant='h6'>No. Views: {e.rating}</Typography>
                        <Typography variant='h6'>Payble: {e.paymentChoices}</Typography>
                        <Typography variant='h6'>Price: {e.ammount}</Typography>
                        <Typography variant='h6'>Publish Date: {timeSince(e.createAt)}</Typography>
                      </div>
                    </div>
                    {/* <Typography variant='h6'>carrer: {}</Typography> */}
                  </Grid>
                </Link>
              )
            }
          </Grid>
          <Stack spacing={2}>
          {
            carrerId ?
            <Pagination count={aricleTotalPagesCount} color="secondary" page={ariclePageCount} onChange={setCurrentPageNoCarrer} />
            :
            <Pagination count={aricleTotalPagesCount} color="secondary" page={ariclePageCount} onChange={setCurrentPageNo} />
          }
          </Stack>

        </Container>
      )}
    </Fragment>
  )
};

export default ArticlePageViewAll;








