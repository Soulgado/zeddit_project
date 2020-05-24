import React from 'react';
import { Link } from 'react-router-dom';
import VoteButtons from '../VoteButtons/VoteButtons';
import PostPreview from '../PostPreview/PostPreview';
import CreationTime from '../CreationTime/CreationTime';

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
    const { post } = this.props;
    return (
      <div className='post-mini-wrapper'>
        <VoteButtons post={post} />
        <PostPreview type={post.type} />
        <div className='post-mini-content-wrapper'>
          <div className='post-mini-title'>
            <Link to={`/sz/${post.subzeddit_title}/${post.id}/${post.title}`}>
              {post.title}
            </Link>
          </div>
          <div className='post-mini-info'>
            <p>
              {post.updated 
                ? 'Updated '
                : 'Posted '
              } by u/{post.username} 
              <CreationTime time={post.creation_date} /> to <Link
                to={`/sz/${post.subzeddit_title}`}>
                  z/{post.subzeddit_title}
                </Link>
            </p>
            <div className='post-mini-user-options'>
              <button type='button' onClick={this.handleClick}>Details</button>
              <p>{post.comments} comments</p> 
            </div>  
          </div>
          {this.state.contentActive
            ? <div className='post-mini-content'>
              {post.type === 'image'
                ? <img src={`/static/images/${post.filename}`} alt='post content'></img>
                : <p>{post.content}</p>}
              </div>
            : ''}
        </div>
      </div>
    )
  }
}

export default PostMinified;