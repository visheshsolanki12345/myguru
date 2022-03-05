import React from 'react';
import './Components/css/App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AboutUs from './Components/FrontPages/AboutUs';
import ContactUs from './Components/FrontPages/ContactUs';
import ExamList from './Components/ExamList/ExamList';
import HappinessWellBeing from './Components/CollagePage/HappinessWellBeing';
import InnerPage from './Components/CollagePage/InnerPage';
import login from './Components/Authentication/login';
import MyGuruHome from './Components/FrontPages/MyGuruHome';
import signup from './Components/Authentication/signup';
import Footer from './Components/FrontPages//Footer';
import Prodected from './Components/Routers/Prodected'
import VocationalImages from './Components/FrontPages//VocationalImages';
import PageNotFound from './Components/FrontPages/PageNotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import CareerPage from './Components/CareerPage/CareerPage'

// Test Pages
import PaymentSummary from './Components/Test/PaymentSummary';
import PaymentConfirm from './Components/Test/PaymentConfirm';
import Assessment from './Components/Test/Assessment'
import Testpage from './Components/Test/Testpage';
import ResultPage from './Components/Test/ResultPage';
import Header from './Components/FrontPages/Header';
import studentdashboard from './Components/Dashboard/StudentDashBoard/studentdashboard'
import ResetPassword from './Components/Authentication/ResetPassword';
import ResetPasswordEmail from './Components/Authentication/ResetPasswordEmail';

// Article pages
import ArticlePageViewAll from './Components/CareerPage/CareerPageViewAll/ArticlePageViewAll'
import ArticleSinglePage from './Components/CareerPage/CareerPageViewAll/ArticleSinglePage'

// Video page
import VideoPageViewAll from './Components/CareerPage/CareerPageViewAll/VideoPageViewAll'
import VideoSinglePage from './Components/CareerPage/CareerPageViewAll/VideoSinglePage'
import VideoTrending from './Components/CareerPage/CareerPageViewAll/VideoTrending';


// Counsellor page
import CounsellorPageViewAll from './Components/CareerPage/CareerPageViewAll/CounsellorPageViewAll';
import CounsellorSinglePage from './Components/CareerPage/CareerPageViewAll/CounsellorSinglePage';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Switch>
                    {/* <Route component={PageNotFound} /> */}
                    <Route exact path="/" component={MyGuruHome} />
                    <Route exact path="/vocational-career" component={VocationalImages} />
                    <Route exact path="/signup" component={signup} />
                    <Route exact path="/login" component={login} />
                    <Route exact path="/password-reset/" component={ResetPasswordEmail} />
                    <Route exact path="/password-reset/:token" component={ResetPassword} />
                    <Route exact path="/carrer/:id" component={InnerPage} />
                    <Route exact path="/happiness" component={HappinessWellBeing} />
                    <Route exact path="/examlist" component={ExamList} />
                    <Route exact path="/contactus" component={ContactUs} />
                    <Route exact path="/aboutus" component={AboutUs} />                
                    {/* Carrer Page */}
                    <Route exact path="/career-page/:id" component={CareerPage} />
                    
                    <Route exact path="/article-page" component={ArticlePageViewAll} />
                    <Prodected exact path="/article-page/:id" component={ArticleSinglePage} />

                    <Prodected exact path="/video-page/" component={VideoPageViewAll} />
                    <Prodected exact path="/video-page/:id" component={VideoSinglePage} />
                    <Prodected exact path="/trending-video" component={VideoTrending} />

                    <Prodected exact path="/counsellor-page/" component={CounsellorPageViewAll} />
                    <Prodected exact path="/counsellor-page/:id" component={CounsellorSinglePage} />
                    
                    
{/* ======================================== Prodected Route ========================================================================== */}


                    {/* /6 to 12 Test/ */}
                    <Prodected exact path="/paymentsummery" component={PaymentSummary} />
                    <Prodected exact path="/paymentconfirm" component={PaymentConfirm} />
                    <Prodected exact path="/paymentassessment" component={Assessment} />
                    <Prodected exact path="/result" component={ResultPage} />
                    <Prodected exact path="/dashboard" component={studentdashboard} />
                    <Prodected exact path="/testpage" component={Testpage} />

                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;