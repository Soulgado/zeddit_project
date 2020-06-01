import React from 'react';
import { connect } from 'react-redux'; 
import { getSubmittedPosts } from '../../redux/actionCreators';
import PostMinified from '../PostMinified/PostMinified';
import {withLoading} from '../withLoading';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  postsList: state.userAction.userSubmittedPosts,
  loading: state.loading.loading
});

const mapDispatchToProps = dispatch => ({
  fetchData: (user) => dispatch(getSubmittedPosts(user))
});

class UserSubmittedPosts extends React.Component {
  /*
  componentDidMount() {
    this.props.getSubmittedPosts(this.props.user);
  }
  */

  render() {
    let { postsList } = this.props; 
    return (
      <div className='subzeddits-list-wrapper'>
        <h1 className='subzeddits-list-title'>List of submitted posts:</h1>
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

const UserSubmittedPostsLoaded = withLoading(UserSubmittedPosts);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSubmittedPostsLoaded);