import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Edit from './Edit';
import LangHelper from '@jsroot/common/langHelper';
import { getPermission } from '@jsroot/common/shareScripts';
import { Policy, FunctionKey } from '@jsroot/common/constants';

export class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        policy: null
      };
  }

  componentDidMount() {
      this.props.getServiceNameSettings();
      const params = {
          serviceName: '',
          envr: this.props.gridParams.envr,
          settingName: ''
      };
      this.props.getSettingNames(params);
      getPermission(FunctionKey.JobSettingManagement).then(response => {
        this.setState({policy: response});
      });
      document.title = LangHelper.getResource('JobSettingManagement');
  }
  
  componentWillUnmount(){
    this.props.resetState();
  }

  handleCloseEdit = () =>{
    this.props.setEditPopup({ show: false, data: null, isEditMultiple: false });
    this.props.setEditJobSetting(null);
  };

  handleSuccessEdit = () =>{
    this.handleCloseEdit();
    this.props.getConfigSettings(this.props.gridParams);
  };


  render() {
    const {serviceNames, settingNames, editPopup} = this.props;
    if(!serviceNames || !settingNames || !this.state.policy){
      return null;
    }
    const isHost = this.state.policy === Policy.Host;
    return (
        <Fragment>
            <Filter />
            <DataGrid isHost={isHost}/>
            {
                editPopup.show &&
                <Edit
                    onClose={this.handleCloseEdit}
                    onSuccess={this.handleSuccessEdit}
                />
              }
        </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
    const { serviceNames, settingNames, gridParams, editPopup} = state;
    return { serviceNames, settingNames, gridParams, editPopup };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);