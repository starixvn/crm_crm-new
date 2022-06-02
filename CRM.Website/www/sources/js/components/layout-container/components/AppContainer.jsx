import React, { Component } from 'react';
import Filter from './Filter';
import PropTypes from 'prop-types';
import { ToastContainer, Slide } from 'react-toastify';
import Header from './Header';
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
            menus: [],
            username: !window.currentCustomer ? null : window.currentCustomer.name,
            isGuest: !window.currentCustomer ? false : window.currentCustomer.isGuest,
            customerInfo: window.customerInfo,
            settings: null,
            gridParams: {
                username: null,
                isGuest: false
            },
            showEmptyConfirmPopup: false,
            showEmptyCustomerInfoPopup: false,
            customerSuggestions: [],
            editCustomerInfoPopup: { show: false},
            isShowingLeftPanel: true
        };
    }

    async componentDidMount() {
        if(window.customerInfo !== null){
            await this.getSetting();
        }

        if(window.menus !== null){
            this.initDataMenu(window.menus);
        }

        const showingLeftPanel = window.localStorage.getItem('isShowingLeftPanel');
        if(showingLeftPanel !== null){
            window.localStorage.removeItem('isShowingLeftPanel');
        }
    }

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
    };

    getCustomerInfo = async () => {
        const params = this.getParams();
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
    };

    handleCollapseExpandLayout = event =>{
        event.preventDefault();
        if(!this.state.customerInfo){
            return;
        }
        this.setState(prevState => ({
            isShowingLeftPanel: !prevState.isShowingLeftPanel
        }), () =>{
            window.localStorage.setItem('isShowingLeftPanel', this.state.isShowingLeftPanel);
            window.dispatchEvent(new Event('resize'));
        });
    };

    renderLeftRightContent = customerInfo =>{
        const {settings, gridParams} = this.state;
        return (
            <div className="d-flex">
                <div id={customerInfo !== null ? 'left-row-container' : 'left-row-hidden'}>
                {
                    customerInfo !== null && settings !== null &&
                    <DataGrid 
                        customerInfo={customerInfo} settings = {settings} gridParams={gridParams} setGridParams={this.setGridParams}
                        getCustomerInfo={this.getCustomerInfo} handleCloseEditCustomerInfoPopup={this.handleCloseEditCustomerInfoPopup}
                    />
                }
                </div>
                <div id='right-row-container' style={{width: customerInfo !== null ? '78%' : '100%'}}>
                    <div className='child-app-container'>
                    {
                        this.props.children
                    }
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
                    <div className='child-app-container'>
                    {
                        this.props.children
                    }
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
        const { isHost } = this.props;
        return (
            <div>
                <Header menus={menus} handleCollapseExpandLayout={this.handleCollapseExpandLayout}/>
                <Filter
                    isHost={isHost} getDataGrid={this.getDataGrid} isGuest={isGuest} username={username} menus={menus} customerInfo={customerInfo}
                    customerSuggestions={customerSuggestions} handleChange={this.handleChange} handleChangeSuggestion ={this.handleChangeSuggestion}
                    showEmptyCustomerInfoPopup={showEmptyCustomerInfoPopup} handleCloseEmptyCustomerInfoPopup={this.handleCloseEmptyCustomerInfoPopup}
                    showEmptyConfirmPopup={showEmptyConfirmPopup} handleGetCustomerIsGuest={this.handleGetCustomerIsGuest}
                    handleCloseEmptyConfirm={this.handleCloseEmptyConfirm} debounceUserNameInputChange={this.debounceUserNameInputChange}
                />
                {
                    !showEmptyCustomerInfoPopup &&
                    <div>
                        {
                            isShowingLeftPanel ?
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