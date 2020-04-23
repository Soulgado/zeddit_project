import React from 'react';
import { connect } from 'react-redux';
import { editPost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.currentUser.user
});

const mapDispatchToProps = dispatch => ({
  editPost: (user, post, formData) => dispatch(editPost(user, post, formData))
});

class PostEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { title, content } = this.props.location.state.post;
    this.setState({
      title,
      content
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const formData = {
      title: this.state.title,
      content: this.state.content
    }
    this.props.editPost(
      this.props.user,
      this.props.location.state.post.id,
      formData
    );
    this.props.history.goBack();
  }

  render() {
    const { title, content } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <p className='form-title'>Edit post</p>
        <div className='form-element'>
          <label htmlFor='title'>Post title:</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={handleChange} />
        </div>
        <div className='form-element'>
          <label htmlFor='content'>Post content:</label>
          <input
            id='content'
            type='text'
            value={content}
            onChange={handleChange} />
        </div>
        <button className='form-button' type='submit'>Apply changes</button> 
      </form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEditPage);