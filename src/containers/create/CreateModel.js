import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ModelEntryForm from '../../components/create/ModelEntryForm';
import { createModel } from '../../actions/modelActions';
import { selectDbMdls } from '../../selectors/modelSelectors';
import ModelPreview from '../../components/create/ModelPreview';
import { selectCurrentDatabase, selectCurrentModel } from '../../selectors/sessionSelectors';
import rejectDuplicates from '../../utils/rejectDuplicates';
import stateToSchema from '../../utils/stateToSchema';
import monitorInputs from '../../utils/monitorInputs';
import { ModelForm, FormLabel, FormInput, FormSubmitButton, FormContainer, ModelUl } from '../../styles';

class CreateModel extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    currentDatabase: PropTypes.shape({
      dbName: PropTypes.string.isRequired,
      dbId: PropTypes.string.isRequired
    }).isRequired,
    currentModel: PropTypes.shape({
      mdlName: PropTypes.string.isRequired,
      mdlId: PropTypes.string.isRequired,
      mdlSchema: PropTypes.string.isRequired
    }),
    dbMdls: PropTypes.array.isRequired
  }

  state = {
    entryCounter: 1,
    mdlName: '',
    mdlSchema: {},
    confirmed: false
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleEntryChange = (entry, at) => {
    this.setState({
      mdlSchema: {
        ...this.state.mdlSchema,
        [at]: { [entry.fieldName]: entry.dataType }
      }
    });
  }

  addEntry = () => {
    this.setState({
      entryCounter: this.state.entryCounter + 1
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dbMdls, currentDatabase: { dbId } } = this.props;
    const { mdlName, mdlSchema } = this.state;
    if(rejectDuplicates(dbMdls, mdlName)) {
      const model = {
        mdlName,
        mdlSchema: stateToSchema(mdlSchema),
        dbId
      };
      if(monitorInputs(mdlName, model.mdlSchema)) {
        this.props.onSubmit(model);
        this.setState({
          entryCounter: 1,
          mdlName: '',
          mdlSchema: {},
          confirmed: true
        });
      }
    }
  }

  render() {
    const { mdlName, mdlSchema } = this.state;
    if(this.state.confirmed) return <Redirect to={'/create/data'} />;
    const modelPreviewProps = { mdlName, mdlSchema };
    const modelEntries = [...Array(this.state.entryCounter)]
      .map((_, i) => <ModelEntryForm
        key={i}
        at={i}
        handleEntryChange={this.handleEntryChange}
      />);
    return (
      <FormContainer>
        <ModelForm onSubmit={this.handleSubmit}>
          <FormLabel htmlFor="mdlName">
          Model Name:
          </FormLabel>
          <FormInput name="mdlName" onChange={this.handleChange} value={this.state.mdlName} />
          <ModelUl>
            {modelEntries}
          </ModelUl>
          <FormSubmitButton type="button" onClick={this.addEntry}>Add Entry</FormSubmitButton>
          <ModelPreview {...modelPreviewProps} />
          <FormSubmitButton>Finish Model</FormSubmitButton>
        </ModelForm>
      </FormContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentDatabase: selectCurrentDatabase(state),
  currentModel: selectCurrentModel(state),
  dbMdls: selectDbMdls(state),

});

const mapDispatchToProps = dispatch => ({
  onSubmit(model) {
    dispatch(createModel(model));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateModel);
