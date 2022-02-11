import React, { useEffect, Fragment, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Loader from "../../Loader/Loader";
import { useAlert } from 'react-alert'
import Pagination from '@mui/material/Pagination';
import CounsellorCard from './SingleCard/CounsellorCard'
import { useHistory, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'


import { getCarrerFunc } from '../../../actions/carrer/user/CarrerAction';
import { getCounsellorFunc } from '../../../actions/carrer/user/CounsellorAction';


const CounsellorPageViewAll = () => {
  const { loading, error, counsellor, CounsellorPageCount, counsellorTotalPagesCount } = useSelector((state) => state.counsellor);
  const { userCarrer } = useSelector((state) => state.userCarrer);
  const history = useHistory();
  const dispatch = useDispatch()
  const alert = useAlert()

  const [currentPage, setCurrentPage] = useState("");
  const [currentPageCarrer, setCurrentPageCarrer] = useState(1);
  const [carrerId, setCarrerId] = useState("");

  useEffect(() => {
    if (counsellor.length === 0) {
      dispatch(getCounsellorFunc(currentPage, carrerId))
    }
    if (userCarrer.length === 0) {
      dispatch(getCarrerFunc())
    }
    if (carrerId) {
      dispatch(getCounsellorFunc(currentPageCarrer, carrerId))
      return
    }
    if (currentPage) {
      dispatch(getCounsellorFunc(currentPage, carrerId))
      return
    }
  }, [dispatch, alert, error, currentPage, carrerId, currentPageCarrer])

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

  const setCurrentPageNoCarrer = (event, value) => {
    setCurrentPageCarrer(value);
  };

 
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
          <Grid container>
            <Grid item xs={12} sm={6} lg={4}>
              {/* use map here and pass the data as a prop  */}
              <CounsellorCard data={counsellor && counsellor.counsellor} />
            </Grid>
          </Grid>
          <Stack spacing={2}>
            {
              carrerId ?
                <Pagination count={counsellorTotalPagesCount} color="secondary" page={CounsellorPageCount} onChange={setCurrentPageNoCarrer} />
                :
                <Pagination count={counsellorTotalPagesCount} color="secondary" page={CounsellorPageCount} onChange={setCurrentPageNo} />
            }
          </Stack>
        </Container>
      )}
    </Fragment>
  )
};

export default CounsellorPageViewAll;

