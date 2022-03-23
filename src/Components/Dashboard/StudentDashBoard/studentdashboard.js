import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getTest } from "../../../actions/Test/TestAction";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { purchasedvideo, textwithlogo } from "./data";
import { Link, useHistory } from "react-router-dom";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import { useSelector, useDispatch } from 'react-redux'
import { getAllStudentData } from "../../../actions/StudentDashBoard/GetAllStudentDataAction";


const drawerWidth = 240;
const useStyles = makeStyles({
  item: {
    fontSize: "58px",
  },
  paddings: {
    padding: "30px",
  },
  containers: {
    background: "black",
  },
});




function ResponsiveDrawer(props) {
  const [dash,setDash] = React.useState(1)
  const classes = useStyles();
  const [changelayout, setChangelayout] = React.useState(0);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const changeDrawer = (index) => {
    setChangelayout(index);
  };

  const drawer = (
    <div>
      <img
        style={{ height: "100px", width: "160px" }}
        src="assets/images/logo.png"
        alt="image"
      />
      <Toolbar />
      <Divider />
      <div style={{ padding: "20px 0" }}>
        {textwithlogo.map((text, index) => (
          <>
            <Container onClick={() => changeDrawer(index)}>
              <Typography
                align="left"
                style={{ padding: "20px 20px", cursor: "pointer" }}
                variant="h4"
              >
                {" "}
                {/* {text.logo} */}
                {text.text}
              </Typography>
            </Container>
          </>
        ))}
      </div>

      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText style={{fontSize:'38px'}} primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Test Table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }



  const removeLocal = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("typeOfTest");
    localStorage.removeItem("Class");
    localStorage.removeItem("continue");
  };

  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [dataPay, setDataPay] = React.useState([]);
  const [video, setVideo] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const history = useHistory();
  let user = JSON.parse(localStorage.getItem("user-details"));

  useEffect(() => {
    getData();
    getDataPay();
    parchesVideo()
    // removeLocal();
  }, []);

  const getData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/student-panding-test/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user && user.access}`,
      },
    }).then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  };
  
  const parchesVideo = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/video/parches-videos/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user && user.access}`,
      },
    }).then((result) => {
      result.json().then((resp) => {
        setVideo(resp);
      });
    });
  };


  const getDataPay = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/buy-test/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user && user.access}`,
      },
    }).then((result) => {
      result.json().then((resp) => {
        setDataPay(resp);
      });
    });
  };

  const classFunc = (id, classSection) => {
    // removeLocal();
    let item = { id };
    localStorage.setItem("id", id);
    localStorage.setItem("classSection", classSection);
    localStorage.setItem("continue", "continue");
    dispatch(getTest(item));
    history.push("./paymentsummery");
  };

  const classFuncPay = (id, classSection) => {
    // removeLocal();
    let item = { id };
    localStorage.setItem("id", id);
    localStorage.setItem("classSection", classSection);
    localStorage.setItem("continue", "continue");
    dispatch(getTest(item));
    history.push("./paymentsummery");
  };


  useEffect(() => {
    dispatch(getAllStudentData())
  }, [dispatch])

  const userInfo = JSON.parse(localStorage.getItem('user-details'))

  return (
    <div style={{marginTop:'140px',paddingLeft:'50px',marginBottom:'40px'}}>
      <Grid container spacing={6}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
        <Grid container align='left' spacing={6} style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12} style={{paddingBottom:'50px'}}> <img style={{height:'80px',width:'150px'}} src="assets/images/logo.png"></img></Grid>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12} style={{cursor:'pointer',background: dash==1?'#90ee90':'white'}}  onClick={()=>setDash(1)}><Typography style={{color: dash==1?'white':'black'}} variant='h4'>Dashboard</Typography></Grid>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12}  style={{cursor:'pointer',background: dash==2?'#90ee90':'white'}}  onClick={()=>setDash(2)}><Typography style={{color: dash==2?'white':'black'}} variant='h4'>Test</Typography></Grid>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12}  style={{cursor:'pointer',background: dash==3?'#90ee90':'white'}}  onClick={()=>setDash(3)}><Typography style={{color: dash==3?'white':'black'}} variant='h4'>Video</Typography></Grid>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12}><Typography variant='h4'>Articles</Typography></Grid>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12}><Typography variant='h4'>Counsellor</Typography></Grid>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12}><Typography variant='h4'>Appointment</Typography></Grid>
           
        </Grid>
        </Grid> 
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          { dash==1?( <Grid container spacing={2}>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12} style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',background:'blue',}}>
            <Typography variant='h3' style={{color:'white'}}>Dashboard</Typography>
            </Grid>
            <Grid item xs={12} ms={12} md={7} lg={7} xl={7} ><Typography variant='h3' style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',padding:"30px"}}>Welcome Back,{userInfo && userInfo.name}!</Typography></Grid>
            <Grid item xs={12} ms={12} md={5} lg={5} xl={5}><Typography variant='h4'> {userInfo && userInfo.email} </Typography></Grid>
            <Grid item xs={12} ms={12} md={7} lg={7} xl={7} style={{textAlign:"left",marginTop:'20px'}}><Typography variant='h3' style={{lineHeight:'2'}}>Purchased Video</Typography></Grid>
            <Grid item xs={12} ms={12} md={7} lg={7} xl={7}>
              <Grid container>
                <Grid item xs={3} ms={3} md={3} lg={3} xl={3} style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',lineHeight:'2',padding:'20px'}}>
             <Typography variant='h4'> TEST:  {dataPay && Object.keys(dataPay).length}</Typography>
                </Grid>
                <Grid item xs={3} ms={3} md={3} lg={3} xl={3} style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',lineHeight:'2',padding:'20px'}}>
           <Typography variant='h4'>   VIDEO:   {video && Object.keys(video).length}</Typography>
                </Grid>
              </Grid>
            </Grid>
        </Grid>):dash==3?( <Grid container spacing={2}>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12} style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',background:'blue',}}>
            <Typography variant='h3' style={{color:'white'}}>Video</Typography>
            </Grid>
            <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>
                          <Typography
                            style={{ fontSize: "19px", color: "white", padding: '12px' }}
                          >
                            Videos
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right' >
                          <Typography
                            style={{ fontSize: "19px", color: "white", padding: '12px' }}
                          >
                            PURCHASE  Video
                          </Typography>
                        </StyledTableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(video && video).map(([k, v]) => (
                        <StyledTableRow key={k}>
                          <StyledTableCell component="th" scope="row">
                            <Typography
                              style={{ fontSize: "17px", fontWeight: '700', color: "black", padding: '12px' }}
                            >
                              {v.split("<==>")[0]}
                            </Typography>
                            <img style={{'width': '100px', 'height': '70px'}} src={`${process.env.REACT_APP_API_URL}/media/${v.split("<==>")[1]}`} alt="video" />
                          </StyledTableCell>

                          <StyledTableCell align='right' style={{ cursor: 'pointer' }}  component="th" scope="row">
                            <Link to={`/video-page/${k}`}><Button variant="contained" color="success"><Typography
                              style={{ fontSize: "17px", color: "black", padding: '12px' }}
                            >
                              watch
                            </Typography></Button></Link>
                          </StyledTableCell>

                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
        </Grid>):dash==2?( <Grid container spacing={2}>
            <Grid item xs={12} ms={12} md={12} lg={12} xl={12} style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',background:'blue',}}>
            <Typography variant='h3' style={{color:'white'}}>test</Typography>
            </Grid>
            <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>
                          <Typography
                            style={{ fontSize: "19px", color: "white", padding: '12px' }}
                          >
                            Class
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right' >
                          <Typography
                            style={{ fontSize: "19px", color: "white", padding: '12px' }}
                          >
                            PENDING TEST
                          </Typography>
                        </StyledTableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(data && data).map(([k, v]) => (
                        <StyledTableRow key={k}>
                          <StyledTableCell component="th" scope="row">
                            <Typography
                              style={{ fontSize: "17px", fontWeight: '700', color: "black", padding: '12px' }}
                            >
                              {v.split("<==>")[0]}<sup>th</sup>
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell align='right' style={{ cursor: 'pointer' }} onClick={() => classFunc(k, v.split("<==>")[1])} component="th" scope="row">
                            <Button variant="contained" color="success"><Typography
                              style={{ fontSize: "17px", color: "black", padding: '12px' }}
                            >
                              Continue Test
                            </Typography></Button>
                          </StyledTableCell>

                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
        </Grid>):""
            
         }
        </Grid> 
      </Grid>

      
    </div>
  );
}

 
export default ResponsiveDrawer;


// <Box sx={{ display: "flex" }} >
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h3" noWrap component="div">
//               {changelayout == 0 ? "Dasboard" : changelayout == 1 ? "Test" : ""}
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//           aria-label="mailbox folders"
//         >
//           {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//           <Drawer
//             container={container}
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />
//           {changelayout == 0 ? (
//             <>
//               <Container>
//                 <Grid container spacing={4}>
//                   <Grid lg={9} item>
//                     <Grid container spacing={3} direction="column">
//                       <Grid item>
//                         <Paper elevation={3}>
//                           <Grid className={classes.paddings} container>
//                             <Grid item lg={8}>
//                               <div>
//                                 {" "}
//                                 <Typography variant="h3">
//                                   Welcome Back, {userInfo && userInfo.name}!
//                                 </Typography>
//                               </div>
//                               <div
//                                 style={{
//                                   position: "absolute",
//                                   marginLeft: "100px",
//                                   marginTop: "0px",
//                                 }}
//                               >
//                               </div>
//                             </Grid>
//                             {/* <Grid item lg={3}>
//                               <img src="assets/images/dashboard_image.jpg"></img>
//                             </Grid> */}
//                           </Grid>
//                         </Paper>
//                       </Grid>
                      
//                       <Grid item>
//                         <Typography variant="h3" align="left">
//                           Purchased Videos
//                         </Typography>
//                         <div>
//                           <Paper elevation={3} className="d-flex flex-wrap">
//                               <>
//                                 <Paper
//                                   className={classes.paddings}
//                                   elevation={3}
//                                 >
//                                   <Typography variant="h3">
//                                     {dataPay && Object.keys(dataPay).length}
//                                   </Typography>
//                                   <Typography variant="h4">Test</Typography>
//                                 </Paper>

//                                 <Paper
//                                   className={classes.paddings}
//                                   elevation={3}
//                                 >
//                                   <Typography variant="h3">
//                                   {video && Object.keys(video).length}
//                                   </Typography>
//                                   <Typography variant="h4">Video</Typography>
//                                 </Paper>
//                               </>
//                           </Paper>
//                         </div>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid lg={3} item>
//                     <Grid container spacing={3} direction="column">
//                       <Grid items lg={12}>
//                         <Typography align="center" variant="h4">
//                           <Avatar src="/broken-image.jpg" />
//                           {userInfo && userInfo.name} <ModeEditOutlineOutlined />
//                         </Typography>
//                         <Typography variant="h5" align="center">
//                         {userInfo && userInfo.email}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Container>
//             </>
//           ) : (
//             ""
//           )}
//           {changelayout == 1 ? (
//             <>
//               <Container>

//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                       <TableRow>
//                         <StyledTableCell>
//                           <Typography
//                             style={{ fontSize: "19px", color: "white", padding: '12px' }}
//                           >
//                             Class
//                           </Typography>
//                         </StyledTableCell>
//                         <StyledTableCell align='right' >
//                           <Typography
//                             style={{ fontSize: "19px", color: "white", padding: '12px' }}
//                           >
//                             PENDING TEST
//                           </Typography>
//                         </StyledTableCell>

//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {Object.entries(data && data).map(([k, v]) => (
//                         <StyledTableRow key={k}>
//                           <StyledTableCell component="th" scope="row">
//                             <Typography
//                               style={{ fontSize: "17px", fontWeight: '700', color: "black", padding: '12px' }}
//                             >
//                               {v.split("<==>")[0]}<sup>th</sup>
//                             </Typography>
//                           </StyledTableCell>

//                           <StyledTableCell align='right' style={{ cursor: 'pointer' }} onClick={() => classFunc(k, v.split("<==>")[1])} component="th" scope="row">
//                             <Button variant="contained" color="success"><Typography
//                               style={{ fontSize: "17px", color: "black", padding: '12px' }}
//                             >
//                               Continue Test
//                             </Typography></Button>
//                           </StyledTableCell>

//                         </StyledTableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Container>
//               <hr />

//               <Container>
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                       <TableRow>
//                         <StyledTableCell>
//                           <Typography
//                             style={{ fontSize: "19px", color: "white", padding: '12px' }}
//                           >
//                             Class
//                           </Typography>
//                         </StyledTableCell>
//                         <StyledTableCell align='right' >
//                           <Typography
//                             style={{ fontSize: "19px", color: "white", padding: '12px' }}
//                           >
//                             PURCHASE  TEST
//                           </Typography>
//                         </StyledTableCell>

//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {Object.entries(dataPay && dataPay).map(([k, v]) => (
//                         <StyledTableRow key={k}>
//                           <StyledTableCell component="th" scope="row">
//                             <Typography
//                               style={{ fontSize: "17px", fontWeight: '700', color: "black", padding: '12px' }}
//                             >
//                               {v.split("<==>")[0]}<sup>th</sup>
//                             </Typography>
//                           </StyledTableCell>

//                           <StyledTableCell align='right' style={{ cursor: 'pointer' }} onClick={() => classFuncPay(k, v.split("<==>")[1])} component="th" scope="row">
//                             <Button variant="contained" color="success"><Typography
//                               style={{ fontSize: "17px", color: "black", padding: '12px' }}
//                             >
//                               Continue Test
//                             </Typography></Button>
//                           </StyledTableCell>

//                         </StyledTableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Container>
//             </>
//           ) : changelayout == 2 ?
//           <>
//               <Container>
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                       <TableRow>
//                         <StyledTableCell>
//                           <Typography
//                             style={{ fontSize: "19px", color: "white", padding: '12px' }}
//                           >
//                             Videos
//                           </Typography>
//                         </StyledTableCell>
//                         <StyledTableCell align='right' >
//                           <Typography
//                             style={{ fontSize: "19px", color: "white", padding: '12px' }}
//                           >
//                             PURCHASE  Video
//                           </Typography>
//                         </StyledTableCell>

//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {Object.entries(video && video).map(([k, v]) => (
//                         <StyledTableRow key={k}>
//                           <StyledTableCell component="th" scope="row">
//                             <Typography
//                               style={{ fontSize: "17px", fontWeight: '700', color: "black", padding: '12px' }}
//                             >
//                               {v.split("<==>")[0]}
//                             </Typography>
//                             <img style={{'width': '100px', 'height': '70px'}} src={`${process.env.REACT_APP_API_URL}/media/${v.split("<==>")[1]}`} alt="video" />
//                           </StyledTableCell>

//                           <StyledTableCell align='right' style={{ cursor: 'pointer' }}  component="th" scope="row">
//                             <Link to={`/video-page/${k}`}><Button variant="contained" color="success"><Typography
//                               style={{ fontSize: "17px", color: "black", padding: '12px' }}
//                             >
//                               watch
//                             </Typography></Button></Link>
//                           </StyledTableCell>

//                         </StyledTableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Container>
//             </>
//             :
//             ""
//           }
//         </Box>
//       </Box>





