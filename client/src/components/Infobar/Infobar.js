import React from 'react'
import './Infobar.css'

const onlineIcon = "https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png";
const closeIcon = "https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png";

const Infobar = (props) => {
    return (
        <div className='infoBar'>
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon"/>
                <h3>Room: {props.roomName}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href='/'><img src={closeIcon} alt="close image"/></a>
            </div>
        </div>
    )
}


export default Infobar;