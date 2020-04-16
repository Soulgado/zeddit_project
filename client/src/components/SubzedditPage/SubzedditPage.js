import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getSubzeddit } from '../../redux/actionCreators';
import PostCreateForm from '../PostCreate/PostCreate';
import PostPage from '../PostPage/PostPage';
import PostMinified from '../PostMinified/PostMinified';
import '../../styles/subzedditPage.sass';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn,
  subzeddit: state.subzeddit       // use array to store open subzeddits
})

const mapDispatchToProps = dispatch => ({
  getSubzeddit: (title) => dispatch(getSubzeddit(title))
})

function SubzedditPage(props) {
  // should populate posts in subzeddit request
  // or request single subzeddit and its posts here
  const { title } = useParams();  // get title from url
  const [subzeddit, setSubzeddit] = useState(props.subzeddit);
  const { url, path } = useRouteMatch();
  
  useEffect(() => {
    props.getSubzeddit(title);    // page doesn't reload on new post creation
  }, [subzeddit, title]);   // eslint warning

  return (
    <div className='subzeddit-page-wrapper'>
      <h1>{props.subzeddit.title}</h1>
      <Switch>
        <Route exact path={`${url}/`}>
          <ul className='posts-list'>
          {!props.subzeddit.posts
            ? <p>No posts yet, want to add the first?</p>
            : props.subzeddit.posts.map(post => {
              return (
                <li key={post.id}>
                  <PostMinified url={url} post={post} />
                </li>
              );
            })
          } 
          </ul>
          {props.loggedIn 
            ? <PostCreateForm subzeddit={props.subzeddit} />
            : ''}
        </Route>
        <Route path={`${path}/:post`}>
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