import { Divider } from '@mui/material';
import React from 'react';
import { FaListUl } from "react-icons/fa";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const VideoBottom4 = () => {
    return <div className='careerpagebottom4_main'>
        <div className='careerpagebottom4_sub'>
            <div className='careerpagebottom4_featuredarticles'>
                <FaListUl></FaListUl> &nbsp;  <span>All Video</span>
            </div>
            <Divider />
            <div className='careerpagebottom4_featuredarticles'>
                <DoubleArrowIcon></DoubleArrowIcon> &nbsp; <span>Latest</span>
            </div>
            <Divider />

            <div className='careerpagebottom4_featuredarticles'>
                <TrendingUpIcon></TrendingUpIcon> &nbsp; <span>Trending</span>
            </div>
            <Divider />
            <div className='careerpagebottom4_featuredarticles'>
                <BusinessCenterIcon></BusinessCenterIcon> &nbsp; <span>Careers</span>
            </div>
            <Divider />
        </div>
    </div>;
};

export default VideoBottom4;