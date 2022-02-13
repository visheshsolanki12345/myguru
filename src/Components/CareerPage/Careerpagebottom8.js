import { CardMedia, Grid } from "@material-ui/core";
import { Divider } from "@mui/material";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
// mui card style
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Rating } from "@material-ui/lab";

import { Link, useHistory } from 'react-router-dom';
import { timeSince } from '../CommanFunction/time'
import { BsPlay } from "react-icons/bs";


// react slick imports

const Careerpagebottom8 = ({ data }) => {
  const history = useHistory()
  return (
    <div className="careerpagebottom8_main">
      <div className="careerpagebottom8_sub">
        <div className="careerpagebottom8_featuredarticle">
          <div className="careerpagebottom8_heading">
            <div className="careerpagebottom8_featurearticle_heading">
              {" "}
              Featured Article
            </div>

            <div className="careerpagebottom8_featurearticle_viewall" onClick={() => history.push('/article-page')}>
              View All <FaAngleRight />
            </div>
          </div>
          <Divider />
          {/* featured article main articles */}
          <Grid container style={{ padding: "10px" }} spacing={1}>
            <Grid item lg={8}>
              {" "}
              <img
                src="/assets/images/innerpage-img/arti1.jpg"
                style={{ width: "100%" }}
              ></img>{" "}
            </Grid>
            <Grid item lg={4}>
              {" "}
              <div className="careerpagebottom8_smallfeaturedarticle">
                <FeaturedArticle data={data.article} />
                <Divider />
                {/* <FeaturedArticle /> */}
              </div>
            </Grid>
          </Grid>
        </div>

        {/* guru expert video */}
        <div className="careerpagebottom8_guruexpert_video">
          {/* guru exper video common heading */}
          <div className="careerpagebottom8_heading">
            <div className="careerpagebottom8_featurearticle_heading">
              {" "}
              Featured Article Video
            </div>

            <div className="careerpagebottom8_featurearticle_viewall" onClick={() => history.push('/video-page')}>
              View All <FaAngleRight />
            </div>
          </div>
          <Divider />

          {/* guru expert videon main content start */}
          {
            <div>
              <div>
                      <Grid container spacing={2}>
                {
                  data && data && data.videoCarrer && data.videoCarrer.map((e) =>

                        <Grid item lg={3}>
                    <Link to={`/video-page/${e.id}`} >
                          <div className='careerpagebottom8_featurearticle_viewall_videoimage_thumbnail' >
                            <img
                              style={{ width: 'auto', height: 'auto' }}
                              src={`${process.env.REACT_APP_API_URL}` + e.thumbnailImage}
                            >
                            </img>
                            <BsPlay />
                            <div>
                              <Grid container justify='space-between'>
                                <Grid item lg={6}><span style={{ color: 'black', fontSize: '15px' }}>Views : </span> <span style={{ color: 'green', fontSize: '15px' }}>{e.noView} </span>  </Grid>
                                <Grid item lg={6}> <span style={{ color: 'black', fontSize: '15px' }}>
                                <Rating 
                                value={e.rating}
                                readOnly= {true}
                                precision = {0.5}
                                />
                                
                                 </span>{e.rating} </Grid>
                              </Grid>
                              <Grid container justify='space-between'>
                                <Grid item lg={6}>
                                  <span style={{ color: 'black', fontSize: '15px' }}> Payable : </span> <span style={{ color: 'green', fontSize: '15px' }}> {e.earnings} </span>
                                </Grid>
                                <Grid item lg={6}> <span style={{ color: 'black', fontSize: '15px' }}> price : </span> <span style={{ color: 'green', fontSize: '15px' }}> {e.price} </span>  </Grid>
                              </Grid>
                              <Grid container justify='center'>
                                <Grid item lg={12}> <span style={{ color: 'black', fontSize: '15px' }}>Publish Date : </span> <span style={{ color: 'green', fontSize: '15px' }}>  {timeSince(e.createAt)} </span>   </Grid>
                              </Grid>
                            </div>
                          </div>
                    </Link>
                        </Grid>
                  )
                }
                      </Grid>

              </div>
            </div>

          }

        </div>


        {/* list of career */}
        <div className="careerpagebottom8_listofcareers">
          {/* list of career head part */}
          <div className="careerpagebottom8_heading">
            <div className="careerpagebottom8_featurearticle_heading">
              {" "}
              List of Careers
            </div>

            <div className="careerpagebottom8_featurearticle_viewall">
              View All <FaAngleRight />
            </div>
          </div>
          <Divider />

          {/* list of career bottom part */}
          <div style={{ padding: "20px" }}>


            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              // autoPlay={this.props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-80-px"
            >
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>
              <div >  <BasicCard /> </div>


            </Carousel>
            {/* <Grid container spacing={3}>
              <Grid item lg={6}>
                <BasicCard />
              </Grid>
              <Grid item lg={6}>
                <BasicCard />
              </Grid>
            </Grid> */}
          </div>
        </div>
        <div className="careerpagebottom8_listofexams">
          {/* list of exams start */}
          <div className="careerpagebottom8_heading">
            <div className="careerpagebottom8_featurearticle_heading">
              {" "}
              List of Exams
            </div>

            <div className="careerpagebottom8_featurearticle_viewall">
              View All <FaAngleRight />
            </div>
          </div>
          <Divider />

          {/* list of exam bottom Part */}

          <div style={{ padding: "20px" }}>
            <Grid container spacing={3}>
              <Grid item lg={6}>
                <ImgMediaCard />
              </Grid>
              <Grid item lg={6}>
                <ImgMediaCard />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="careerpagebottom8_listofcolleges">
          <div className="careerpagebottom8_heading">
            <div className="careerpagebottom8_featurearticle_heading">
              {" "}
              List of Colleges
            </div>

            <div className="careerpagebottom8_featurearticle_viewall">
              View All <FaAngleRight />
            </div>
          </div>
          <Divider />

          {/* list of exam bottom Part */}

          <div style={{ padding: "20px" }}>
            <Grid container spacing={3} align="left">
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
              <Grid item lg={6}>
                <FaAngleRight /> Top Engineering Colleges in India
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="careerpagebottom8_guruexpertcounsellor">
          {/* list of guru expert counsellor start */}
          <div className="careerpagebottom8_heading">
            <div className="careerpagebottom8_featurearticle_heading">
              {" "}
              Guru's Expert Counsellor
            </div>

            <div className="careerpagebottom8_featurearticle_viewall" onClick={() => history.push('/counsellor-page')}>
              View All <FaAngleRight />
            </div>
          </div>
          <Divider />

          {/* list of exam bottom Part */}
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-80-px"
          >
            <div >  <ImgMediaCardCounsellor data={data.counsellor} /> </div>

          </Carousel>
          <div style={{ padding: "20px" }}>

          </div>

          {/* guru expert counsellor end */}
        </div>
        <div className="careerpagebottom8_howtoimprove_lifeskills">
          {/* life skills start */}
          <div className="careerpagebottom8_heading">
            <div className="careerpagebottom8_featurearticle_heading">
              {" "}
              How to Improve Life Skills
            </div>

            <div className="careerpagebottom8_featurearticle_viewall">
              View All <FaAngleRight />
            </div>
          </div>
          <Divider />

          {/* life skills bottom part */}

          <div style={{ padding: "20px" }}>
            <Grid container spacing={3}>
              <Grid item lg={6}>
                <ImgMediaCardLifeSkills />
              </Grid>
              <Grid item lg={6}>
                <ImgMediaCardLifeSkills />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="careerpagebottom8_checkyourpotential">

          {/* check your potential start */}
          <div className="careerpagebottom8_heading">
            <div className="careerpagebottom8_featurearticle_heading">
              {" "}
              Check Your Potential
            </div>

            <div className="careerpagebottom8_featurearticle_viewall">
              View All <FaAngleRight />
            </div>
          </div>
          <Divider />

          {/* check your potential bottom part */}

          <div style={{ padding: "20px" }}>

            <Grid container spacing={3}>
              <Grid item lg={6}>
                <ImgMediaCardLifeSkills />
              </Grid>
              <Grid item lg={6}>
                <ImgMediaCardLifeSkills />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careerpagebottom8;

// featured article tab start



function FeaturedArticle({ data }) {

  return (
    <div className="careerpagebottom8_small_content">
      {
        data && data.map((e) =>
          <div>
            <Link to={`/article-page/${e.id}`} >
              <div className="careerbottom8_featuredarticle_small_image">
                <img
                  style={{ width: "100%", height: "60px" }}
                  src={`${process.env.REACT_APP_API_URL}` + e.studentArticle.bannerImage}
                ></img>

              </div>
              <div className="careerpagebottom8_featuredarticle_small_image_content">
                <span style={{ fontSize: "14px", textDecoration: "uppercase" }}>
                  {" "}
                  {e.studentArticle.heading}
                </span>
                <span>
                  {timeSince(e.createAt)}
                  &nbsp;&nbsp;&nbsp;&nbsp; By:{e.user.last_name}</span>
              </div>
              <Typography>rating : {e.rating}</Typography>
              <Typography>No. View : {e.noView}</Typography>
              <Typography>Price : {e.ammount}</Typography>
              <Typography>Payble : {e.paymentChoices}</Typography>
            </Link>
            <div></div>
          </div>
        )
      }
    </div>
  );
}

// featured article tab end

// mui card start
function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          Aerospace Engineering
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Aerospace engineering deals with employees who design or build
          missiles and aircraft for national defense, or spacecraft.
          Aeronautical and astronautical engineering are two major branches of
          ...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

// mui card end

// mui image media card start

function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        style={{ width: "30%", margin: "auto", borderRadius: "50%" }}
        component="img"
        alt="green iguana"
        height="100"
        image="/assets/images/innerpage-img/institute-logo/ins1.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Vel Tech Undergraduate Engineering Entrance Examination (VTUEEE)
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Application Process: 14 Dec, 2020 - 18 Apr, 2021 Exam Date: 20 Mar,
          2021 - 24 Mar, 2021
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">Get Upddate</Button>
      </CardActions>
    </Card>
  );
}

