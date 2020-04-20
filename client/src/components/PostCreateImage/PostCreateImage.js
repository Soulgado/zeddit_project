import React from 'react';
import { connect } from 'react-redux';
import { createNewImagePost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  createImgPost: (formData) => dispatch(createNewImagePost(formData))
})

class PostCreateImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      title: ''
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
        <button className='form-button' type='submit'>Create Post</button>
      </form>
    )
  }
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCreateImageForm);