import React, { useEffect, useState } from "react";
import "../css/bootstrap.min.css";
import "../css/pogo-slider.min.css";
import "../css/style.css";
import "../css/custom.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./myguruhome.css";
import Header from './Header'
//mui modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Grid } from "@mui/material";
import { MdLibraryBooks, MdOutlineArticle } from "react-icons/md";
import { BsCameraVideoFill } from "react-icons/bs";
import { GrWorkshop } from "react-icons/gr";
import { BsMapFill } from "react-icons/bs";
import { FaTeamspeak } from "react-icons/fa";

//mui modal style
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
  // p: 4,
};

const MyGuruHome = () => {
  const [datasection, setDataSection] = React.useState([]);
  const getDataSection = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/class-section/${id}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        setDataSection(resp);
      });
    });
  };

  //mui modal state

  const [open, setOpen] = React.useState(false);
  const [main, setMain] = useState(false);
  const [openSection, setOpenSection] = React.useState(false);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [three, setThree] = useState(false);
  const [classStaticID, setClassStaticID] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSectionOpen = (id) => {
    setOpenSection(true);
    removeLocal();
    localStorage.setItem("id", id);
    getDataSection(id);
  };
  const classSectioniFunc = (id) => {
    localStorage.setItem("classSection", id);
    history.push("./paymentsummery");
  };

  const videoPage = () => {
    history.push('./trending-video')
  }

  const handleSectionClose = () => setOpenSection(false);
  //mui modal state

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataMain, setDataMain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(false);
  const [classId, setClassId] = useState();
  const history = useHistory();
  let user = JSON.parse(localStorage.getItem("user-details"));

  useEffect(() => {
    getData();
    removeLocal();
  }, []);

  const removeLocal = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("typeOfTest");
    localStorage.removeItem("Class");
    localStorage.removeItem("time");
    localStorage.removeItem("resultTitle");
    localStorage.removeItem("discription");
    localStorage.removeItem("continue");
    localStorage.removeItem("classSection");
  };
  const getData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/class/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  };

  const classFunc = (id) => {
    removeLocal();
    localStorage.setItem("id", id);
    setClassId(id);
    setOpen(false);
  };

  let myArray = [];

  const filterFunc = (list) => {
    list.map(
      (p) =>
        data && data.filter((e) => e.newClass === p).map((m) => myArray.push(m))
    );
    setDataMain(myArray);
  };

  const setClassValue = (clsId) => {
    setFirst(true);
    if (clsId === 1) {
      let classV = ["6", "7", "8"];
      filterFunc(classV);
    } else {
      if (clsId === 2) {
        let classV = ["9"];
        filterFunc(classV);
      } else {
        if (clsId === 3) {
          let classV = ["10"];
          filterFunc(classV);
        } else {
          if (clsId === 4) {
            let classV = ["11", "12"];
            filterFunc(classV);
          }
        }
      }
    }
  };

  return (
    <>
      <Header />
      <div className="ulockd-home-slider mt-4">
        <div className="row">
          <div className="col-12 mt-4">
            <div
              className="bannerH"
              style={{ background: "url(/assets/images/banner_img2.png)" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-12 slide_text">
                    <div className="row justify-content-md-center mt-5">
                      <div className="clearfix mt-5"></div>
                      <div className="col-12 col-sm-4 col-xl-3">
                        <div className="iconFunction topbg">
                          <img
                            className="img-fluid"
                            src="/assets/images/career.jpg"
                            alt=""
                          />
                          <a data-toggle="modal" href="#videoModal">
                            <h2>Videos / Articles by</h2>
                            <strong>Career Guru's</strong>
                          </a>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-4 col-xl-3"
                        onClick={() => setMain(true)}
                      >
                        <div className="iconFunction topbg2">
                          <img
                            className="img-fluid"
                            src="/assets/images/counsel.jpg"
                            alt=""
                          />
                          <a>
                            <Button onClick={() => setMain(true)}>
                              6-12<sup>th</sup>
                            </Button>

                            <strong>
                              Check Your potential
                              <br /> Career Guidance and Counselling
                            </strong>
                          </a>
                        </div>
                      </div>
                      {/*  */}

                      {/*  */}
                      <div className="col-12 col-sm-4 col-xl-3">
                        <div className="iconFunction topbg3">
                          <img
                            className="img-fluid"
                            src="/assets/images/potential.jpg"
                            alt=""
                          />
                          <a data-toggle="modal" href="#collegeModal">
                            <h2>College & working professional</h2>
                            <strong>
                              Check Your potential <br /> Career Guidance and
                              Counselling
                            </strong>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main">
                    <div className="form-group has-search">
                      <span className="fa fa-search form-control-feedback"></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search College, Exam, career, videos and more"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- .pogoSlider --> */}
        </div>
        {/* <!--</div>--> */}
      </div>
      {/* <!-- End Banner --> */}

      {/* Modal starts */}
      <div className="modal homeModal" id="videoModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Videos / Articles by Career Guru's
              </h4>
              <button
                type="button"
                className="close d-none"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="container"></div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}
                  <Button onClick={() => videoPage()}>
                    <a
                      className="btn btn-lg btn-success square-button"
                    >
                      <i className="fa fa-video-camera" aria-hidden="true"></i>
                      <br />
                      Videos
                    </a>
                  </Button>
                </div>
                <div className="col-sm-6 text-center">
                  <a className="btn btn-lg btn-warning square-button">
                    <i className="fa fa-file-text" aria-hidden="true"></i>
                    <br />
                    Articles
                  </a>
                </div>
              </div>
            </div>
            <div className="modal-footer text-center">
              <a href="#" data-dismiss="modal" className="btn btn-dark">
                Close
              </a>
              {/* <!--<a href="#" className="btn btn-primary">Save changes</a>--> */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <KeyboardBackspaceIcon
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={() => handleClose()}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {dataMain &&
              dataMain.map((e) =>
                e.classOrCollage.classOrCollage === "Schools" ? (
                  <div
                    className="button_holder col-sm-3 "
                    style={{ maxWidth: "100px" }}
                  >
                    <div
                      className="btn btn-lg btn-primary "
                      style={{ color: "white", padding: "20px" }}
                      onClick={() => handleSectionOpen(e.id)}
                    >
                      Class
                      <br />
                      <span>
                        {e.newClass}
                        <sup>th</sup>
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openSection}
        onClose={handleSectionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <KeyboardBackspaceIcon
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={() => handleSectionClose()}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {datasection.map((e) => (
              <div
                className="button_holder col-sm-3 "
                style={{ maxWidth: "100px" }}
              >
                <div
                  className="btn btn-lg btn-primary "
                  style={{ color: "white", padding: "20px" }}
                  onClick={() => classSectioniFunc(e.id)}
                >
                  <br />
                  <span>{e.newClass}</span>
                </div>
              </div>
            ))}
          </Typography>
        </Box>
      </Modal>

      {/* main modal */}
      <Modal
        open={main}
        onClose={() => setMain(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ marginTop: "20px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <CancelIcon
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={() => setMain(false)}
            />
          </Typography>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            id="modal-modal-description"
          >
            <Grid style={{ marginLeft: "130px" }} container spacing={3}>
              <Grid item>
                <div
                  className="class_selection"
                  onClick={() => setClassValue(1)}
                >
                  <div>Class &nbsp;</div>
                  <div>
                    6-8<sup>th</sup>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div
                  className="class_selection1"
                  style={{ color: "white", padding: "20px" }}
                  onClick={() => setClassValue(2)}
                >
                  Class
                  <br />
                  <span>
                    9<sup>th</sup>
                  </span>
                </div>
              </Grid>
            </Grid>

            <Grid
              style={{ marginLeft: "130px", marginTop: "30px" }}
              container
              spacing={3}
            >
              <Grid item>
                {" "}
                <div
                  className="class_selection2"
                  style={{ color: "white", padding: "20px" }}
                  onClick={() => setClassValue(3)}
                >
                  Class
                  <br />
                  <span>
                    10
                    <sup>th</sup>
                  </span>
                </div>{" "}
              </Grid>
              <Grid item>
                <div
                  className="class_selection3"
                  style={{ color: "white", padding: "20px" }}
                  onClick={() => setClassValue(4)}
                >
                  Class 11 - 12
                </div>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>

      {/* first */}
      <Modal
        open={first}
        onClose={() => setFirst(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ marginTop: "20px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <KeyboardBackspaceIcon
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={() => setFirst(false)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal-body">
              <div className="row">
                <div className="">
                  <div className="button_holder">
                    <Button onClick={() => setThree(true)}>
                      <a className=" class_selection i_konw">
                        I Know
                        <br />
                        What I Want
                        <br />
                        To Do
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="">
                  <div className="button_holder ">
                    <Button onClick={() => setSecond(true)}>
                      <a className=" class_selection3 i_konw">
                        I Wish
                        <br />
                        To Explore
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>

      {/* Second */}
      <Modal
        open={second}
        onClose={() => setSecond(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ marginTop: "20px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <KeyboardBackspaceIcon
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={() => setSecond(false)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 text-center">
                  <div className="button_holder">
                    <Button onClick={() => setOpen(true)}>
                      <a className="class_selection3 i_konw">
                        I Psychometric
                        <br />
                        Assessment
                        <br />
                        To Do
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="button_holder">
                    <a className="class_selection2 i_konw">
                      I Speak
                      <br />A Counsellor
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>

      {/* three */}
      <Modal
        open={three}
        onClose={() => setThree(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ marginTop: "20px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <KeyboardBackspaceIcon
              style={{ cursor: "pointer", fontSize: "30px" }}
              onClick={() => setThree(false)}
            />
          </Typography>
          <Typography
            style={{ marginTop: "20px" }}
            id="modal-modal-description"
            sx={{}}
          >
            <Grid container spacing={4}>
              <Grid item>
                {" "}
                <div className="">
                  <a className="class_selection i_konw">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MdLibraryBooks className="career_logo" />{" "}
                      <span>
                        {" "}
                        career
                        <br />
                        Information
                        <br />
                        Capsule
                      </span>
                    </div>
                  </a>
                </div>
              </Grid>
              <Grid item>
                {" "}
                <div className="">
                  <a className="class_selection2 i_konw">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BsCameraVideoFill className="career_logo" />{" "}
                      <span>
                        {" "}
                        Acess
                        <br />
                        Expert
                        <br />
                        Video
                      </span>
                    </div>
                  </a>
                </div>
              </Grid>
              <Grid item>
                <div className="">
                  <a className="class_selection1 i_konw">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MdOutlineArticle className="career_logo" />{" "}
                      <span>
                        {" "}
                        Featured
                        <br />
                        Article
                      </span>
                    </div>
                  </a>
                </div>
              </Grid>
              <Grid item>
                <div className="">
                  <a className="class_selection3 i_konw">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <GrWorkshop className="career_logo" />{" "}
                      <span>
                        {" "}
                        Workshop
                        <br />
                        Seminar
                      </span>
                    </div>
                  </a>
                </div>
              </Grid>
              <Grid item>
                <div className="">
                  <a className="class_selection2 i_konw">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BsMapFill className="career_logo" />{" "}
                      <span>
                        {" "}
                        Career
                        <br />
                        Map
                      </span>
                    </div>
                  </a>
                </div>
              </Grid>
              <Grid item>
                <div className="">
                  <a className="class_selection3 i_konw">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaTeamspeak className="career_logo" />{" "}
                      <span>
                        {" "}
                        Speak
                        <br />
                        To counsellor
                      </span>
                    </div>
                  </a>
                </div>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>

      {/* mui modals */}

      {/*  */}
      <div className="modal homeModal" id="dydModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Discover Your Dream Program</h4>
              <button
                type="button"
                className="close d-none"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="container"></div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}
                  <div className="button_holder">
                    <a href="/paymentsummary" id="iknowModalBtn" className="">
                      I Know
                      <br />
                      What I Want
                      <br />
                      To Do
                    </a>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="button_holder">
                    <a
                      href="#"
                      id="idontknowModalBtn"
                      className="btn btn-lg btn-warning square-button"
                    >
                      I Wish
                      <br />
                      To Explore
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer text-center">
              <a href="#" data-dismiss="modal" className="btn btn-dark">
                Close
              </a>
              {/* <!--<a href="#" className="btn btn-primary">Save changes</a>--> */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal homeModal" id="dydModal7th">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">choose</h4>
              <button
                type="button"
                className="close d-none"
                data-dismiss="dydModal7th"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="container"></div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}

                  <div className="button_holder">
                    <a
                      data-toggle="modal"
                      href="/6th/paymentsummary"
                      className="btn btn-lg btn-danger square-button"
                    >
                      Class
                      <br />
                      <span>
                        6<sup>th</sup>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}
                  <div className="button_holder">
                    <a
                      data-toggle="modal"
                      href="/7th/paymentsummary"
                      className="btn btn-lg btn-primary square-button"
                    >
                      Class
                      <br />
                      <span>
                        7<sup>th</sup>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="button_holder">
                    <a
                      data-toggle="modal"
                      href="/8th/paymentsummary"
                      className="btn btn-lg btn-success square-button"
                    >
                      Class
                      <br />
                      <span>
                        8<sup>th</sup>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer text-center">
              <a href="#" data-dismiss="modal" className="btn btn-dark">
                Close
              </a>
              {/* <!--<a href="#" className="btn btn-primary">Save changes</a>--> */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal homeModal" id="dydModal0th">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">choose</h4>
              <button
                type="button"
                className="close d-none"
                data-dismiss="dydModal0th"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="container"></div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}

                  <div className="button_holder">
                    <a
                      data-toggle="modal"
                      href="/10th/int/paymentsummary"
                      className="btn btn-lg btn-danger square-button"
                    >
                      Interest
                      <br />
                      <span>
                        10<sup>th</sup>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}
                  <div className="button_holder">
                    <a
                      data-toggle="modal"
                      href="/10th/paymentsummary"
                      className="btn btn-lg btn-primary square-button"
                    >
                      Basic
                      <br />
                      <span>
                        10<sup>th</sup>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer text-center">
              <a href="#" data-dismiss="modal" className="btn btn-dark">
                Close
              </a>
              {/* <!--<a href="#" className="btn btn-primary">Save changes</a>--> */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal homeModal" id="dydModal12th">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">choose</h4>
              <button
                type="button"
                className="close d-none"
                data-dismiss="dydModal2th"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="container"></div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}

                  <div className="button_holder">
                    <a
                      data-toggle="modal"
                      href="/paymentsummary"
                      className="btn btn-lg btn-success square-button"
                    >
                      Class
                      <br />
                      <span>
                        11<sup>th</sup>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}
                  <div className="button_holder">
                    <a
                      data-toggle="modal"
                      href="/12th/paymentsummary"
                      className="btn btn-lg btn-primary square-button"
                    >
                      Class
                      <br />
                      <span>
                        12<sup>th</sup>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer text-center">
              <a href="#" data-dismiss="modal" className="btn btn-dark">
                Close
              </a>
              {/* <!--<a href="#" className="btn btn-primary">Save changes</a>--> */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal homeModal" id="collegeModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Are you College & Working Professionals?
              </h4>
              <button
                type="button"
                className="close d-none"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div className="container"></div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}
                  <a
                    data-toggle="modal"
                    href="#"
                    data-target="#collegeworking"
                    id="graduationBtn"
                    className="btn btn-lg btn-info square-button "
                    data-dismiss="modal"
                  >
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                    <br />
                    College
                    <br />
                    Graduates
                  </a>
                </div>

                <div className="col-6 text-center">
                  {/* <!--<a data-toggle="modal" href="#myModal2" className="btn btn-primary">Launch modal</a>--> */}
                  <a
                    data-toggle="modal"
                    href="#"
                    data-target="#collegeprofessional"
                    id="graduationBtn"
                    className="btn btn-lg btn-primary square-button "
                    data-dismiss="modal"
                  >
                    <i className="fa fa-handshake-o" aria-hidden="true"></i>
                    <br />
                    Working
                    <br />
                    Professionals
                  </a>
                </div>
              </div>
            </div>
            <div className="modal-footer text-center">
              <a href="#" data-dismiss="modal" className="btn btn-dark">
                Close
              </a>
              {/* <!--<a href="#" className="btn btn-primary">Save changes</a>--> */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal homeModal" id="collegeprofessional">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Collage Professional</h4>
              <button
                type="button"
                className="close d-none"
                data-dismiss="dydModal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>

            <div className="container"></div>
            <div className="modal-body">
              <div className="row">
                <div className="text-center ">
                  {data.map((e) =>
                    e.classOrCollage.classOrCollage === "Collages" ? (
                      <div className="button_holder col-sm-5  d-flex">
                        <a
                          data-toggle="modal"
                          className="btn btn-lg btn-primary square-button"
                          data-dismiss="modal"
                          onClick={() => classFunc(e.id)}
                          id="ett"
                        >
                          Class
                          <br />
                          <span>
                            {e.newClass}
                            <sup>th</sup>
                          </span>
                        </a>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer text-center">
              <a href="#" data-dismiss="modal" className="btn btn-dark">
                Close
              </a>
              {/* <!--<a href="#" className="btn btn-primary">Save changes</a>--> */}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- section contact start --> */}
      <div className="section layout_padding padding_bottom-0 ">
        <div className="container">
          <div className="row">
            <hr />
            <div className="col-md-12">
              <div className="full">
                <div className="heading_main text_align_center">
                  <h2>
                    <span>Contact</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- end section --> */}
      {/* <!-- section --> */}
      <div
        className="section contact_section"
        style={{ background: "#12385b" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="full float-right_img">
                <img src="assets/images/img10.png" alt="#" />
              </div>
            </div>
            <div className="layout_padding col-lg-6 col-md-6 col-sm-12">
              <div className="contact_form">
                <form action="contact.html">
                  <fieldset>
                    <div className="full field">
                      <input
                        type="text"
                        placeholder="Your Name"
                        name="your name"
                      />
                    </div>
                    <div className="full field">
                      <input
                        type="email"
                        placeholder="Email Address"
                        name="Email"
                      />
                    </div>
                    <div className="full field">
                      <input
                        type="phn"
                        placeholder="Phone Number"
                        name="Phone number"
                      />
                    </div>
                    <div className="full field">
                      <textarea placeholder="Massage"></textarea>
                    </div>
                    <div className="full field">
                      <div className="center">
                        <button>Send</button>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end section --> */}
    </>
  );
};

export default MyGuruHome;
