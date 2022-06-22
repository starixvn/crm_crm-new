import React, { Component, lazy, Suspense  } from "react";
import Filter from './Filter';
import { ToastContainer, Slide } from 'react-toastify';
import Header from './Header';
import DataGrid from './DataGrid';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const NotificationListComponent  = lazy(() => import('@jsroot/pages/notification-list/index'));
const NotificationTemplateComponent = lazy(() => import('@jsroot/pages/notification-template/index'));
const NotificationTypeComponent = lazy(() => import('@jsroot/pages/notification-type/index'));
const DashboardComponent = lazy(() => import('@jsroot/pages/dashboard/index'));

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            username: null,
            isGuest: false,
            customerInfo: null,
            settings: null,
            gridParams: {
                username: null,
                isGuest: false
            },
            sessionData: {
                currentUsername: '',
                currentClientTime: new Date(),
                clientTimezone: 0,
                serverTimezone: 0,
                hasCreateFeedbackPermission: false
            },
            showEmptyConfirmPopup: false,
            showEmptyCustomerInfoPopup: false,
            customerSuggestions: [],
            editCustomerInfoPopup: { show: false},
            isShowingLeftPanel : true
        };
    }

    async componentDidMount() {
        const storage = window.localStorage;
        this.getInitInfo();

        const isShowingLeftPanel = storage.getItem('isShowingLeftPanel');
        const isKeepLeftPanel = storage.getItem('isKeepLeftPanel');
        if(isKeepLeftPanel !== null){
            this.setState({isShowingLeftPanel: JSON.parse(isKeepLeftPanel)});
        }
        if(isShowingLeftPanel !== null){
            storage.removeItem('isShowingLeftPanel');
        }
        this.getAntiForgeryToken();
    }

    getInitInfo = async () =>{
        await this.getSetting();
        await this.getSessionData();
        await this.getCurrentCustomer();
    }

    getAntiForgeryToken = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('Antiforgery/GenerateAntiForgeryTokens');
        await DataService.getDataAsync(url).then(response => {
            document.getElementById('xsrfToken').value = response.data.requestToken;
        }).then(() => Site.unblockUI());
    };

    getSetting = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetSettings');
        await DataService.getDataAsync(url).then(response => {
             this.setState({ settings: response.data});
        }).then(() => Site.unblockUI());
    };

    getSessionData = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('Home/GetSessionData');
        await DataService.getDataAsync(url).then(response => {
            if(response || response !== null){
                const data = response.data;
                this.setDataToElementId(data);
                this.setState(state => ({
                    sessionData: {
                        ...state.sessionData,
                        currentUsername: data.currentUsername,
                        currentClientTime: data.currentClientTime,
                        clientTimezone: data.clientTimezone,
                        serverTimezone: data.clientTimezone,
                        hasCreateFeedbackPermission: data.hasCreateFeedbackPermission
                    }
                }));
                this.initDataMenu(data.menus);
            }
        }).then(() => Site.unblockUI());
    };

    setDataToElementId = data =>{
        document.getElementById('currentUsername').value = data.currentUsername;
        document.getElementById('currentClientTime').value = data.currentClientTime;
        document.getElementById('serverTimezone').value = data.serverTimezone;
        document.getElementById('hasCreateFeedbackPermission').value = data.hasCreateFeedbackPermission;
    }

    getCurrentCustomer = async () =>{
        const url = Site.resolveClientUrl('CustomerInfo/GetCurrentCustomerInfo');
        await DataService.getDataAsync(url).then(response => {
            const data = response.data;
            if(data !== undefined && data !== null){
                this.setState({username: data.name, isGuest: data.isGuest} , () =>{
                    this.getCustomerInfo();
                });
            }
        });
    };

    initDataMenu = menus => {
        const presentMenus = menus.filter(item => item.parentName === '');
        presentMenus.sort((firstItem, secondItem) => firstItem.displayOrder - secondItem.displayOrder);
        presentMenus.forEach(item => item.subMenus = this.getSubMenus(item, menus));
        presentMenus.forEach(item => item.subMenus.forEach(element => element.subMenus = this.getSubMenus(element, menus)));

        this.setState({ menus: presentMenus });
    };

    getSubMenus = (menuItem, menus) => {
        const subMenus = menus.filter(item => item.parentName !== '' && item.parentId === menuItem.id);
        subMenus.sort((firstItem, secondItem) => firstItem.displayOrder - secondItem.displayOrder);
        return subMenus;
    };

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

    setGridParams = gridParams =>{
        this.setState({gridParams});
    };
    
    setUserName = username =>{
        this.setState({username});
    }

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
                await DataService.postDataAsync(url,params, this.state.antiToken).then(response => {
                    this.setState({customerSuggestions: response.data});
                });
            } else {
                this.setState({customerSuggestions: []});
            }
        });
    });

    handleCloseEditCustomerInfoPopup = () => {
        this.setState({editCustomerInfoPopup: {show: false}});
    };

    getDataGrid = async () =>{
        await this.getCustomerInfo();
        await this.getSetting();
    };

    getCustomerInfo = async () => {
        const params = this.getParams();
        this.setState({gridParams: params});
        this.handleSetStorage(true);
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetCustomerInfo');
        await DataService.postDataAsync(url,params, this.state.antiToken).then(response => {
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

    handleCollapseExpandLayout = event =>{
        event.preventDefault();
        if(!this.state.customerInfo){
            return;
        }
        this.setState(prevState => ({
            isShowingLeftPanel: !prevState.isShowingLeftPanel
        }), () =>{
           this.handleSetStorage(this.state.isShowingLeftPanel);
           window.dispatchEvent(new Event('resize'));
        });
    };

    handleSetStorage = isShowLeft =>{
        window.localStorage.setItem('isShowingLeftPanel', isShowLeft);
        window.localStorage.setItem('isKeepLeftPanel', isShowLeft);
    }

    renderMenuComponent = () =>{
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route exact path="/" />
                    <Route path="/NotificationList" element={<NotificationListComponent />} />
                    <Route path="/NotificationTemplate" element={<NotificationTemplateComponent />} />
                    <Route path="/NotificationType" element={<NotificationTypeComponent />} />
                    <Route path="/Dashboard" element={<DashboardComponent custId={this.state.customerInfo?.custId}/>} />
                </Routes>
            </Suspense>
        );
    }

    renderLeftRightContent = customerInfo =>{
        const {settings, gridParams} = this.state;
        return (
            <div className="d-flex">
                <div id={customerInfo !== null ? 'left-row-container' : 'left-row-hidden'}>
                {
                    customerInfo !== null && settings !== null &&
                    <DataGrid 
                        customerInfo={customerInfo} settings = {settings} gridParams={gridParams} setGridParams={this.setGridParams} setUserName={this.setUserName}
                        getCustomerInfo={this.getCustomerInfo} handleCloseEditCustomerInfoPopup={this.handleCloseEditCustomerInfoPopup}
                    />
                }
                </div>
                <div id='right-row-container' style={{width: customerInfo !== null ? '78%' : '100%'}}>
                    <div id='child-app-container'>
                        {this.renderMenuComponent()}
                    </div>
                </div>
            </div>
        );
    };

    renderFullWidthContent = () =>{
        return (
            <div>
                <div id='left-row-container' style={{width:0}} />
                <div id='right-row-container' style={{width:'100%'}}>
                    <div id='child-app-container'>
                    {this.renderMenuComponent()}
                    </div>
                </div> 
            </div>
        );
    }

    render() {
        const {customerInfo, isGuest, customerSuggestions, showEmptyConfirmPopup,
            username, showEmptyCustomerInfoPopup, menus, isShowingLeftPanel } = this.state;
        if(menus.length <=0){
            return null;
        }
        const hasCreateFeedbackPermission = this.state.sessionData.hasCreateFeedbackPermission;
        return (
            <div>
                <Router>
                    <div className='fix-header-menu'>
                        <Header menus={menus} handleCollapseExpandLayout={this.handleCollapseExpandLayout}/>
                        <Filter
                            isHost={hasCreateFeedbackPermission} getDataGrid={this.getDataGrid} isGuest={isGuest} username={username} menus={menus} customerInfo={customerInfo}
                            customerSuggestions={customerSuggestions} handleChange={this.handleChange} handleChangeSuggestion ={this.handleChangeSuggestion}
                            showEmptyCustomerInfoPopup={showEmptyCustomerInfoPopup} handleCloseEmptyCustomerInfoPopup={this.handleCloseEmptyCustomerInfoPopup}
                            showEmptyConfirmPopup={showEmptyConfirmPopup} handleGetCustomerIsGuest={this.handleGetCustomerIsGuest}
                            handleCloseEmptyConfirm={this.handleCloseEmptyConfirm} debounceUserNameInputChange={this.debounceUserNameInputChange}
                        />
                    </div>
                    {
                        !showEmptyCustomerInfoPopup &&
                        <div className='row-content'>
                            {
                                isShowingLeftPanel && customerInfo !== null ?
                                this.renderLeftRightContent(customerInfo) :
                                this.renderFullWidthContent()
                            }
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
                </Router>
            </div>
        );
    }
}