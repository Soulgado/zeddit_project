import React from 'react';
import { Link } from 'react-router-dom';
import VoteButtons from '../VoteButtons/VoteButtons';

class PostMinified extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentActive: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      contentActive: !this.state.contentActive
    })
  }

  render() {
    const { post, url } = this.props;
    return (
      <div className='post-mini-wrapper'>
        <VoteButtons post={post} />
        <div className='post-mini-content-wrapper'>
          <div className='post-mini-title'>
            <Link to={`${url}/${post.title}`}>
              {post.title}
            </Link>
          </div>
          <div>
            <p>Created {post.creation_date} by {post.username}</p>
          </div>
          <button type='button' onClick={this.handleClick}>Details</button>
          {this.state.contentActive
            ? <div>{post.content}</div>
            : ''}
        </div>
      </div>
    )
  }
}

export default PostMinified;