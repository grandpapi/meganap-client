import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GlobalHeader from '../components/all/GlobalHeader';
import { selectCurrentModel, selectNickname, selectCurrentDatabase } from '../selectors/sessionSelectors';
import { updateMdlState } from '../actions/modelActions';
import { BodyContainer, MainContainer, EndpointP } from '../styles';
import Footer from '../components/all/Footer';
import Breadcrumbs from '../containers/dashboard/Breadcrumbs';

class ModelDetail extends PureComponent {
  static propTypes = {
    currentMdl: PropTypes.object,
    username: PropTypes.string,
    currentDatabase: PropTypes.object,
    onClickMdl: PropTypes.func
  }

  render() {
    const { username, onClickMdl } = this.props;
    const { mdlName, mdlId, mdlSchema } = this.props.currentMdl;
    const { dbName } = this.props.currentDatabase;
    const endpoint = `${process.env.API_URL}/api/${username}/${dbName}/${mdlName}`;

    return (
      <BodyContainer>
        <GlobalHeader />
        <Breadcrumbs />
        <MainContainer>
          <h1>{mdlName}</h1>
          <h3>Model Schema: </h3>
          <p>{mdlSchema}</p>
          <EndpointP>{'Endpoint: '}
            <a href={`${endpoint}`} target='_blank' rel='noopener noreferrer'>{endpoint}</a>
          </EndpointP>
          <Link to="/create/data" onClick={() => onClickMdl(mdlName, mdlId, mdlSchema)}>
            <button type="button">Add Data</button>
          </Link>
        </MainContainer>
        <Footer />
      </BodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentMdl: selectCurrentModel(state),
  username: selectNickname(state),
  currentDatabase: selectCurrentDatabase(state)
});

const mapDispatchToProps = dispatch => ({
  onClickMdl(mdlName, mdlId, mdlSchema) {
    dispatch(updateMdlState(mdlName, mdlId, mdlSchema));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDetail);
