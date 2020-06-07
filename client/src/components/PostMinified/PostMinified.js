import React from "react";
import { Link } from "react-router-dom";
import VoteButtons from "../VoteButtons/VoteButtons";
import PostPreview from "../PostPreview/PostPreview";
import CreationTime from "../CreationTime/CreationTime";

export class PostMinified extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentActive: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      contentActive: !this.state.contentActive,
    });
  }

  render() {
    const { post } = this.props;
    return (
      <div className="post-mini-wrapper">
        <VoteButtons post={post} />
        <PostPreview type={post.type} />
        <div className="post-mini-content-wrapper">
          <div className="post-mini-title">
            <Link to={`/sz/${post.subzeddit_title}/${post.id}/${post.title}`}>
              {post.title}
            </Link>
          </div>
          <div className="post-mini-info">
            <p className="post-general-info">
              {post.updated ? "Updated" : "Posted"} by u/
              {post.username} <CreationTime time={post.creation_date} /> to{" "}
              <Link to={`/sz/${post.subzeddit_title}`}>
                z/{post.subzeddit_title}
              </Link>
            </p>
            <div className="post-mini-user-options">
              <div
                className="user-options-element content-element"
                onClick={this.handleClick}
              >
                <div
                  className={`user-options-icon 
                  ${
                    this.state.contentActive ? "collapse-icon" : "expand-icon"
                  }`}
                ></div>
                <div className="user-options-name">Details</div>
              </div>
              <div className="user-options-element comments-element">
                <div className="user-options-icon comments-icon"></div>
                <div className="user-options-name">
                  {post.comments_num} comments
                </div>
              </div>
            </div>
            {this.state.contentActive ? (
              <div className="post-mini-content">
                {post.type === "image" ? (
                  <img
                    src={`/static/images/${post.filename}`}
                    alt="post content"
                  ></img>
                ) : (
                  <p>{post.content}</p>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PostMinified;
