import React from 'react';
import { connect } from 'react-redux'; 
import { getDownvotedPosts } from '../../redux/actionCreators';
import PostMinified from '../PostMinified/PostMinified';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  postsList: state.userAction.userDownvotedPosts
});

const mapDispatchToProps = dispatch => ({
  getDownvotedPosts: (user) => dispatch(getDownvotedPosts(user))
});

class UserDownvotedPosts extends React.Component {
  componentDidMount() {
    // get subscriptions
    this.props.getDownvotedPosts(this.props.user);
  }

  render() {
    let { postsList } = this.props; 
    return (
      <div className='subzeddits-list-wrapper'>
        <h1 className='subzeddits-list-title'>List of downvoted posts:</h1>
        <div className='subzeddits-list'>
          <ul className='posts-list'>
            {postsList.map(post => {
            return (
              <li key={post.title}>
                <PostMinified
                  post={post} />
              </li>
            )})}
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDownvotedPosts);