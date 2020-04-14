import React from 'react';

class PostMinified extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentActive: false
    }
  }

  handleClick() {
    this.setState({
      contentActive: !this.state.contentActive
    })
  }

  render() {
    return (
      <div>
        <div>
          <p>{this.props.post.title}</p>
        </div>
        <div>
          <p>Created {this.props.post.creation_date} by {this.props.post.creator}</p>
        </div>
        <button type='button' onClick={this.handleClick}>Details</button>
        {this.state.contentActive
          ? <div>{this.props.post.content}</div>
          : ''}
      </div>
    )
  }
}

export default PostMinified;