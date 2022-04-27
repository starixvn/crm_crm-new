import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
  componentDidMount() {
      this.props.getMainSettings();
  }
  
  // handleCloseUpdatePopup = () =>{
  //   this.props.setOpenUpdatePopup({ show: false, title: '', parentId: null });
  //   this.props.setMainSettingRelation(null);
  // };

  handleCloseEditStatusPopup = () =>{
      this.props.setEditStatusPopup({ show: false });
  }

  handleEditStatus = () =>{
    const {settingId, isActive} = this.props.editStatusPopup;
    this.props.editStatusSetting({settingId, isActive}).then(data =>{
      this.handleCloseEditStatusPopup();
      if(data.isSuccessful){
          this.props.getSettingTypes(this.props.gridParams);
          if(isActive){
            toast.success(LangHelper.getResource('ActiveStatusSettingSuccess'));
          }else{
            toast.success(LangHelper.getResource('DeActiveStatusSettingSuccess'));
          }
      }else{
        toast.error(data.message);
      }
    });
  }
  
  render() {
    const {isHost, mainSettings, gridParams, insertNewSettingPopup, insertNewValuePopup, licenseeMappingPopup} = this.props;

    if(!mainSettings || mainSettings === null){
      return null;
    }

    //const subSettingOptions = mainSettings.filter(x=> x.settingName !== gridParams.settingName);
    return (
        <Fragment>
              <Filter />
              <DataGrid isHost={isHost} />
              {
                    this.props.editStatusPopup.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>Are you sure you want to <span>{this.props.editStatusPopup.isActive ? 'deactivate' : 'activate'}
                            </span> Setting <strong>{gridParams.settingName + ' ' + this.props.editStatusPopup.settingValue}</strong>?</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleEditStatus}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseEditStatusPopup}>
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
    const { mainSettings, gridParams, editStatusPopup, insertNewSettingPopup, insertNewValuePopup, licenseeMappingPopup } = state;
    return { mainSettings, gridParams, editStatusPopup, insertNewSettingPopup, insertNewValuePopup, licenseeMappingPopup };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);