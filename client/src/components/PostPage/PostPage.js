import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentCreateForm from '../CommentCreate/CommentCreate';
import VoteButtons from '../VoteButtons/VoteButtons';
import CommentsList from '../CommentsList/CommentsList';
import { 
  getPost,
  deletePost,
  resetCommentCreationFlag
} from '../../redux/actionCreators';
import '../../styles/postPage.sass';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  post: state.post.post,
  commentCreated: state.post.commentCreationFlag,
  loggedIn: state.currentUser.loggedIn
});

const mapDispatchToProps = dispatch => ({
  getPost: (post, user) => dispatch(getPost(post, user)),
  deletePost: (user, post) => dispatch(deletePost(user, post)),
  resetFlag: () => dispatch(resetCommentCreationFlag())
});

class PostPage extends React.Component {
  componentDidMount() {
    const { post_id } = this.props.match.params;
    this.props.getPost(post_id, this.props.user);
  }

  componentDidUpdate() {
    if (this.props.commentCreated) {
      const { post_id } = this.props.match.params;
      this.props.getPost(post_id, this.props.user);
      this.props.resetFlag();
    }
  }

  handleDeleteClick = () => {
    this.props.deletePost(
      this.props.user.id,
      this.props.post.id
    )
  }

  render() {
    const { post, loggedIn, user } = this.props;
    return (
      <div className='post-page-wrapper'>
        <VoteButtons className='post-page-vote' post={post} />
        <div className='post-general-wrapper'>
          <h2>{post.title}</h2>
          <div className='post-info'>
            <p>
              {post.updated 
                ? 'Updated '
                : 'Posted '
              }  
              by {post.username} on {post.creation_date}</p>
            <p>{post.comments_num} comments</p>
          </div>
          <div className='post-content'>
            {post.type === 'image'
              ? <img src={`/static/images/${post.filename}`} alt='post content'></img>
              : <p>{post.content}</p>}
          </div>
          {loggedIn && post.username === user.username 
            ? <div>
                <Link to={{
                  pathname: '/edit_post',
                  state: {
                    post: post
                  }
                }}>
                  <button type='button'>Edit post</button>
                </Link>
                <button type='button' onClick={this.handleDeleteClick}>Delete post</button>
              </div>
            : null}
          {loggedIn
            ? <CommentCreateForm post={post.id} />
            : null}
          <div className='post-comments'>
            <p>Comments:</p>
              {!post.comments
                ? <span>No comment yet.</span>
                : <CommentsList comments={post.comments} />
                }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);