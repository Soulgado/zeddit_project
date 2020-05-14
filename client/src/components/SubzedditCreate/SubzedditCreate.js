import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  createSubzeddit,
  resetCreationSuccess
} from '../../redux/actionCreators';
import Placeholder from '../fetchingPlaceholder';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loading: state.subzeddit.loading,
  creationSuccess: state.subzeddit.creationSuccess
})

const mapDispatchToProps = dispatch => ({
  createSubzeddit: (formData) => dispatch(createSubzeddit(formData)),
  resetCreationSuccess: () => dispatch(resetCreationSuccess())
})

class SubzedditCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const title = this.state.title;
    const user = this.props.user;
    this.props.createSubzeddit({ title, user });
  }

  handleChange = e => {
    this.setState({
      title: e.target.value
    })
  }

  componentWillUnmount() {
    this.props.resetCreationSuccess();
  }

  render() {
    // ToDo: simplify
    const { title } = this.state;
    const { creationSuccess, loading} = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        {creationSuccess 
          ? <div>
              <p>The subzeddit was successfully created!</p>
              <p>Go to <Link to={`/sz/${title}`}>
                {title}
                </Link></p>
            </div>
          : loading 
            ? <Placeholder />
            : <form onSubmit={handleSubmit}>
                <p className='form-title'>Create New Subzeddit</p>
                  <div className='form-element'>
                  <label htmlFor='title'>Title:</label>
                  <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={handleChange}></input>
                </div>
                <button className='form-button' type='submit'>Create Subzeddit</button>
              </form>}
      </div>
      
    )
  }

  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreateForm);