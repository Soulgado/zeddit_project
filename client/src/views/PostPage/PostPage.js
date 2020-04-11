import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentCreateForm from '../CommentCreate/CommentCreate';
import { getPost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  getPost: (post, subzeddit) => dispatch(getPost(post, subzeddit))
});

function PostPage(props) {
  // should fetch the post and all? first level comments
  // specific component for comment body
  const { post, title } = useParams();  // title of the post
  const [ thisPost, setPost] = useState('');

  useEffect(() => {
    let currPost;
    if (props.posts.length !== 0) {
      currPost = props.posts.find(value => value.title === post);
    }
    if (!currPost) {
      props.getPost(post, title);
    } else {
      setPost(currPost);
    }
  }, [props.posts, props, post, title]);


  return (
    <div className='post-page-wrapper'>
      <h1>{thisPost.title}</h1>
      <p>{thisPost.content}</p>
      <CommentCreateForm />
      <div className='post-comments'>
        <ul>
          {!thisPost.comments
            ? <span>No comment yet.</span>
            : thisPost.comments.map(comment => {
              return <li><p>{comment.content}</p></li>
            })}
        </ul>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);