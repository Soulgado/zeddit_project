import React from 'react';
import { connect } from 'react-redux';
import { createNewImagePost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn,
  subzeddits: state.subzedditsTitles
});

const mapDispatchToProps = dispatch => ({
  createImgPost: (formData) => dispatch(createNewImagePost(formData))
})

class PostCreateImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      title: '',
      subzeddit: '',
      dropdownActive: false,
      titlesList: []
    }
  }

  onFileChange = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  onTitleChange = event => {
    this.setState({
      title: event.target.value
    })
  }

  onSubmitHandler = event => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('user', this.props.user.id);
    data.append('subzeddit', this.props.subzeddit.title);
    data.append('title', this.state.title);
    console.log(data);
    this.props.createImgPost(data);
  }

  handleSubzedditChange = event => {
    let matchedTitles = this.matchedSubzeddits(event.target.value);
    this.setState({
      subzeddit: event.target.value,
      titlesList: matchedTitles
    })
  }

  handleSubzedditFocus = () => {
    this.setState({
      dropdownActive: true
    })
  }

  handleSubzedditBlur = () => {
    this.setState({
      dropdownActive: false
    })
  }

  matchedSubzeddits = (title) => {
    return this.props.subzeddits.filter(subzeddit => {
      const regex = new RegExp(title, 'gi')
      return subzeddit.title.match(regex);
    })
  }

  renderMatches = () => {
    // specific component is required
    return (
      <ul className='form-subzeddits-dropdown'>
        {this.state.titlesList.map(subzeddit => {
          return (
            <li key={subzeddit.title}>
              {subzeddit.title}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <form
        action='/api/sz/post/create_img'
        method='post'
        encType='multipart/form-data'
        onSubmit={this.onSubmitHandler}
      >
        <p className='form-title'>Create new Post</p>
        <div className='form-element'>
          <label htmlFor='title'>Post title:</label>
          <input
            id='title'
            type='text'
            name='title'
            onChange={this.onTitleChange}
          />
        </div>
        <div className='form-element'>
          <label htmlFor='image'>Add image:</label>
          <input
            id='image'
            type='file'
            name='file'
            onChange={this.onFileChange}
          />
        </div>
        <div className='form-element'>
          <label htmlFor='subzeddit'>Submit post to subzeddit:</label>
          <input
            id='subzeddit'
            type='text'
            value={this.state.subzeddit}
            onChange={this.handleSubzedditChange} 
            onFocus={this.handleSubzedditFocus}
            onBlur={this.handleSubzedditBlur}/>
          {this.state.dropdownActive
            ? this.renderMatches()
            : null}
        </div>
        <button className='form-button' type='submit'>Create Post</button>
      </form>
    )
  }
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCreateImageForm);