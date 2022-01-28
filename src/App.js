import React, { } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import AboutUs from './Components/FrontPages/AboutUs';
import ContactUs from './Components/FrontPages/ContactUs';
import ExamList from './Components/ExamList/ExamList';
import GuruExpertVideos from './Components/YouTubeVideos/GuruExpertVideos';
import HappinessWellBeing from './Components/CollagePage/HappinessWellBeing';
import InnerPage from './Components/CollagePage/InnerPage';
import login from './Components/Authentication/login';
import MyGuruHome from './Components/FrontPages/MyGuruHome';
import signup from './Components/Authentication/signup';
import Footer from './Components/FrontPages//Footer';
import Prodected from './Prodected'
import VocationalImages from './Components/FrontPages//VocationalImages';
import PageNotFound from './Components/FrontPages/PageNotFound';
import YouTube from './Components/YouTubeVideos/YouTube';
import 'bootstrap/dist/css/bootstrap.min.css';

////6 to
import PaymentSummary from './Components/Test/PaymentSummary';
import PaymentConfirm from './Components/Test/PaymentConfirm';
import Assessment from './Components/Test/Assessment'
import Testpage from './Components/Test/Testpage';
import ResultPage from './Components/Test/ResultPage';
import Header from './Components/FrontPages/Header';
import StuPayCheck from './Components/Routers/StuPayCheck';
import studentdashboard from './Components/Dashboard/studentdashboard'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Header />
                <Switch>
                <Route exact path="/" component={MyGuruHome} />
                    <Route exact path="/vocational-career" component={VocationalImages} />
                    <Route exact path="/signup" component={signup} />
                    <Route exact path="/login" component={login} />
                    <Route exact path="/carrer/:id" component={InnerPage} />
                    <Route exact path="/happiness" component={HappinessWellBeing} />
                    <Route exact path="/guruexpert" component={GuruExpertVideos} />
                    <Route exact path="/examlist" component={ExamList} />
                    <Route exact path="/contactus" component={ContactUs} />
                    <Route exact path="/aboutus" component={AboutUs} />
                    <Route exact path="/youtube" component={YouTube} />
                    
                    
                    {/* /6 to 12 Test/ */}
                    <Route path="/paymentsummery"> <Prodected Cmp={PaymentSummary} /> </Route>
                    <Route exact path="/paymentconfirm"> <Prodected Cmp={PaymentConfirm} /> </Route>
                    <Route exact path="/paymentassessment"> <Prodected Cmp={Assessment} /> </Route>
                    <Route exact path="/result"> <Prodected Cmp={ResultPage} /> </Route>

                    <Route exact path="/dashboard"><Prodected Cmp={studentdashboard} /></Route>  
                    <Route exact path="/testpage"><Prodected Cmp={Testpage} /></Route>  


                    {/* <Route component={PageNotFound} /> */}
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;