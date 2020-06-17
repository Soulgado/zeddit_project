import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostCreateForm from "../PostCreate/PostCreate";
import PostCreateImageForm from "../PostCreateImage/PostCreateImage";

const mapStateToProps = (state) => ({
  subzeddits: state.subzeddit.subzedditsTitles,
});

export class PostCreatePageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: "text",
    };

    this.changeToImage = this.changeToImage.bind(this);
    this.changeToText = this.changeToText.bind(this);
  }

  changeToText() {
    if (this.state.formState === "text") return;
    this.setState({
      formState: "text",
    });
  }

  changeToImage() {
    if (this.state.formState === "image") return;
    this.setState({
      formState: "image",
    });
  }

  render() {
    const { formState } = this.state;
    return (
      <>
        <div className="create-post-nav">
          <div className="create-post-choose">
            <button
              className={`${formState === "text" ? "button-active" : ""}`}
              type="button"
              onClick={this.changeToText}
            >
              Submit text post
            </button>
          </div>
          <div className="create-post-choose">
            <button
              className={`${formState !== "text" ? "button-active" : ""}`}
              type="button"
              onClick={this.changeToImage}
            >
              Submit image post
            </button>
          </div>
        </div>
        {formState === "text" ? (
          <PostCreateForm subzeddits={this.props.subzeddits} currentSubzeddit={this.props.currentSubzeddit}/>
        ) : (
          <PostCreateImageForm subzeddits={this.props.subzeddits} currentSubzeddit={this.props.currentSubzeddit}/>
        )}
      </>
    );
  }
}

PostCreatePageTemplate.propTypes = {
  subzeddits: PropTypes.array,
  currentSubzeddit: PropTypes.object
}

export default connect(mapStateToProps)(PostCreatePageTemplate);
