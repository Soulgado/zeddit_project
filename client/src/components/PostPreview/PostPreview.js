import React from "react";

const PostPreview = (props) => {
  function choosePreview() {
    switch (props.type) {
      case "image":
        return (
          <img
            src="/static/images/image-post-icon.png"
            alt=""
            className="preview-icon image-preview"
          ></img>
        );
      default:
        return (
          <img
            src="/static/images/text-post-icon.png"
            alt=""
            className="preview-icon text-preview"
          ></img>
        );
    }
  }

  return <div className="post-preview">{choosePreview()}</div>;
};

export default PostPreview;
