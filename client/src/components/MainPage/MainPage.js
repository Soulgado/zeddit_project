import React from 'react';
import { connect } from 'react-redux';
import { 
  getMostPopularDefault
} from '../../redux/actionCreators';
import PostMinified from '../PostMinified/PostMinified';
import Placeholder from '../fetchingPlaceholder';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  fetching: state.subzeddit.fetching,
  mostPopularGlobal: state.subzeddit.mostPopularGlobal,
  mostPopularUser: state.subzeddit.mostPopularSpecific
});

const mapDispatchToProps = dispatch => ({
  getMostPopularGlobal: (user) => dispatch(getMostPopularDefault(user))
 // getMostPopularSpecific: (user) => dispatch(getMostPopularSpecific(user))
});

class MainPage extends React.Component {
  // if user is logged in - return most popular posts for the last day from subscribed
  // if user is not logged in - return most popular posts from 'global' list of subzeddits

  renderPosts(posts) {
    // create component for minified post
    return (
      <div className='posts-list'>
        {posts.map(post => {
          return <PostMinified post={post} />;
        })}
      </div>
    );
  }

  componentDidMount() {
    this.props.getMostPopularGlobal(this.props.user)
  }

  render() {
    return (
      <div className='most-popular'>
        <p style={{fontSize: '30px'}}>This is main page of the Zeddit.</p>
        <div>
          <p>Most popular posts:</p>
          {this.props.fetching
            ? <Placeholder /> 
            : this.renderPosts(this.props.mostPopularGlobal)
          }
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);