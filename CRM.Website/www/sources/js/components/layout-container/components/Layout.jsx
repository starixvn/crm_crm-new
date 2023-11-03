import React, { Component } from 'react';
import Filter from './Filter';
import { ToastContainer, Slide } from 'react-toastify';
import Header from './Header';
import DataGrid from './DataGrid';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import WithNavigation from '../../WithNavigation';
import ResponsiveComponent from './ResponsiveComponent';
import {CheckForIndexHTMLChange} from '../common.functions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            username: null,
            isGuest: false,
            isCreditSite: false,
            customerInfo: null,
            settings: null,
            gridParams: {
                username: null,
                isGuest: false
            },
            showEmptyConfirmPopup: false,
            showEmptyCustomerInfoPopup: false,
            customerSuggestions: [],
            editCustomerInfoPopup: { show: false},
            isShowingLeftPanel : false,
            isShowNewVersion: false,
            showErrorConfirmPopup: false
        };
    }

    async componentDidMount() {
        const hasReadCustomerInfo = document.getElementById('hasReadCustomerInfo').checked;
        if (hasReadCustomerInfo) {
            await this.getSetting();
            await this.getCurrentCustomer();
        }
        this.initDataMenu(window.menus);
        const storage = window.localStorage;
        const isShowingLeftPanel = storage.getItem('isShowingLeftPanel');
        const isKeepLeftPanel = storage.getItem('isKeepLeftPanel');
        if(isKeepLeftPanel !== null){
            this.setState({isShowingLeftPanel: JSON.parse(isKeepLeftPanel)});
        }
        if(isShowingLeftPanel !== null){
            storage.removeItem('isShowingLeftPanel');
        }
        setTimeout(this.handleCheckNewVersion, 60000);
        this.getMaxClientHeightLeft();
        window.addEventListener("resize", this.handleResize);
    }

    async componentDidUpdate(prevProps, prevState) {
        const updateLeftPanel = window.localStorage.getItem('updateLeftPanel');
        if(updateLeftPanel !== null){
            await this.getCurrentCustomer();
            window.localStorage.removeItem('updateLeftPanel');
        }

        if(prevProps.location.pathname !== this.props.location.pathname){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        const maxHeightLeft = this.getMaxHeightLeft();
        if(maxHeightLeft !== prevState.maxHeightLeft){
            this.setState({maxHeightLeft});
        }
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.handleResize);
    }

    getMaxClientHeightLeft = () =>{
        const headerHeight = document.getElementById('fix-header-menu')?.clientHeight;
        const maxHeightLeft = document.getElementById('crm-container')?.offsetHeight - headerHeight;
        this.setState({maxHeightLeft});
    }

    handleResize = () => {
        const maxHeightLeft = this.getMaxHeightLeft();
        this.setState({maxHeightLeft});
    };
    
    getMaxHeightLeft = () =>{
        const headerHeight = document.getElementById('fix-header-menu')?.clientHeight;
        const leftContentHeight = document.getElementById('left-form-container')?.clientHeight;
        const totalHeight = leftContentHeight + headerHeight;
        const containerHeight = document.getElementById('crm-container').offsetHeight;
        const actualMaxHeight = totalHeight > containerHeight ? containerHeight - headerHeight : containerHeight;
        return actualMaxHeight;
    }

    handleCheckNewVersion = async () =>{
        await CheckForIndexHTMLChange(Site.resolveClientUrl('')).then(response => {
            if(response) {
                this.setState({isShowNewVersion: true});
            }else{
                setTimeout(this.handleCheckNewVersion, 60000);
            }
        });
    }

    handleCloseConfirmNewVersion = () => {
        this.setState({isShowNewVersion: false});
        setTimeout(this.handleCheckNewVersion, 60000);
    }

    getSetting = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetSettings');
        await DataService.getDataAsync(url).then(response => {
            this.setState({ settings: response.data});
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    };

    getCurrentCustomer = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetCurrentCustomer');
        await DataService.getDataAsync(url).then(response => {
            if(!response || !response.data) {
                return;
            }
            this.setState({username: response.data.name, isGuest: response.data.isGuest} , () =>{
                this.getCustomerInfo();
            });
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
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
        }, () =>{
            this.handleCloseEmptyConfirm();
            const params = this.getParams();
            this.getDataGrid(params).then(() => this.handleNavigate('Dashboard'));
        });
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
    };

    handleCloseEmptyConfirm = () => {
        this.setState({ showEmptyConfirmPopup: false });
    };

    handleCloseEmptyCustomerInfoPopup = () => {
        this.setState({ showEmptyCustomerInfoPopup: false });
    };

    handleCloseErrorPopup = () => {
        this.setState({ showErrorConfirmPopup: false });
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
                    if(!response || !response.data){
                        return;
                    }
                    this.setState({customerSuggestions: response.data});
                }).catch(Site.handleAxiosError);
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
        this.setState({isShowingLeftPanel: true}, () =>{
           this.handleSetStorage(this.state.isShowingLeftPanel);
        });
    };

    handleSearchUplineInfo = username =>{
        this.setState({username}, () =>{
            this.getCustomerInfo().then(() => this.handleNavigate('Dashboard'));
        });
    };

    getCustomerInfo = async () => {
        const params = this.getParams();
        this.setState({gridParams: params});
        this.handleSetStorage(true);
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetCustomerInfo');
        await DataService.postDataAsync(url,params).then(response => {
            this.handleCheckCustomerInfo(response);
            window.dispatchEvent(new Event('resize'));
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    };

    handleCheckCustomerInfo = response =>{
        if(response?.data?.errCode > 0 && response?.data?.errMsg?.length > 0) {
            this.setState({
                showErrorConfirmPopup: true
            });
        }else{
            if(response !== undefined && response.data !== null){
                this.setState({ customerInfo: response.data });
                
                const isCreditSite = response.data.customerType === 1;
                this.setState({isCreditSite});
                if(this.props.location.pathname === '/'){
                    this.setState({isCreditSite}, () =>{
                        this.handleNavigate('Dashboard');
                    });
                }
            }else if (response.data === null && !this.state.isGuest) {
                this.setState({
                    showEmptyConfirmPopup: true
                });
            }else if(response.data === null) {
                this.setState({
                showEmptyCustomerInfoPopup: true
                });
            }
        }
    }

    getCurrentCustomerInfo = () =>{
        const {customerInfo, isGuest, isCreditSite } = this.state;
        const currentCustomer = {
            custId: customerInfo?.custId,
            isGuest: isGuest,
            username: customerInfo?.username,
            isCreditSite: isCreditSite,
            customerInfo: customerInfo
        };
        return currentCustomer;
    };

    handleNavigate = name => this.props.navigate(Site.resolveClientUrl(name), {state: this.getCurrentCustomerInfo()});

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
    };

    renderLeftRightContent = customerInfo =>{
        const {settings, gridParams} = this.state;

        return (
            <div className="d-flex">
                <div style={{maxHeight: `${this.state.maxHeightLeft}px`}} id={customerInfo !== null ? 'left-row-container' : 'left-row-hidden'} tabIndex="1" className="slide-bar">
                {
                    customerInfo !== null && settings !== null &&
                    <DataGrid
                        customerInfo={customerInfo} settings={settings} gridParams={gridParams} setGridParams={this.setGridParams}
                        handleSearchUplineInfo={this.handleSearchUplineInfo} getCustomerInfo={this.getCustomerInfo}
                        handleCloseEditCustomerInfoPopup={this.handleCloseEditCustomerInfoPopup} handleNavigate={this.handleNavigate}
                    />
                }
                </div>
                <div id='right-row-container' tabIndex="2" style={{width: customerInfo !== null ? '81%' : '100%'}} className='main-content'>
                    <div id='child-app-container'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    };

    renderFullWidthContent = () =>{
        return (
            <div> 
                <div id='left-row-container' style={{width:0}} tabIndex="1"/>
                <div id='right-row-container' style={{width:'100%'}} tabIndex="2" className='main-content'>
                    <div id='child-app-container'>
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {customerInfo, isGuest, customerSuggestions, showEmptyConfirmPopup, showErrorConfirmPopup,
            username, showEmptyCustomerInfoPopup, menus, isShowingLeftPanel } = this.state;

        const currentCustomerInfo = this.getCurrentCustomerInfo();
        const hasReadCustomerInfo = document.getElementById('hasReadCustomerInfo').checked;

        return (
            <div>
                <div id='fix-header-menu'>
                    <Header menus={menus} currentCustomerInfo={currentCustomerInfo} handleNavigate={this.handleNavigate}
                        handleCollapseExpandLayout={this.handleCollapseExpandLayout}
                    />
                    {
                        hasReadCustomerInfo &&
                        <Filter
                            getDataGrid={this.getDataGrid} isGuest={isGuest} username={username} menus={menus} customerInfo={customerInfo}
                            customerSuggestions={customerSuggestions} handleChange={this.handleChange} handleChangeSuggestion={this.handleChangeSuggestion}
                            showEmptyCustomerInfoPopup={showEmptyCustomerInfoPopup} showEmptyConfirmPopup={showEmptyConfirmPopup}
                            handleCloseEmptyCustomerInfoPopup={this.handleCloseEmptyCustomerInfoPopup} isCreditSite={this.state.isCreditSite}
                            handleGetCustomerIsGuest={this.handleGetCustomerIsGuest} handleNavigate={this.handleNavigate}
                            handleCloseEmptyConfirm={this.handleCloseEmptyConfirm} debounceUserNameInputChange={this.debounceUserNameInputChange}
                        />
                    }
                </div>
                {
                    showErrorConfirmPopup &&
                    <SweetModalDialog size="sm"
                        title={LangHelper.getResource('SearchAccount')}
                        contents={
                            <div>{LangHelper.getResource('AuthorizedSearchAccount')}</div>
                        }
                        buttons={[
                            <Button size="sm" variant="primary" onClick={this.handleCloseErrorPopup}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                        ]}
                        onClose={this.handleCloseErrorPopup}
                    />
                }
                {
                    !showEmptyCustomerInfoPopup &&
                    <div className='row-content'>
                        <ResponsiveComponent isShowingLeftPanel={isShowingLeftPanel}>
                            {
                                isShowingLeftPanel && customerInfo !== null ?
                                this.renderLeftRightContent(customerInfo) :
                                this.renderFullWidthContent()
                            }
                        </ResponsiveComponent>
                    </div>
                }
                {
                    this.state.isShowNewVersion &&
                    <SweetModalDialog size="lg"
                        title="Confirm Update Version"
                        contents={<div>New version has released, please press OK to get latest!</div>}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={() => window.location.reload(true)}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirmNewVersion}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseConfirmNewVersion}
                    />
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

const LayoutNavigation = WithNavigation(Layout);
export default LayoutNavigation;