import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getSubzeddit } from '../../redux/actionCreators';
import PostCreateForm from '../PostCreate/PostCreate';

const mapStateToProps = state => ({
  subzeddit: state.subzeddit
})

const mapDispatchToProps = dispatch => ({
  getSubzeddit: (title) => dispatch(getSubzeddit(title))
})

function SubzedditPage(props) {
  // should populate posts in subzeddit request
  // or request single subzeddit and its posts here
  const { title } = useParams();  // get title from url
  
  useEffect(() => {
    props.getSubzeddit(title);   // WARNING!! infinite loop
  });

  return (
    <div className='subzeddit-page-wrapper'>
      <h1>{props.subzeddit.title}</h1>
      <ul>
        {!props.subzeddit.posts
          ? <p>No posts yet, want to add the first?</p>
          : props.subzeddit.posts.map(post => {
            return <li key={post._id}><span>{post.title}</span></li>
          })
        }
      </ul>
      <PostCreateForm subzeddit={props.subzeddit} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditPage);