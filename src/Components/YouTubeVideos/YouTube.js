import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-elastic-carousel";
import '../css/bootstrap.min.css'
import './YouTubeVideos.css'
import Iframe from 'react-iframe'
import Loader from '../Loader/Loader';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
];

const YouTube = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    let user = JSON.parse(localStorage.getItem('user-details'));

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/api/videos/youtube-video/`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user && user.access}`
            },
        }).then((result) => {
            result.json().then((resp) => {
                setData(resp.results)
                setLoading(false)
            })
        })
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className='container'>
                        <div className='row'>
                            <div className='col md-col-10 pt-5'>
                                <Carousel breakPoints={breakPoints}>
                                    {
                                        data.map((e) =>
                                            <Iframe url={e.videoLink}
                                                width="450px"
                                                height="450px"
                                                id="myId"
                                                className="responsive-video"
                                                display="initial"
                                                position="relative"
                                                allow="fullscreen"
                                            />
                                        )
                                    }
                                </Carousel>
                            </div>

                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default YouTube
