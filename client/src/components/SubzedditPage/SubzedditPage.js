import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getSubzeddit } from '../../redux/actionCreators';
import PostCreateForm from '../PostCreate/PostCreate';
import PostCreateImageForm from '../PostCreateImage/PostCreateImage';
import PostPage from '../PostPage/PostPage';
import PostMinified from '../PostMinified/PostMinified';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import '../../styles/subzedditPage.sass';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn,
  subzeddit: state.subzeddit       // use array to store open subzeddits
})

const mapDispatchToProps = dispatch => ({
  getSubzeddit: (title, user) => dispatch(getSubzeddit(title, user))
})

function SubzedditPage(props) {
  // should populate posts in subzeddit request
  // or request single subzeddit and its posts here
  const { title } = useParams();  // get title from url
  const [subzeddit, setSubzeddit] = useState(props.subzeddit);
  const { url, path } = useRouteMatch();
  
  useEffect(() => {
    props.getSubzeddit(title, props.user);    // page doesn't reload on new post creation
  }, [subzeddit, title]);   // eslint warning

  return (
    <div className='subzeddit-page-wrapper'>
      <h1>{props.subzeddit.title}</h1>
      {props.loggedIn
        ? <SubscribeButton subzeddit={title} />
        : ''}
      <Switch>
        <Route exact path={`${url}/`}>
          <ul className='posts-list'>
          {!props.subzeddit.posts
            ? <p>No posts yet, want to add the first?</p>
            : props.subzeddit.posts.map(post => {
              return (
                <li key={post.id}>
                  <PostMinified post={post} />
                </li>
              );
            })
          } 
          </ul>
          {props.loggedIn 
            ? (<>
                <PostCreateForm subzeddit={props.subzeddit} />
                <PostCreateImageForm subzeddit={props.subzeddit} />
              </>
              )
            : ''}
        </Route>
        <Route path={`${path}/:post_id/:post_title`}>
          <PostPage />
        </Route>
      </Switch>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditPage);