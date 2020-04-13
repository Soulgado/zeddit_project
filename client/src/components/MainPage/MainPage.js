import React from 'react';
import { connect } from 'react-router-dom';
import { 
  getMostPopularGlobal,
  getMostPopularSpecific
} from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn,
  mostPopularGlobal: state.mostPopularGlobal,
  mostPopularUser: state.mostPopularSpecific
});

const mapDispatchToProps = dispatch => ({
  getMostPopularGlobal: () => dispatch(getMostPopularGlobal()),
  getMostPopularSpecific: (user) => dispatch(getMostPopularSpecific(user))
});

class MainPage extends React.Component {
  // if user is logged in - return most popular posts for the last day from subscribed
  // if user is not logged in - return most popular posts from 'global' list of subzeddits
  getPosts() {
    if (!this.props.loggedIn) {
      this.props.getMostPopularGlobal();
    } else {
      this.props.getMostPopularSpecific(this.props.user);
    }
  }

  renderPosts(posts) {
    // create component for minified post
    return (
      <div className='posts-list'>
        {posts.map(post => {
          return <div>{post.title}</div>;
        })}
      </div>
    );
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <div className='most-popular'>
        {this.props.loggedIn 
          ? this.renderPosts(this.props.mostPopularUser)
          : this.renderPosts(this.props.mostPopularGlobal)
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);