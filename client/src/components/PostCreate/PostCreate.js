import React from "react";
import { connect } from "react-redux";
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

export class PostCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      subzeddit: "",
      subzedditsTitles: [],
      dropdownActive: false,
      errors: undefined
    }
  }

  componentDidMount() {
    if (this.props.currentSubzeddit) {
      this.setState({
        subzeddit: this.props.currentSubzeddit
      });
    }
    this.setState({
      subzedditsTitles: this.props.subzeddits
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // ToDo: create frontend errors handler
    const { title, content, subzeddit } = this.state;
    this.props.createPost(this.props.user.id, { title, content, subzeddit });
    this.props.resetErrors();
  }; 

  matchedSubzeddits(title) {
    if (title !== "") {
      return this.props.subzeddits.filter((subzeddit) => {
        const regex = new RegExp(title, "gi");
        return subzeddit.title.match(regex);
      });
    } else {
      return [];
    }
  }

  handleSubzedditChange = (event) => {
    const matchedTitles = this.matchedSubzeddits(event.target.value);
    this.setState({
      subzedditsTitles: matchedTitles,
      subzeddit: event.target.value,
      errors: undefined
    });
    if (this.props.errors) {
      this.props.resetErrors();
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      errors: undefined
    });
    if (this.props.errors) {
      this.props.resetErrors();
    }
  }

  handleSubzedditFocus = (event) => {
    event.preventDefault();
    if (this.state.subzeddit !== "") {
      const matchedTitles = this.matchedSubzeddits(this.state.subzeddit);
      this.setState({
        subzedditsTitles: matchedTitles
      });
    }
    this.setState({
      dropdownActive: true
    });
  };

  handleSubzedditBlur = () => {
    // timeout is required to catch dropdown as event target
    setTimeout(() => {
      this.setState({
        dropdownActive: false
      })
    }, 100);
  };

  handleDropdownClick = (event) => {
    this.setState({
      subzeddit: event.target.textContent
    });
  };

  render() {
    const { title, content, subzeddit, subzedditsTitles } = this.state;
    const { 
      handleSubmit,
      handleChange,
      handleSubzedditBlur,
      handleSubzedditChange,
      handleSubzedditFocus,
      handleDropdownClick
    } = this;
    return (
      <form className="post-form" onSubmit={handleSubmit}>
        <p className="form-title">Create new Post</p>
        <div className="form-element">
          <label htmlFor="title">Post title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-element">
          <label htmlFor="content">Post content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleChange}
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
          {this.state.dropdownActive ? (
            <Dropdown
              titlesList={subzedditsTitles}
              handleClick={handleDropdownClick}
            />
          ) : null}
        </div>
        <div className="form-errors">
          {this.state.errors && <p>{this.state.errors}</p>}
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button" type="submit">
          Create Post
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateForm);
