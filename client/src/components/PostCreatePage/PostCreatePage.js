import React from 'react';
import { connect } from 'react-redux';
import PostCreatePageTemplate from './PostCreatePageTemplate';
import Placeholder from '../fetchingPlaceholder';
import { 
  getSubzedditTitles,
  resetCommentCreationFlag
} from '../../redux/actionCreators';
import '../../styles/postCreatePage.sass';

const mapStateToProps = state => ({
  loading: state.loading.loading,
  creationFlag: state.post.creationFlag
});

const mapDispatchToProps = dispatch => ({
  getSubzeddits: () => dispatch(getSubzedditTitles()),
  resetCreationFlag: () => dispatch(resetCommentCreationFlag())
});

class PostCreatePage extends React.Component {
  // get list of subzeddits on mounting
  // unnecessary ???
  componentDidMount() {
    this.props.getSubzeddits();
  }

  componentWillUnmount() {
    this.props.resetCreationFlag();
  }

  renderingOptions() {
    const { loading, creationFlag } = this.props;
    if (loading) {
      return <Placeholder />
    } else if (creationFlag) {
      return (
        <div>
          <p>The post has been successfully created!</p>
          <p>Go to created post.</p>
        </div>
      )
    } else {
      return <PostCreatePageTemplate />
    }
  }

  render() {
    return (
      <div className='create-post-page'>
        <div className='create-post-wrapper'>
          {this.renderingOptions()}
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCreatePage);