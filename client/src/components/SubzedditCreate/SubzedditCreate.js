import React from 'react';
import { connect } from 'react-redux';
import { createSubzeddit } from '../../redux/actionCreators';


const mapStateToProps = state => ({
  user: state.currentUser.user,
})

const mapDispatchToProps = dispatch => ({
  createSubzeddit: (formData) => dispatch(createSubzeddit(formData))
})

class SubzedditCreateForm extends React.Component {
    handleSubmit = e => {
    e.preventDefault();
    const title = this.state.title;
    const user = this.props.user;
    this.props.createSubzeddit({ title, user });
  }

  render() {
    // ToDo: simplify
    const { handleChange, title } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
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
      </form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreateForm);