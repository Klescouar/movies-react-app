import React, {Component} from 'react'
import VideoListItem from '../components/video-list-item'

const VideoList = (props) => {
  const {movieList} = props;
  return (
    <div>
      <ul>
        {
          movieList.map(movie => {return <VideoListItem callback={receiveCallback} key={movie.id} movie={movie}></VideoListItem>})
        }
      </ul>
    </div>
  );
  function receiveCallback (movie){
    props.callback(movie);
  }
}

export default VideoList;
