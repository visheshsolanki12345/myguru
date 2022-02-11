import React from 'react';
import './careerpage.css';
import { FaAngleDoubleRight } from "react-icons/fa";
const CheckyourAptitude = ({data}) => {
    return <div className='checkyour_aptitude_main'>
        <div className='checkyour_aptitude_sub'>
            <div className='checkyour_aptitude_heading'><img src='/assets/images/innerpage-img/act1.png'></img>Check Your Aptitude</div>
            <div className='checkyour_aptitude_description'>{data}</div>
            <div className='checkyour_aptitude_button'>USE NOW <FaAngleDoubleRight/></div>
      </div>
  </div>;
};

export default CheckyourAptitude;
