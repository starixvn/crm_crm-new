import React, { Component } from 'react';
import Filter from './Filter';
import { ToastContainer, Slide } from 'react-toastify';
import Header from './Header';
import DataGrid from './DataGrid';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import WithNavigation from '../../WithNavigation';

class Layout extends Component {
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
            isShowingLeftPanel : true
        };
    }

    async componentDidMount() {
        await this.getSetting();
        this.initDataMenu(window.menus);
        this.getCurrentCustomer();
        const storage = window.localStorage;
        const isShowingLeftPanel = storage.getItem('isShowingLeftPanel');
        const isKeepLeftPanel = storage.getItem('isKeepLeftPanel');
        if(isKeepLeftPanel !== null){
            this.setState({isShowingLeftPanel: JSON.parse(isKeepLeftPanel)});
        }
        if(isShowingLeftPanel !== null){
            storage.removeItem('isShowingLeftPanel');
        }
    }

    getSetting = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetSettings');
        await DataService.getDataAsync(url).then(response => {
             this.setState({ settings: response.data});
        }).then(() => Site.unblockUI());
    };

    getCurrentCustomer = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetCurrentCustomer');
        await DataService.getDataAsync(url).then(response => {
            if(!response || !response.data) {return};
            this.setState({username: response.data.name, isGuest: response.data.isGuest} , () =>{
                this.getCustomerInfo();
            });
        }).then(() => Site.unblockUI());
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
        this.setState({editCustomerInfoPopup: {show: false}});
    };

    getDataGrid = async () =>{
        await this.getCustomerInfo();
        await this.getSetting();
        this.setState({isShowingLeftPanel: true}, () =>{
           this.handleSetStorage(this.state.isShowingLeftPanel);
        });
    };

    getCustomerInfo = async () => {
        const params = this.getParams();
        this.setState({gridParams: params});
        this.handleSetStorage(true);
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/GetCustomerInfo');
        await DataService.postDataAsync(url,params).then(response => {
            this.setState({customerInfo: response.data});
            if(response !== undefined && response.data !== null){
                const siteCredits = this.state.settings.sites.filter(site =>site.name === 'Credit');
                const isCreditSite = siteCredits.filter(x => x.childSites.some(y => this.state.customerInfo.siteId === y.id)).length > 0;
                this.setState({isCreditSite});
                if(this.props.location.pathname === '/'){
                    this.setState({isCreditSite}, () =>{
                        this.handleNavigateDashboard();
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
        }}).then(() => Site.unblockUI());
    };

    handleNavigateDashboard = () =>{
        const currentCustomer = this.getCurrentCustomerInfo();
        this.props.navigate(Site.resolveClientUrl('Dashboard'),
            {state: currentCustomer}
        );
    };

    getCurrentCustomerInfo = () =>{
        const {customerInfo, isGuest, username, isCreditSite } = this.state;
        const currentCustomer = {
            custId: customerInfo?.custId,
            isGuest: isGuest,
            username: username,
            isCreditSite: isCreditSite
        };
        return currentCustomer;
    };

    handleNavigate = name => this.props.navigate(Site.resolveClientUrl(name), {state: this.state.customerInfo?.custId});


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
                <div id={customerInfo !== null ? 'left-row-container' : 'left-row-hidden'}>
                {
                    customerInfo !== null && settings !== null &&
                    <DataGrid
                        customerInfo={customerInfo} settings = {settings} gridParams={gridParams} setGridParams={this.setGridParams} setUserName={this.setUserName}
                        getCustomerInfo={this.getCustomerInfo} handleCloseEditCustomerInfoPopup={this.handleCloseEditCustomerInfoPopup} handleNavigate = {this.handleNavigate}
                    />
                }
                </div>
                <div id='right-row-container' style={{width: customerInfo !== null ? '78%' : '100%'}}>
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
                <div id='left-row-container' style={{width:0}} />
                <div id='right-row-container' style={{width:'100%'}}>
                    <div id='child-app-container'>
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {customerInfo, isGuest, customerSuggestions, showEmptyConfirmPopup,
            username, showEmptyCustomerInfoPopup, menus, isShowingLeftPanel } = this.state;
        if(menus.length <= 0){
            return null;
        }

        const currentCustomerInfo = this.getCurrentCustomerInfo();

        return (
            <div>
                <div className='fix-header-menu'>
                    <Header menus={menus} currentCustomerInfo={currentCustomerInfo} handleNavigateDashboard={this.handleNavigateDashboard}
                        handleCollapseExpandLayout={this.handleCollapseExpandLayout}
                    />
                    <Filter
                        getDataGrid={this.getDataGrid} isGuest={isGuest} username={username} menus={menus} customerInfo={customerInfo}
                        customerSuggestions={customerSuggestions} handleChange={this.handleChange} handleChangeSuggestion ={this.handleChangeSuggestion}
                        showEmptyCustomerInfoPopup={showEmptyCustomerInfoPopup} 
                        handleCloseEmptyCustomerInfoPopup={this.handleCloseEmptyCustomerInfoPopup}
                        showEmptyConfirmPopup={showEmptyConfirmPopup} 
                        handleGetCustomerIsGuest={this.handleGetCustomerIsGuest} 
                        handleNavigateDashboard={this.handleNavigateDashboard}
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
            </div>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(Layout);
export default FunctionBarWithNavigation;