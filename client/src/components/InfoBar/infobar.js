import React from 'react'
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import './infobar.css';

/**
* @author
* @function InfoBar
**/

export const InfoBar = ({ room }) => {
  return(
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className='onlineIcon' src={onlineIcon} alt='Online Image'/>
            <h3>{room}</h3>
        </div>
        <div className='rightInnerContainer'>
            <a href='/'><img src={closeIcon} alt='close Image'/></a>
        </div>
    </div>
   )

 }

 export default InfoBar;