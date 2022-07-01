import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Update from './Update';
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
      getPermission(FunctionKey.SettingRelationManagement).then(response => {
        this.setState({policy: response});
      });
  }
  componentWillUnmount(){
    this.props.resetState();
  }

  handleCloseUpdatePopup = () =>{
    this.props.setOpenUpdatePopup({ show: false, title: '', parentId: null });
    this.props.setMainSettingRelation(null);
  };
  
  render() {
    const {mainSettings, updatePopup, gridParams} = this.props;

    if(!mainSettings || mainSettings === null || !this.state.policy){
      return null;
    }

    const isHost = this.state.policy === Policy.Host;

    const subSettingOptions = mainSettings.filter(x=> x.settingName !== gridParams.settingName);
    return (
        <Fragment>
              <Filter />
              <DataGrid isHost={isHost}/>
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