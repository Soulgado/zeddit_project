import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { createNewPost, resetPostFormErrors } from "../../redux/actionCreators";
import Dropdown from "../PostFormDropdown/PostFormDropdown";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  errors: state.post.formErrors,
});

const mapDispatchToProps = (dispatch) => ({
  createPost: (user, formData) => dispatch(createNewPost(user, formData)),
  resetErrors: () => dispatch(resetPostFormErrors()),
});

function PostCreateForm(props) {
  const { state } = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subzeddit, setSubzeddit] = useState(state ? state.subzeddit : "");
  const [subzedditsTitles, setTitles] = useState(props.subzeddits);
  const [dropdownActive, setDropdown] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createPost(props.user.id, { title, content, subzeddit });
  };

  function matchedSubzeddits(title) {
    if (title !== "") {
      return props.subzeddits.filter((subzeddit) => {
        const regex = new RegExp(title, "gi");
        return subzeddit.title.match(regex);
      });
    } else {
      return [];
    }
  }

  const handleSubzedditChange = (event) => {
    const matchedTitles = matchedSubzeddits(event.target.value);
    setTitles(matchedTitles);
    setSubzeddit(event.target.value);
  };

  const handleSubzedditFocus = (event) => {
    event.preventDefault();
    setDropdown(true);
  };

  const handleSubzedditBlur = () => {
    setTimeout(() => {
      setDropdown(false);
    }, 100);
  };

  const handleDropdownClick = (event) => {
    setSubzeddit(event.target.textContent);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <p className="form-title">Create new Post</p>
      <div className="form-element">
        <label htmlFor="title">Post title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-element">
        <label htmlFor="content">Post content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="form-element">
        <label htmlFor="subzeddit">Submit post to subzeddit:</label>
        <input
          id="subzeddit"
          type="text"
          value={subzeddit}
          onChange={handleSubzedditChange}
          onFocus={handleSubzedditFocus}
          onBlur={handleSubzedditBlur}
        />
        {dropdownActive ? (
          <Dropdown
            titlesList={subzedditsTitles}
            handleClick={handleDropdownClick}
          />
        ) : null}
      </div>
      <button className="form-button" type="submit">
        Create Post
      </button>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateForm);
