import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import Filter from './Filter';
import DataGrid from './DataGrid';
import NewSettingValue from './NewSettingValue';
import Edit from './Edit';
import LicenseeMapping from './LicenseeMapping';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

export class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policy: null
    };
  }

  componentDidMount() {
      this.props.getMainSettings();
      getPermission(FunctionKey.SettingManagement).then(response => {
        this.setState({policy: response});
      });
      document.title = LangHelper.getResource('SettingManagementv2');
  }

  componentWillUnmount(){
    this.props.resetState();
  }

  handleCloseInsertNewSetting = () =>{
      this.props.setOpenInsertNewSettingPopup({ show: false, settingName: '' });
  };

  handleSuccessInsertNewSetting = () =>{
      this.handleCloseInsertNewSetting();
      this.handleGetSettingType();
      this.props.setInsertNewSettingResult(null);
  };

  handleGetSettingType = () =>{
      this.props.getSettingTypes(this.props.gridParams);
  };

  handleCloseEdit = () =>{
      this.props.setOpenEdiPopup({ show: false, data: null });
  };

  handleSuccessEdit = () =>{
      this.handleCloseEdit();
      this.handleGetSettingType();
      this.props.setEditNewSettingResult(null);
  };

  handleCloseLicenseeMapping = () =>{
      this.props.setOpenLicenseeMappingPopup({ show: false});
  };

  handleSuccessUpdateLicenseeMapping = () =>{
      this.props.setEditLicenseeMappingResult(null);
  };

  handleCloseConfirmLicenseeMapping = () =>{
    this.props.setConfirmCancelPopup({ show: false, setting: '', settingId: 0});
  };


  handleEditStatus = () =>{
      const {settingId, isActive} = this.props.editStatusPopup;
      this.props.editStatusSetting({settingId, isActive}).then(data =>{
        this.handleCloseEditStatusPopup();
        if(data.isSuccessful){
          this.handleGetSettingType();
            if(isActive){
              toast.success(LangHelper.getResource('ActiveStatusSettingSuccess'));
            }else{
              toast.success(LangHelper.getResource('DeActiveStatusSettingSuccess'));
            }
        }else{
          toast.error(data.message);
        }
      });
  };

  handleCloseEditStatusPopup = () =>{
      this.props.setEditStatusPopup({ show: false });
  };

  render() {
    const {mainSettings, gridParams, editStatusPopup, insertNewSettingPopup, licenseeMappingPopup, editPopup} = this.props;
    if(!mainSettings || mainSettings === null || !this.state.policy){
      return null;
    }
    const isHost = this.state.policy === Policy.Host;
    return (
        <Fragment>
              <Filter isHost={isHost}/>
              <DataGrid isHost={isHost} />
              {
                insertNewSettingPopup.show &&
                <NewSettingValue
                    settingName={insertNewSettingPopup.settingName}
                    onClose={this.handleCloseInsertNewSetting}
                    onSuccess={this.handleSuccessInsertNewSetting}
                />
              }
              {
                editPopup.show &&
                <Edit
                    onClose={this.handleCloseEdit}
                    onSuccess={this.handleSuccessEdit}
                />
              }
              {
                licenseeMappingPopup.show &&
                <LicenseeMapping
                    onSuccess={this.handleSuccessUpdateLicenseeMapping}
                    onClose={this.handleCloseLicenseeMapping}
                    oncloseConfirm={this.handleCloseConfirmLicenseeMapping}
                />
              }
              {
                editStatusPopup.show &&
                <SweetModalDialog size="lg"
                    title={LangHelper.getResource('Confirmation')}
                    contents={
                        <div>Are you sure you want to <span>{this.props.editStatusPopup.isActive ? 'activate' : 'deactivate'}
                        </span> Setting <strong>{`${gridParams.settingName} ${this.props.editStatusPopup.settingValue}`}</strong>?</div>
                    }
                    buttons={[
                        <Button onClick={this.handleEditStatus} variant="primary" size="sm" >
                            {LangHelper.getResource('OK')}
                        </Button>,
                        <Button onClick={this.handleCloseEditStatusPopup} variant="primary" size="sm">
                            {LangHelper.getResource('Cancel')}
                        </Button>
                    ]}
                    onClose={this.handleCloseEditStatusPopup}
                />
              }
        </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
    const { mainSettings, gridParams, editStatusPopup, insertNewSettingPopup, insertNewValuePopup, licenseeMappingPopup, editPopup } = state;
    return { mainSettings, gridParams, editStatusPopup, insertNewSettingPopup, insertNewValuePopup, licenseeMappingPopup, editPopup };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);