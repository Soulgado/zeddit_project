import React from 'react';
import { connect } from 'react-redux';
import PostCreateForm from '../PostCreate/PostCreate';
import PostCreateImageForm from '../PostCreateImage/PostCreateImage';
import { getSubzedditTitles } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  subzeddits: state.subzedditsTitles
});

const mapDispatchToProps = dispatch => ({
  getSubzeddits: () => dispatch(getSubzedditTitles())
});

class PostCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: 'text'
    }

    this.changeToImage = this.changeToImage.bind(this);
    this.changeToText = this.changeToText.bind(this);
  }

  // get list of subzeddits on mounting
  componentDidMount() {
    this.props.getSubzeddits();
  }

  changeToText() {
    if (this.state.formState === 'text') return;
    this.setState({
      formState: 'text'
    })
  } 
  
  changeToImage() {
    if (this.state.formState === 'image') return;
    this.setState({
      formState: 'image'
    })
  }

  render() {
    const { formState } = this.state;
    return (
      <div className='create-post-page'>
        <div className='create-post-nav'>
          <div className='create-post-choose' >
            <button type='button' onClick={this.changeToText}>Submit text post</button>
          </div>
          <div className='create-post-choose' onClick={this.changeToImage}>
            <button type='button' onClick={this.changeToImage}>Submit image post</button>
          </div>
        </div>
        {formState === 'text' 
          ? <PostCreateForm subzeddits={this.props.subzeddits} />
          : <PostCreateImageForm subzeddits={this.props.subzeddits} />}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCreatePage);