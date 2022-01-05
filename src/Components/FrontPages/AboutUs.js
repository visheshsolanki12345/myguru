import React from 'react'
import { Dropdown } from 'react-bootstrap'
import '../css/bootstrap.min.css'
import '../css/pogo-slider.min.css'
import '../css/style.css'
import '../css/custom.css'
import Header from './Header'

const AboutUs = () => {
    return (
        <div>
            <Header />
            <body id="home" data-spy="scroll" data-target="#navbar-wd" data-offset="98">

                {/* margin-top_7 */}
                <section className="inner_banner ">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="full">
                                    <h3>About us</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- end section --> */}

                {/* <!-- section --> */}
                <section className="section margin-top_50">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 layout_padding_2">
                                <div className="full">
                                    <div className="heading_main text_align_left">
                                        <h2><span>Welcome To</span> MyGuru.co.in</h2>
                                    </div>
                                    <div className="full">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    </div>
                                    <div className="full">
                                        <a className="hvr-radial-out button-theme" href="#">About more</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="full">
                                    <img classNameName="img-fluid" src="assets/images/dont-know.png" usemap="#workmap" alt="#" width="100%" />
                                    <map name="workmap">
                                        <area shape="circle" coords="360,250,50" href="#" alt="" /> {/* what subject area */}
                                        <area shape="circle" coords="50,310,80" href="#" alt="" />  {/* check your apptitude area */}
                                        <area shape="circle" coords="100,140,40" href="#" alt="" />  {/* personality area */}
                                        <area shape="circle" coords="250,100,60" href="#" alt="" />  {/* career to choose area */}
                                        <area shape="circle" coords="220,360,60" href="#" alt="" />  {/* IQ area */}
                                        <area shape="circle" coords="220,220,35" href="#" alt="" />  {/* Don't know area */}
                                    </map>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- end section --> */}

                <section className="section margin-top_50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-4">
                                <div className="image-flip" >
                                    <div className="mainflip flip-0">
                                        <div className="frontside">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <p><img className=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image" /></p>
                                                    <h4 className="card-title">Sunlimetech</h4>
                                                    <p className="card-text">This is basic card with image on top, title, description and button.</p>
                                                    <a href="https://www.fiverr.com/share/qb8D02" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="backside">
                                            <div className="card">
                                                <div className="card-body text-center mt-4">
                                                    <h4 className="card-title">Sunlimetech</h4>
                                                    <p className="card-text">This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.</p>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                                <i className="fa fa-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                                <i className="fa fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                                <i className="fa fa-skype"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                                <i className="fa fa-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="clearfix"></div>


                {/* <!-- ALL JS FILES -->
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/popper.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/owlcarousel1/jquery.min.js"></script>
<script src="assets/owlcarousel1/owl.carousel.min.js"></script>
<!-- ALL PLUGINS -->
<script src="assets/js/jquery.magnific-popup.min.js"></script>
<script src="assets/js/jquery.pogo-slider.min.js"></script>
<script src="assets/js/slider-index.js"></script>
<script src="assets/js/smoothscroll.js"></script>
<script src="assets/js/form-validator.min.js"></script>
<script src="assets/js/contact-form-script.js"></script>
<script src="assets/js/isotope.min.js"></script>
<script src="assets/js/images-loded.min.js"></script>
<script src="assets/js/custom.js"></script>
<script src="assets/js/main.js"></script> */}





            </body>
        </div>
    )
}

export default AboutUs
