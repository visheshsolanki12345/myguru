import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, Fragment } from 'react'
import Loader from "../Loader/Loader";
import { useAlert } from 'react-alert'
import { getCarrerFunc, clearErrors } from '../../actions/carrer/user/CarrerAction';
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()
    const { loading, error, userCarrer} = useSelector((state) => state.userCarrer);
    const history = useHistory();
    const alert = useAlert()

    useEffect(() => {
        if (userCarrer && userCarrer.length === 0) {
            dispatch(getCarrerFunc())
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, userCarrer.length, alert, error])

    const logout = () => {
        localStorage.clear();
        history.push("./login")
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {/* <!-- Start header --> */}
                    <header className="top-header">
                        <nav className="navbar header-nav navbar-expand-lg">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="/"><img className="pb-5" src="/assets/images/logo.png" alt="image" /></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd" aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-start mt-2" id="bs-example-navbar-collapse-1">
                                    <ul className="nav navbar-nav careerBtn">
                                        <li className="dropdown">
                                            {/* <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown">Careers <b className="caret"></b></a> */}
                                            <Dropdown>
                                                <Dropdown.Toggle style={{ background: "none", color: "#fff", border: "none" }} id="dropdown-basic" data-toggle="dropdown"><a className="nav-link dropdown-toggle" href="javascript:;">Careers</a>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>

                                                    <div className="row">
                                                        <div className="col-sm-3 zero-right">
                                                            <ul style={{ columnCount: "4", width: "900px" }} className="multi-column-dropdown bgcls">
                                                                {userCarrer && userCarrer.map((e) =>
                                                                    <li><Link to={`/career-page/${e.id}`} ><a>{e.carrer}</a></Link></li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    </ul>
                                </div>
                                <div className="collapse navbar-collapse justify-content-center" id="navbar-wd">
                                    <ul className="navbar-nav">
                                        <li className="dropdown">
                                            <Dropdown>
                                                {/* <Dropdown.Toggle style={{ background: "none", color: "#000", border: "none" }} className="dropdown-toggle" data-toggle="dropdown" ><a className="nav-link dropdown-toggle">
                                                Collaboration</a>
                                            </Dropdown.Toggle> */}
                                                <Dropdown.Toggle style={{ background: "none", color: "#fff", border: "none" }} id="dropdown-basic" data-toggle="dropdown"><a className="nav-link dropdown-toggle" href="javascript:;">
                                                    <b className=""></b>Collaboration</a>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <li><a className="dropdown-item" href="#">School/ Education</a></li>
                                                    <li><a className="dropdown-item" href="#">Counsellor</a></li>
                                                    <li><a className="dropdown-item" href="#">Corporate</a></li>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {/* <a type="button" className="dropdown-toggle" data-toggle="dropdown">Collaboration </a> */}
                                        </li>
                                        <Link to='/'><li><a className="nav-link active mt-1">Home</a></li></Link>
                                        <Link to='/aboutus'><li><a className="nav-link mt-1">About us</a></li></Link>
                                        <Link to='/examlist'><li><a className="nav-link mt-1">Exam List</a></li></Link>

                                        <li className="dropdown">
                                            <Dropdown>
                                                {/* <Dropdown.Toggle style={{ background: "none", color: "#000", border: "none" }} className="dropdown-toggle" data-toggle="dropdown"><a className="nav-link dropdown-toggle">
                                                Contact Us</a>
                                            </Dropdown.Toggle> */}
                                                {/* <Dropdown.Toggle style={{ background: "none", color: "#fff", border: "none" }} id="dropdown-basic" data-toggle="dropdown"><a className="nav-link dropdown-toggle" href="/contactus">
                                            <b className=""></b>Contact us</a>
                                        </Dropdown.Toggle> */}
                                                <li><a className="nav-link mt-1" href="/contactus">
                                                    Contact us</a>
                                                </li>
                                                <Dropdown.Menu>
                                                    <li><a className="dropdown-item" href="mailto:info@myguru.co.in">Email Us</a></li>
                                                    <li><a className="dropdown-item" href="tel:+919876543210">Call Us</a></li>
                                                    <li><a className="dropdown-item" href="https://wa.me/<919876543210>" target="_blank">WhatsApp Us</a></li>

                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {/* <a type="button" className="dropdown-toggle" data-toggle="dropdown">Contact us </a> */}
                                        </li>
                                        {
                                            localStorage.getItem("user-details") ?
                                                <>
                                                    {/* <li><button className="nav-link mt-1"  onClick={logout}>Logout</button></li> */}
                                                    <Link to='/login'><li> <a className="nav-link mt-1" onClick={logout}>Logout</a> </li></Link>
                                                </>
                                                :
                                                <>
                                                    <Link to="/login"><li><a className="nav-link mt-1">Login/Signup</a></li></Link>
                                                </>
                                        }
                                        {
                                            localStorage.getItem("user-details") ?
                                                <>
                                                    {/* <li><button className="nav-link mt-1"  onClick={logout}>Logout</button></li> */}
                                                    <Link to='/dashboard'><li> <a className="nav-link mt-1">DashBoard</a> </li></Link>
                                                </>
                                                :
                                                <>
                                                    <Link to="/login"><li><a className="nav-link mt-1"></a></li></Link>
                                                </>
                                        }
                                        <li>
                                            <div className="search-box">
                                                <input type="text" className="search-txt" placeholder="Search" />
                                                <a className="search-btn">

                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>
            )}
        </Fragment>
    )
}

export default Header
