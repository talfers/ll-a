import React, { useRef } from 'react';
import { VideoPlayerContainerStyled } from '../styles/Welcome';
import ReactPlayer from 'react-player';


const VideoPlayer = ({path}) => {

    const playerRef = useRef(null);
    return (
       <VideoPlayerContainerStyled>
         <ReactPlayer width={'100%'} height={'100%'} ref={playerRef} url={path} controls={true}/>
      </VideoPlayerContainerStyled> 
    )
}
 
export default VideoPlayer;