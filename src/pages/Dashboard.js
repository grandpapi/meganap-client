import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { selectNickname } from '../selectors/sessionSelectors';
import { connect } from 'react-redux';
import { logout } from '../services/auth';
import DatabaseDisplay from '../containers/dashboard/DatabaseDisplay';

class Dashboard extends PureComponent {
  static propTypes = {
    nickname: PropTypes.string.isRequired,
  }

  render() {
    const { nickname } = this.props;
    return (
      <>
        <h1>Welcome to your dashboard, {nickname}!</h1>
        <button onClick={logout}>Log Out</button>
        <DatabaseDisplay />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nickname: selectNickname(state)
});


export default connect(
  mapStateToProps
)(Dashboard); 
