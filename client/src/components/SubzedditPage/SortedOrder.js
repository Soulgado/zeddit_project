import React from "react";
import "../../styles/sortedOrder.sass";

class SortedOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
      dropdownOptions: [["Best", "best"], ["Top", "top"], ["Controversial", "controversial"], ["New", "new"]]
    }

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  dropdownRender() {
    // render dropdown options
    return (
      <div className="posts-sort-order__options">
        {this.state.dropdownOptions.map(option => {
          return (
            <div key={option[0]} className="posts-sort-order__element">
              <button
                type="button"
                className={`posts-sort-order__button ${option[0] === this.props.sort[0] ? "posts-sort-order__button_active" : ""}`}
                data-option={option[1]}
                onClick={this.handleClick}
              >{option[0]}</button>
            </div>
          )
        })}
      </div>
    )
  }

  handleClick(e) {
    if (e.target.textContent !== this.props.sort) {
      // if clicked options is not active => change it to active
      this.props.handleSortChange([e.target.textContent, e.target.dataset.option]);
    }
    // close dropdown
    this.setState({
      dropdownActive: false
    });
  }

  handleMouseLeave() {
    // if mouse leave dropdown while it is active - hide it
    if (this.state.dropdownActive) {
      this.setState({
        dropdownActive: false
      })
    }
  }

  handleDropdownClick() {
    // toggle dropdown 
    this.setState({
      dropdownActive: !this.state.dropdownActive
    });
  }

  render() {
    return (
      <div className="posts-sort-order" onMouseLeave={this.handleMouseLeave}>
        <span>Sort by:</span>
        {this.dropdownRender()}
      </div>
    )
  }
}

export default SortedOrder;