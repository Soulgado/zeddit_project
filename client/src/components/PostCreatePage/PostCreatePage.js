import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PostCreatePageTemplate from "./PostCreatePageTemplate";
import Placeholder from "../fetchingPlaceholder";
import {
  getSubzedditTitles,
  resetCommentCreationFlag,
} from "../../redux/actionCreators";
import "../../styles/postCreatePage.sass";

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  creationFlag: state.post.creationFlag,
  post: state.post.post,
});

const mapDispatchToProps = (dispatch) => ({
  getSubzeddits: () => dispatch(getSubzedditTitles()),
  resetCreationFlag: () => dispatch(resetCommentCreationFlag()),
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
    const { loading, creationFlag, post } = this.props;
    if (loading) {
      return <Placeholder />;
    } else if (creationFlag) {
      return (
        <div className="success-message">
          <p>The post has been successfully created!</p>
          <p>
            Go to{" "}
            <Link to={`/sz/${post.subzeddit}/${post.id}/${post.title}`}>
              created post
            </Link>
          </p>
        </div>
      );
    } else {
      return <PostCreatePageTemplate />;
    }
  }

  render() {
    return (
      <div className="create-page">
        <div className="create-wrapper">{this.renderingOptions()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreatePage);
