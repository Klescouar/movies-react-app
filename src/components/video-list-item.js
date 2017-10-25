import React, {Component} from 'react'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

const VideoListItem = (props) => {
  const {movie} = props;
  return (
      <li className="list-group-item" onClick={handleOnClick}>
        <div className="media">
          <div className="media-left">
            <img className="movie-img media-object img-rounded" src={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
          </div>
          <div className="media-body">
            <h5 className="title_list_item">{movie.title}</h5>
          </div>
        </div>
      </li>
  )
  function handleOnClick(event){
    props.callback(movie);
  }
}

export default VideoListItem;
