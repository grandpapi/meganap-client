import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateDbState } from '../../actions/dbActions';
import { DBButton, ViewDBButton } from '../../styles';

class DatabaseLink extends PureComponent {
  static propTypes = {
    dbName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    onClickDb: PropTypes.func.isRequired,
    publicAccess: PropTypes.bool
  }

  render() {
    const { dbName, _id, onClickDb } = this.props;
    return (
      <>
        <li>
          {
            !this.props.publicAccess ?
              <div>
                <Link to={`/dashboard/${dbName}`} onClick={() => onClickDb(dbName, _id)}>
                  <ViewDBButton><span>{dbName}</span></ViewDBButton>
                </Link>
                <Link to={'create/model'} onClick={() => onClickDb(dbName, _id)}>
                  <DBButton>Add Model</DBButton>
                </Link>
              </div>
              :
              <Link to={`/apis/${dbName}`} onClick={() => onClickDb(dbName, _id)}>
                <ViewDBButton><span>{dbName}</span></ViewDBButton>
              </Link>
          }
        </li>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onClickDb(dbName, dbId) {
    dispatch(updateDbState(dbName, dbId));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(DatabaseLink);


// dbName: "mydb"
// deployed: false
// publicAccess: true
// userId: "auth0|5d0ae8658055fd0cc73772eb"
// username: "christopher"
// __v: 0
// _id: "5d0ae87c57161611f480db22"
