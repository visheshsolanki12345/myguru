import React, { Fragment, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from '../../Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { timeSince } from '../../CommanFunction/time'
import { getCounsellorSingleFunc } from "../../../actions/carrer/user/CounsellorAction";
import { getUserWiseSlotFunc } from "../../../actions/carrer/user/SlotBookingAction";
import axios from 'axios'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from '@mui/material/CircularProgress';
import { post } from '../../CommanFunction/PaytemPayment'

const CounsellorSinglePage = ({ match }) => {

  const dispatch = useDispatch()
  const { loading, error, singleCounsellor } = useSelector((state) => state.singleCounsellor);
  const { allSlot } = useSelector((state) => state.allSlot);
  const alert = useAlert()

  useEffect(() => {
    dispatch(getCounsellorSingleFunc(match.params.id))
    dispatch(getUserWiseSlotFunc(match.params.id))
  }, [dispatch, alert, error, match.params.id])


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Grid
            container
            style={{ boxShadow: "0px 40px 110px 0px rgb(9 6 38 / 62%)" }}
          >
            <Grid item lg={8}>
              <div className="counsellor_single_page_heading">

                <Typography variant="body2" color="text.secondary">
                  aboutUs : {singleCounsellor.aboutUs}
                  address : {singleCounsellor.address}
                  area : {singleCounsellor.area}
                  college : {singleCounsellor.college}
                  dateOfBirth : {singleCounsellor.dateOfBirth}
                  designation : {singleCounsellor.designation}
                  experience : {singleCounsellor.experience}
                  gender : {singleCounsellor.gender}
                  mobile : {singleCounsellor.mobile}
                  language : {singleCounsellor.language}
                  pincode : {singleCounsellor.pincode}
                  price : {singleCounsellor.price}
                  qualification : {singleCounsellor.qualification}
                  title : {singleCounsellor.title}
                  Rating : {singleCounsellor.rating}
                  No View : {singleCounsellor.noView}
                  Counsellor Registration Date : {timeSince(singleCounsellor.createAt)}
                </Typography>
              </div>

              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={`${process.env.REACT_APP_API_URL}` + singleCounsellor && singleCounsellor.user && singleCounsellor.user.profile && singleCounsellor.user.profile.userPic}
              />

              <div className="counsellor_single_page_book_now_button">
                {" "}
                Book Now
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="counsellor_single_page_bottom_part_image">
                {" "}
                <img src={`${process.env.REACT_APP_API_URL}` + singleCounsellor.bannerImage}></img>{" "}
              </div>
              <div className="counsellor_single_page_heading_profession"></div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item lg={2}>
              <MaterialUIPickers data={allSlot} />
            </Grid>
            <Grid item lg={10}>
              <div className='counsellor_single_page_available_slots'>
                <Grid container>

                  {/* map the slot here */}
                  <Grid item lg={3}>

                  </Grid>
                </Grid>
              </div>

            </Grid>
          </Grid>

        </Container>
      )}
    </Fragment>
  )
};

export default CounsellorSinglePage;


// date picker slot booking



export function MaterialUIPickers({ data }) {

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "476px",
    height: "70vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "0 0 0 30px",
    // filter: "blur(8px)",
    // p: 4,
  };

  const [openModal, setOpenModal] = useState(false)
  const [counsId, setCousId] = useState("")
  const [Myloading, setMyLoading] = useState(false)
  const [dateWeek, setDateWeek] = useState("")
  const [selectDate, setSelectDate] = useState("")
  const history = useHistory();
  const [open, setOpen] = useState(false)

  const userInfo = JSON.parse(localStorage.getItem('user-details'))
  const { loading } = useSelector((state) => state.allSlot);

  const dateset = new Set()
  data && data.forEach((e) =>
    dateset.add(e.date)
  )
  let array = Array.from(dateset);

  const getWeekDay = (myDate) => {
    var gsDayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    let date = new Date(myDate);
    return gsDayNames[date.getDay()]
  }

  const getSlotDate = (selectDATE, weekday) => {
    setSelectDate(selectDATE)
    setOpenModal(true)
    setDateWeek(`${selectDate}<==>${weekday}`)
    return
  }


  const bookSlotByUser = (id) => {
    if (id) {
      setCousId(id)
      setOpenModal(false)
      setOpen(true)
    }

  }

  const payment = async () => {
    setMyLoading(true)
    const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
    let myApi = await axios.post(`${process.env.REACT_APP_API_URL}/api/carrer/slot-booking/${counsId}/`, "", config)
    setCousId("")
    var information = {
      action: "https://securegw-stage.paytm.in/order/process",
      params: myApi.data,
    }
    post(information)
  }

  const goBack = () => {
    setCousId("")
    history.push('/counsellor-page')
  }


  return (
    <Fragment>
      <Stack spacing={3}>
        {
          array && array.map((e) =>
            <Button ColorButton variant="contained" onClick={() => getSlotDate(e, getWeekDay(e))}>
              <Typography>Date : {e}</Typography>
              <Typography> - Day : {getWeekDay(e)}</Typography>
            </Button>
          )}
        <div>
          <Modal
            open={openModal}
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
                      onClick={() => setOpenModal(false)}
                    />

                  </Typography>
                  <Typography>Date {dateWeek.split("<==>")[0]}</Typography>
                  <Typography>WeekDay {dateWeek.split("<==>")[1]}</Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    {
                      data && data.filter((f) => f.date === selectDate).map((e) =>
                        <Button disabled={e.isBook == false ? false : true} variant="contained" style={{ gap: '30px' }} onClick={() => bookSlotByUser(e.id, e.counsellor)}>
                          {`${e.timeFrom} to ${e.timeTo}`}
                        </Button>
                      )
                    }
                  </Typography>
                </div>
              )}
            </Box>

          </Modal>
        </div>
        <div>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {Myloading ? (
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
      </Stack>
    </Fragment>
  );
}

