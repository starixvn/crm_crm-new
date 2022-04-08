import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Update from './Update';

export class AppContainer extends Component {
  componentDidMount() {
      this.props.getMainSettings();
  }
  
  handleCloseUpdatePopup = () =>{
    this.props.setOpenUpdatePopup({ show: false, title: '', parentId: null});
    this.props.setMainSettingRelation(null);
  };
  
  render() {
    const {mainSettings, updatePopup, gridParams} = this.props;

    if(!mainSettings || mainSettings === null){
      return null;
    }

    const subSettingOptions = mainSettings.filter(x=> x.settingName !== gridParams.settingName);
    return (
        <Fragment>
              <Filter />
              <DataGrid/>
              {
                updatePopup.show &&
                <Update subSettingOptions={subSettingOptions} onClose={this.handleCloseUpdatePopup}/>
              }

        </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
    const { mainSettings, updatePopup, gridParams } = state;
    return { mainSettings, updatePopup, gridParams };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);