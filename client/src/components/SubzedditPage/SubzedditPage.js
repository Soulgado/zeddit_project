import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getSubzeddit } from '../../redux/actionCreators';
import PostPage from '../PostPage/PostPage';
import PostMinified from '../PostMinified/PostMinified';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import '../../styles/subzedditPage.sass';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  subzeddit: state.subzeddit.subzeddit       // use array to store open subzeddits
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

  // higher-order component for only logged components
  return (
    <div className='subzeddit-page-wrapper'>
      <h1>{props.subzeddit.title}</h1>
      {props.loggedIn
        ? <SubscribeButton subzeddit={title} />
        : null}
      {props.loggedIn 
        ? <Link to={{
            pathname: '/submit_post',
            state: {
              subzeddit: title
            }
          }}>Submit a new post</Link>
        : null}
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