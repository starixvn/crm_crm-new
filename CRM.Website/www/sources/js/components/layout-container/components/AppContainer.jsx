import React, { Component } from 'react';
import Filter from './Filter';
import PropTypes from 'prop-types';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Button } from 'react-bootstrap';
import { ToastContainer, Slide } from 'react-toastify';
import Header from '@jsroot/components/Header';
import DataGrid from './DataGrid';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';

export default class AppContainer extends Component {
    static propTypes = {
        editCustomerInfoPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        isHost: PropTypes.bool.isRequired
    };

    static defaultProps = {
        editCustomerInfoPopup: { show: false },
        isHost: false
    };
    constructor(props) {
        super(props);
        this.state = {
            username: window.customerInfo !== null ? window.customerInfo.username : null,
            isGuest: window.customerInfo !== null ? window.customerInfo.isGuest : false,
            customerInfo: null,
            settings: null,
            gridParams: {
                username: null,
                isGuest: false
            },
            showEmptyConfirmPopup: false,
            showEmptyCustomerInfoPopup: false,
            customerSuggestions: []
        };
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleGetCustomerIsGuest = () => {
        this.setState({
            isGuest: true
        });
        this.handleCloseEmptyConfirm();
        const params = this.getParams();
        this.getDataGrid(params);
    };

    getParams = () => {
        return {
            username: this.state.username,
            isGuest: this.state.isGuest
        };
    };

    handleCloseEmptyConfirm = () => {
        this.setState({ showEmptyConfirmPopup: false });
    };

    handleCloseEmptyCustomerInfoPopup = () => {
        this.setState({ showEmptyCustomerInfoPopup: false });
    };

    handleChangeSuggestion = value => {
        this.setState({
            username: value
        });
    };

    debounceUserNameInputChange = Site.debounce(searchText => {
        this.setState({
            username: searchText
        }, async () => {
            if (searchText.length >= 2) {
                const params = this.getParams();
                const url = Site.resolveClientUrl('CustomerInfo/GetCustomerAutoSuggestion');
                await DataService.postDataAsync(url,params).then(response => {
                    this.setState({customerSuggestions: response.data});
                });
            } else {
                this.setState({customerSuggestions: []});
            }
        });
    });

    handleCloseEditCustomerInfoPopup = () => {
        this.props.setEditCustomerInfoPopup({ show: false });
    };

    getDataGrid = async () =>{
        const params = this.getParams();
        await this.getCustomerInfo(params);
        await this.getSetting();
    }

    getCustomerInfo = async params => {
        this.setState({gridParams: params});
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetCustomerInfo');
        await DataService.postDataAsync(url,params).then(response => {
            this.setState({customerInfo: response.data});
            if (response.data === null && !this.state.isGuest) {
                this.setState({
                    showEmptyConfirmPopup: true
                });
            }else if(response.data === null) {
                this.setState({
                    showEmptyCustomerInfoPopup: true
            });
        }}).then(() => Site.unblockUI());
    };

    getSetting = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetSettings');
        await DataService.getDataAsync(url).then(response => {
             this.setState({ settings: response.data});
        }).then(() => Site.unblockUI());
    }

    render() {
        const { isHost, editCustomerInfoPopup } = this.props;
        const {customerInfo, settings, isGuest, customerSuggestions, showEmptyConfirmPopup, username} = this.state;
        return (
            <div>
                <Header />
                <Filter
                    isHost={isHost} getDataGrid={this.getDataGrid} isGuest={isGuest} username={username}
                    customerSuggestions={customerSuggestions} handleChange={this.handleChange} handleChangeSuggestion ={this.handleChangeSuggestion}
                    showEmptyCustomerInfoPopup={this.showEmptyCustomerInfoPopup} handleCloseEmptyCustomerInfoPopup={this.handleCloseEmptyCustomerInfoPopup}
                    showEmptyConfirmPopup={showEmptyConfirmPopup} handleGetCustomerIsGuest={this.handleGetCustomerIsGuest}
                    handleCloseEmptyConfirm={this.handleCloseEmptyConfirm} debounceUserNameInputChange={this.debounceUserNameInputChange}
                />
                {
                    editCustomerInfoPopup.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>{LangHelper.getResource('EditCustomerInfoSuccessfully')}</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleCloseEditCustomerInfoPopup}>
                                {LangHelper.getResource('OK')}
                            </Button>
                        ]}
                        onClose={this.handleCloseEditCustomerInfoPopup}
                    />
                }
                {
                    <div className="d-flex">
                        <div id={customerInfo !== null ? 'left-row-container' : 'left-row-hidden'}>
                        {
                            customerInfo !== null && settings !== null &&
                            <DataGrid customerInfo={customerInfo} settings = {this.state.settings} getCustomerInfo={this.getCustomerInfo}/>
                        }
                        </div>
                        <div id='right-row-container' style={{width: customerInfo !== null ? '78%' : '100%'}}>
                            {
                                this.props.children
                            }
                        </div>
                    </div>
                }
                
                <ToastContainer
                    limit={1}
                    position='top-center'
                    autoClose={3000}
                    hideProgressBar={false}
                    transition={Slide}
                    closeOnClick={false}
                    pauseOnHover
                    draggable={false}
                />
            </div>
        );
    }
}