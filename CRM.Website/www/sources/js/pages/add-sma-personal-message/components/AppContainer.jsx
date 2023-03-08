import React, { Component, Fragment } from "react";
import Filter from './Filter';
import DataGrid from './DataGrid';
import CreateNewMessage from './CreateNewMessage';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { getPermission } from '@jsroot/common/shareScripts';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policy: null,
      gridParams: {
        pageIndex: 1,
        pageSize: 100
      },
      gridData: null,
      createMessagePopUp: {
        isShow: false
      },
      deleteMessagePopUp:{
        isShow: false
      }
    };
  }

  async componentDidMount() {
    getPermission(FunctionKey.PICManagement).then((response) => {
      this.setState({ policy: response });
    });

    await this.handleGetSMAPersonalMessage(this.state.params);
    document.title = LangHelper.getResource("AddSMAPersonalMessage");
  }

  handleGetSMAPersonalMessage = async params =>{
    Site.blockUI();
    const url = Site.resolveClientUrl('SMAPersonalMessage/GetGridData');
    await DataService.postDataAsync(url, params).then(response => {
        this.setState({gridData: response.data});
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
  }

  handleSetGridParams = params => this.setState({gridParams: params});

  handleOpenCreatePopup = () =>{
    this.setState({createMessagePopUp: {isShow: true}});
  }
  
  handleCloseNewMessage = () =>{
    this.setState({createMessagePopUp: {isShow: false}});
  }

  setDeletePopup = () =>{
    this.setState({deleteMessagePopUp: {isShow: true}});
  }


  render() {
    if(!this.state.policy){
      return null;
    }

    const {policy, createMessagePopUp, gridParams, gridData} = this.state;
    const isHost = policy === Policy.Host;
    return (
      <Fragment>
        <Filter 
            isHost={isHost}
            handleOpenCreatePopup={this.handleOpenCreatePopup}
        />
        <DataGrid 
            isHost={isHost}
            gridData={gridData}
            gridParams={gridParams}
            getGridData={this.handleGetSMAPersonalMessage}
            setGridParams={this.handleSetGridParams}
            setDeletePopup={this.setDeletePopup}
        />
        {
          createMessagePopUp.isShow &&
          <CreateNewMessage
              onClose={this.handleCloseNewMessage}
          />
        }
      </Fragment>
    );
  }
}

export default AppContainer;
