import React, {Component} from 'react'
import axios from 'axios'
import VideoDetail from '../components/video-detail'
import SearchBar from '../components/search-bar'
import Video from '../components/video'
import VideoList from './video-list'

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIE_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=true&append_to_response=images";
const API_KEY = 'api_key=0659e88c01765c91b7446c1ee5d90478';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {movies:{}, currentMovie:{}};
  }
  componentWillMount(){
    this.initMovies();
  }
  initMovies(){
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`).then((res) => {
      this.setState({movies: res.data.results.slice(1,6), currentMovie: res.data.results[0]}, () => {
        this.applyVideoToCurrentMovie();
      });
    });
  }
  applyVideoToCurrentMovie() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/videos?${API_KEY}`).then((res) => {
      const youtubeKey = res.data.results[0].key;
      let newCurrentMovieState = this.state.currentMovie;
      newCurrentMovieState.videoId = youtubeKey;
      this.setState({currentMovie: newCurrentMovieState});
    });
  }
  receiveMovie(movie){
    this.setState({currentMovie: movie}, ((res) => {
      this.applyVideoToCurrentMovie();
    }));
  }
  render(){
    const renderVideoList = () => {
      if(this.state.movies.length > 0){
        return <VideoList callback={this.receiveMovie.bind(this)} movieList={this.state.movies}></VideoList>;
      }
    }
    return (
      <div>
        <div className="search-bar">
          <SearchBar></SearchBar>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId}></Video>
            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}></VideoDetail>
          </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