// mui image media card end

// guru expert counsellor start

function ImgMediaCardCounsellor({ data }) {
  return (
    <Card sx={{ maxWidth: 345, display: "flex" }}>
      {
        data && data.map((e) =>
          <Link to={`/counsellor-page/${e.id}`} >
            <div>
              <CardMedia
                style={{ width: "30%", margin: "auto", borderRadius: "50%" }}
                component="img"
                alt="green iguana"
                height="100"
                image={`${process.env.REACT_APP_API_URL}` + e.user.profile.userPic}
              />
              <CardContent align="left" justify="left">
                <Typography gutterBottom variant="h5" component="div">
                  Name : {e.user.last_name}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Collage : {e.college} {" "}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  qualification : ({e.qualification})
                </Typography>

                <Typography gutterBottom variant="subtitle1" component="div">
                  designation : {e.designation}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  {e.aboutUs}{" "}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  rating : {e.rating}{" "}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Counsoller Price : {e.price}{" "}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  No. View : {e.noView}{" "}
                </Typography>

              </CardContent>
              <CardActions>
                <Button size="large">Contact Now</Button>
              </CardActions>
            </div>
          </Link>
        )
      }
    </Card>

  );
}

// guru expert counsellor end



// life skills start


function ImgMediaCardLifeSkills() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        style={{ width: "30%", margin: "auto", borderRadius: "50%" }}
        component="img"
        alt="green iguana"
        height="100"
        image="/assets/images/innerpage-img/institute-logo/ins1.png"
      /> */}
      <CardContent align="left" justify="left">
        <Typography gutterBottom variant="h4" component="div">
          Join a mastermind group
        </Typography>

        <Typography variant="h6" color="text.secondary">

          Aerospace engineering deals with employees who design or build missiles and aircraft for national defense, or spacecraft.
          Aeronautical and astronautical engineering are two major branches of ...

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">Read More</Button>
      </CardActions>
    </Card>
  );
}
// life skills end



// swiper js carousel

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

// swiper js carousel end
