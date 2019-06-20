import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { selectNickname } from '../selectors/sessionSelectors';
import { connect } from 'react-redux';
import DatabaseDisplay from '../containers/dashboard/DatabaseDisplay';
import GlobalHeader from '../components/all/GlobalHeader';
import Footer from '../components/all/Footer';
import { BodyContainer, MainContainer } from '../styles';

class Dashboard extends PureComponent {
  static propTypes = {
    nickname: PropTypes.string.isRequired,
  }

  render() {
    const { nickname } = this.props;
    return (
      <BodyContainer>
        <GlobalHeader />
        <MainContainer>
          <h2>Welcome to your dashboard, {nickname}!</h2>
          <DatabaseDisplay />
        </MainContainer>
        <Footer />
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  nickname: selectNickname(state)
});

export default connect(
  mapStateToProps
)(Dashboard); 
