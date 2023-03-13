import React, { Component, Fragment } from "react";
import Filter from './Filter';
import DataGrid from './DataGrid';
import CreateNewMessage from './CreateNewMessage';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { getPermission } from '@jsroot/common/shareScripts';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import LangHelper from '@jsroot/common/langHelper';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';

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
        isShow: false,
        id: null
      }
    };
  }

  async componentDidMount() {
    getPermission(FunctionKey.SMAPersonalMessage).then((response) => {
      this.setState({ policy: response });
    });

    await this.handleGetSMAPersonalMessage(this.state.gridParams);
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

  handleSuccessNewMessage = async () =>{
    this.handleCloseNewMessage();
    await this.handleGetSMAPersonalMessage(this.state.gridParams);
  }

  setDeletePopup = id =>{
    this.setState({deleteMessagePopUp: {isShow: true, id}});
  }

  handleCloseDeletePopup = () =>{
    this.setState({deleteMessagePopUp: {isShow: false, id: null}});
  }

  handleDelete = async () => {
    const url = Site.resolveClientUrl(`SMAPersonalMessage/Delete/${this.state.deleteMessagePopUp.id}`);
    await DataService.postDataAsync(url).then(response => {
      if(response.data.isSuccessful) {
          toast.success(LangHelper.getResource('DeleteSMAPersonalMessageSuccessfully'));
          this.handleGetSMAPersonalMessage(this.state.gridParams);
      } else {
          toast.error(response.data.message);
      }
      this.handleCloseDeletePopup();
    }).catch(Site.handleAxiosError);
};


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
              isHost={isHost}
              onClose={this.handleCloseNewMessage}
              onSuccess={this.handleSuccessNewMessage}
          />
        }
        {
            this.state.deleteMessagePopUp.isShow &&
            <SweetModalDialog size='md'
                title={LangHelper.getResource('Confirmation')}
                contents={
                    <div>Are you sure you want to delete this message <strong>{this.state.deleteMessagePopUp.id}</strong>? This action is permanent and cannot be undone.</div>
                }
                buttons={[
                    <Button variant="primary" size="sm" onClick={this.handleDelete}>
                        {LangHelper.getResource('OK')}
                    </Button>,
                    <Button variant="primary" size="sm" onClick={this.handleCloseDeletePopup}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                ]}
                onClose={this.handleCloseDeletePopup}
            />
        }
      </Fragment>
    );
  }
}

export default AppContainer;
