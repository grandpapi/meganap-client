import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatabaseList from '../../components/dashboard/DatabaseList';
import { selectUserDbs } from '../../selectors/dbSelectors';
import { selectUserId } from '../../selectors/sessionSelectors';
import { fetchDbs } from '../../actions/userDatabases/dbActions';


class DatabaseDisplay extends PureComponent {
    static propTypes = {
      fetch: PropTypes.func.isRequired,
      databases: PropTypes.array.isRequired,
      userId: PropTypes.string.isRequired
    }

    componentDidMount() {
      this.props.fetch(this.props.userId);
    }

    render() {
      return (
        <DatabaseList databases={this.props.databases} />
      );
    }
}

const mapStateToProps = state => ({
  databases: selectUserDbs(state),
  userId: selectUserId(state)
});

const mapDispatchToProps = dispatch => ({
  fetch(userId) {
    dispatch(fetchDbs(userId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatabaseDisplay);