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
                {text.logo}
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

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const removeLocal = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("typeOfTest");
    localStorage.removeItem("Class");
    localStorage.removeItem("continue");
  };

  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [dataPay, setDataPay] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();
  let user = JSON.parse(localStorage.getItem("user-details"));

  useEffect(() => {
    getData();
    getDataPay();
    removeLocal();
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

  const classFunc = (id) => {
    // removeLocal();
    let item = { id };
    localStorage.setItem("id", id);
    localStorage.setItem("continue", "continue");
    dispatch(getTest(item));
    history.push("./paymentsummery");
  };

  const classFuncPay = (id) => {
    // removeLocal();
    let item = { id };
    localStorage.setItem("id", id);
    localStorage.setItem("continue", "continue");
    dispatch(getTest(item));
    history.push("./paymentsummery");
  };

  useEffect(() => {
    dispatch(getAllStudentData())
  }, [dispatch])

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" noWrap component="div">
              {changelayout == 0 ? "Dasboard" : changelayout == 1 ? "Test" : ""}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {changelayout == 0 ? (
            <>
              <Container>
                <Grid container spacing={4}>
                  <Grid lg={9} item>
                    <Grid container spacing={3} direction="column">
                      <Grid item>
                        <Paper elevation={3}>
                          <Grid className={classes.paddings} container>
                            <Grid item lg={8}>
                              <div>
                                {" "}
                                <Typography variant="h3">
                                  Welcome Back, John! You Completed 80% of the
                                  Test. Progress is very good!
                                </Typography>
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  marginLeft: "100px",
                                  marginTop: "0px",
                                }}
                              >
                                <Paper elevation={3}>
                                  <Typography variant="h4">3</Typography>
                                  <Typography variant="h5">
                                    Total Tests Given
                                  </Typography>
                                </Paper>
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  marginLeft: "300px",
                                  marginTop: "0px",
                                }}
                              >
                                <Paper elevation={3}>
                                  <Typography variant="h4">3</Typography>
                                  <Typography variant="h5">
                                    Total Tests Given
                                  </Typography>
                                </Paper>
                              </div>
                            </Grid>
                            <Grid item lg={3}>
                              <img src="assets/images/dashboard_image.jpg"></img>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item>
                        {" "}
                        <Paper elevation={3}>
                          <Grid className={classes.paddings} container>
                            <Grid item lg={8}>
                              <div>
                                {" "}
                                <Typography variant="h3">
                                  Welcome Back, John! You Completed 80% of the
                                  Test. Progress is very good!
                                </Typography>
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  marginLeft: "100px",
                                  marginTop: "0px",
                                }}
                              >
                                <Paper elevation={3}>
                                  <Typography variant="h4">3</Typography>
                                  <Typography variant="h5">
                                    Total Tests Given
                                  </Typography>
                                </Paper>
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  marginLeft: "300px",
                                  marginTop: "0px",
                                }}
                              >
                                <Paper elevation={3}>
                                  <Typography variant="h4">3</Typography>
                                  <Typography variant="h5">
                                    Total Tests Given
                                  </Typography>
                                </Paper>
                              </div>
                            </Grid>
                            <Grid item lg={3}>
                              <img src="assets/images/dashboard_image.jpg"></img>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item>
                        <Typography variant="h3" align="left">
                          Purchased Videos
                        </Typography>
                        <div>
                          <Paper elevation={3} className="d-flex flex-wrap">
                            {purchasedvideo.map((p) => (
                              <>
                                <Paper
                                  className={classes.paddings}
                                  elevation={3}
                                >
                                  <Typography variant="h3">
                                    {p.video}
                                  </Typography>
                                  <Typography variant="h4">{p.text}</Typography>
                                </Paper>
                              </>
                            ))}
                          </Paper>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid lg={3} item>
                    <Grid container spacing={3} direction="column">
                      <Grid items lg={12}>
                        <Typography align="center" variant="h4">
                          <Avatar src="/broken-image.jpg" />
                          John Wick <ModeEditOutlineOutlined />
                        </Typography>
                        <Typography variant="h5" align="center">
                          email@gmail.com
                        </Typography>
                      </Grid>
                      <Grid items lg={12}>
                        <Grid container direction="column">
                          <Grid item lg={5}>
                            Recent Activity
                          </Grid>
                          <Grid item lg={5}>
                            Login Time Today
                          </Grid>
                          <Grid item lg={5}>
                            Last Login
                          </Grid>
                          <Grid item lg={5}>
                            Pending Tests
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </>
          ) : (
            ""
          )}
          {changelayout == 1 ? (
            <>
              <Container>

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
                              {v}<sup>th</sup>
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell align='right' style={{ cursor: 'pointer' }} onClick={() => classFunc(k)} component="th" scope="row">
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
              </Container>
              <hr />

              <Container>
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
                            PURCHASE  TEST
                          </Typography>
                        </StyledTableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(dataPay && dataPay).map(([k, v]) => (
                        <StyledTableRow key={k}>
                          <StyledTableCell component="th" scope="row">
                            <Typography
                              style={{ fontSize: "17px", fontWeight: '700', color: "black", padding: '12px' }}
                            >
                              {v}<sup>th</sup>
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell align='right' style={{ cursor: 'pointer' }} onClick={() => classFuncPay(k)} component="th" scope="row">
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
              </Container>
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
