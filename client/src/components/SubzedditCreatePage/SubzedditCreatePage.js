import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetCreationSuccess } from '../../redux/actionCreators';
import Placeholder from '../fetchingPlaceholder';
import SubzedditCreateForm from '../SubzedditCreate/SubzedditCreate';

const mapStateToProps = state => ({
  loading: state.loading.loading,
  creationSuccess: state.subzeddit.creationSuccess
})

const mapDispatchToProps = dispatch => ({
  resetCreationSuccess: () => dispatch(resetCreationSuccess())
})

class SubzedditCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
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
    const { handleChange } = this;

    return (
      // show message if created subzeddit
      // if not, show form or loading placeholder if request is pending
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
            : <SubzedditCreateForm handleChange={handleChange} title={title} />}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreatePage);