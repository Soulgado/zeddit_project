import React from 'react';
import { connect } from 'react-redux'; 
import { getUpvotedPosts } from '../../redux/actionCreators';
import PostMinified from '../PostMinified/PostMinified';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn,
  postsList: state.userUpvotedPosts
});

const mapDispatchToProps = dispatch => ({
  getUpvotedPosts: (user) => dispatch(getUpvotedPosts(user))
});

class UserUpvotedPosts extends React.Component {
  componentDidMount() {
    // get subscriptions
    this.props.getUpvotedPosts(this.props.user);
  }

  render() {
    let { postsList } = this.props; 
    return (
      <div className='subzeddits-list-wrapper'>
        <h1 className='subzeddits-list-title'>List of upvoted posts:</h1>
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
)(UserUpvotedPosts);