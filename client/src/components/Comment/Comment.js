import React from 'react';
import { connect } from 'react-redux';
import CommentVoteButtons from '../CommentVoteButtons/CommentVoteButtons';
import CommentCreateForm from '../CommentCreate/CommentCreate';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  post: state.post.post
})

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formActive: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({
      formActive: !this.state.formActive
    })
  }

  render() {
    const { comment, loggedIn, post } = this.props;
    let { formActive } = this.state;
    return (
      <div
      style={{marginLeft: `${comment.level*0}px`}}
      className='comment-body'>
        <CommentVoteButtons comment={comment} />
        <div className='comment-main'>
          <div className='comment-info'> 
            <span>{comment.username} - posted {comment.creation_time}</span>
          </div>
          <div className='comment-content'>
            <p>{comment.content}</p>
          </div>
          {loggedIn
            ? <div className='comment-buttons'>
                <button
                  type='button'
                  onClick={this.handleClick}
                >{formActive ? 'Hide' : 'Reply'}
                </button>
              </div>
            : ''}
          {formActive 
            ? <CommentCreateForm
                parent={comment}
                post={post.id}
                handleClick={this.handleClick}
              />
            : ''}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Comment);