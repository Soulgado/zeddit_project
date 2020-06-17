import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createNewImagePost,
  resetPostFormErrors,
} from "../../redux/actionCreators";
import Dropdown from "../PostFormDropdown/PostFormDropdown";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  errors: state.post.formErrors,
});

const mapDispatchToProps = (dispatch) => ({
  createImgPost: (formData) => dispatch(createNewImagePost(formData)),
  resetErrors: () => dispatch(resetPostFormErrors()),
});

export class PostCreateImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: undefined,
      title: "",
      subzeddit: "",
      dropdownActive: false,
      titlesList: [],
      errors: undefined,
    };

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.handleSubzedditChange = this.handleSubzedditChange.bind(this);
    this.handleSubzedditFocus = this.handleSubzedditFocus.bind(this);
    this.handleSubzedditBlur = this.handleSubzedditBlur.bind(this);
    this.matchedSubzeddits = this.matchedSubzeddits.bind(this);
  }

  componentDidMount() {
    if (this.props.currentSubzeddit) {
      this.setState({
        subzeddit: this.props.currentSubzeddit
      });
    }
  }

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      errors: undefined,
    });
    if (this.props.errors) {
      this.props.resetErrors();
    }
  };

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      errors: undefined,
    });
    if (this.props.errors) {
      this.props.resetErrors();
    }
  };

  formErrorsCheck(state) {
    if (state.title === "") {
      return "Title field must not be empty";
    } else if (state.title.length < 3) {
      return "Title must be no less than 3 characters long";
    } else if (!state.selectedFile) {
      return "File field must not be empty";
    } else if (state.subzeddit === "") {
      return "Subzeddit field must not be empty";
    } else {
      return;
    }
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    const errors = this.formErrorsCheck(this.state);
    if (errors) {
      this.setState({
        errors: errors,
      });
      return;
    }
    // use Form API to send request with content-type = multipart/form-data
    // required to send the file
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("user", this.props.user.id);
    data.append("subzeddit", this.state.subzeddit);
    data.append("title", this.state.title);
    this.props.createImgPost(data);
    this.props.resetErrors();
  };

  handleSubzedditChange = (event) => {
    let matchedTitles = this.matchedSubzeddits(event.target.value);
    this.setState({
      subzeddit: event.target.value,
      titlesList: matchedTitles,
      errors: undefined,
    });
    if (this.props.errors) {
      this.props.resetErrors();
    }
  };

  handleSubzedditFocus = event => {
    event.preventDefault();
    if (this.state.subzeddit !== "") {
      const matchedTitles = this.matchedSubzeddits(this.state.subzeddit);
      this.setState({
        titlesList: matchedTitles
      });
    }
    this.setState({
      dropdownActive: true,
    });
  };

  handleSubzedditBlur = () => {
    // timeout required to catch dropdown before its unmounting
    setTimeout(() => {
      this.setState({
        dropdownActive: false,
      });
    }, 100);
  };

  matchedSubzeddits = (title) => {
    if (title !== "") {
      return this.props.subzeddits.filter((subzeddit) => {
        const regex = new RegExp(title, "gi");
        return subzeddit.title.match(regex);
      });
    } else {
      return [];
    }
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  handleDropdownClick = (event) => {
    this.setState({
      subzeddit: event.target.textContent,
    });
  };

  render() {
    return (
      <form
        id="post-image-form"
        className="post-form"
        method="post"
        encType="multipart/form-data"
        onSubmit={this.onSubmitHandler}
      >
        <p className="form-title">Create new Post</p>
        <div className="form-element">
          <label htmlFor="title">Post title:</label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={this.onTitleChange}
          />
        </div>
        <div className="form-element">
          <label htmlFor="image">Add image:</label>
          <input
            id="image"
            type="file"
            name="file"
            onChange={this.onFileChange}
          />
        </div>
        <div className="form-element">
          <label htmlFor="subzeddit">Submit post to subzeddit:</label>
          <input
            id="subzeddit"
            type="text"
            value={this.state.subzeddit}
            onChange={this.handleSubzedditChange}
            onFocus={this.handleSubzedditFocus}
            onBlur={this.handleSubzedditBlur}
          />
          {this.state.dropdownActive ? (
            <Dropdown
              titlesList={this.state.titlesList}
              handleClick={this.handleDropdownClick}
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

PostCreateImageForm.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  errors: PropTypes.string,
  createImgPost: PropTypes.func,
  resetErrors: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCreateImageForm);
