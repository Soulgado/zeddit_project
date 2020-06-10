import React from "react";
import PropTypes from "prop-types";

const Dropdown = (props) => {
  return (
    <ul className="form-subzeddits-dropdown">
      {props.titlesList.map((subzeddit) => {
        return (
          <li key={subzeddit.title} onClick={props.handleClick}>
            {subzeddit.title}
          </li>
        );
      })}
    </ul>
  );
};

Dropdown.propTypes = {
  titlesList: PropTypes.array,
  handleClick: PropTypes.func
}

export default Dropdown;
