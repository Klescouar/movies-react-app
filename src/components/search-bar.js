import React, {Component} from 'react'

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {searchText:"", placeholder:"Tapez votre film..."}
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-8">
          <input type="text" className="form-control input-lg" onChange={this.handleChange} placeholder={this.state.placeholder}/>
        </div>
      </div>
    )
  }

  handleChange = (text) => {
    this.setState({searchText: text.target.value})
  }
}

export default SearchBar;
