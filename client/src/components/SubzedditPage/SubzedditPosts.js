import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Placeholder from "../fetchingPlaceholder";
import PostMinified from "../PostMinified/PostMinified";
import SortedOrder from "./SortedOrder";
import { getSubzedditPosts } from "../../redux/actionCreators";
import "../../styles/subzedditPosts.sass";


const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  loading: state.loading.loading,
  posts: state.subzeddit.postsList
});

const mapDispatchToProps = dispatch => ({
  getPosts: (title, user, page, sort) => dispatch(getSubzedditPosts(title, user, page, sort))
});

export class SubzedditPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: ["Top", "top"]
    }

    this.getPage = this.getPage.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.props.getPosts(this.props.title, this.props.user, this.getPage(), this.state.sort[1]);
    // get posts
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.getPosts(this.props.title, this.props.user, this.getPage(), this.state.sort[1]);
    }
  }

  handleSortChange(sort) {
    this.setState({
      sort
    });
    this.props.getPosts(this.props.title, this.props.user, this.getPage(), sort[1]);
  }

  getPage() {
    // get page query parameter from location.search
    return this.props.location.search.match(/(?<=page=)\d+/);
  }

  render() {
    const { loading, posts, count } = this.props;
    const { url } = this.props.match;
    const page = Number(this.getPage()) + 1;
    return (
      <>
        <div className="posts-list-wrapper">
          <SortedOrder sort={this.state.sort} handleSortChange={this.handleSortChange} />
        {loading ? <Placeholder /> : (
          <div className="posts-list">
          {!posts || posts.length === 0 ? (
            <p>No posts yet, want to add the first?</p>
            ) : (
              posts.map((post) => {
                return <PostMinified key={post.id} post={post} />;
              })
            )}
          </div>
        )}
          <div className="posts-navigation">
            {page > 1 &&
            (<button className="posts-navigation__button" type="button">
              <Link to={`${url}?page=${page-2}`} >Previous</Link>  
            </button>
            )}
            <p className="posts-navigation__page-nums">
              {page > 1 && (<span>{page-1}</span>)}
              <span className="posts-navigation__page-nums_current">{page}</span>
              {page * 10 < count && <span>{page+1}</span>}
            </p>
            {page * 10 < count &&
            (<button className="posts-navigation__button" type="button">
              <Link to={`${url}?page=${page}`} >Next</Link>
            </button>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubzedditPosts);