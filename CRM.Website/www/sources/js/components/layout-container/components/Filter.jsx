import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Form, Col, Row } from 'react-bootstrap';
import AutoComplete from '@jsroot/components/AutoComplete';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import Site from '@jsroot/common/site';
import { SubMainMenu }from '@jsroot/common/constants';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: []
        };
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.getDataGrid().then(()=>{
            if(this.props.customerInfo !== null){
                window.location = Site.resolveClientUrl('Dashboard');
            }
        });
    };

    renderRightContainer = () =>{
        return(
            <div className='right-container'>
                <div sm="9" md="9" id="divSubMenu">
                    {!window.currentCustomer ? null : this.renderSubmenu()}
                </div>
                <div sm="3" md="3">
                    <div className="pull-right timezone">
                        <span className="fa fa-clock-o fa-lg pr-2" aria-hidden="true" />
                        <span id="span-timezoneContainer">
                            {window.currentClientTime + LangHelper.getResource('Gmt8')}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    renderSubmenu = () =>{
        let breadcrumbsMenu = [];
        const pathname = window.location.pathname;
        const menus = this.handleConcatMenu(this.props.menus);
        const currentMenu = menus.filter(menu => menu.url.toLowerCase() === pathname.toLowerCase())[0];
        if(!currentMenu){
            return this.renderBreadcrumbsMenu(breadcrumbsMenu, pathname);
        }else{
            if(pathname === '/') {
                return null;
            }else if(currentMenu.parentId > 0){
                const parentNames = this.recursiveFindParentName(menus, currentMenu.parentId);
                breadcrumbsMenu = [...breadcrumbsMenu, ...parentNames, currentMenu.name];
            }else{
                breadcrumbsMenu = [...breadcrumbsMenu, currentMenu.name];
            }
            return (
                this.renderBreadcrumbsMenu(breadcrumbsMenu, pathname)
            );
        }
    }

    renderIconHome = () => <li><span className="fa fa-home icon-home fa-lg" onClick={() => window.location = Site.resolveClientUrl('Dashboard')}/></li>;

    renderBreadcrumbsMenu = (breadcrumbsMenu, pathname) =>{
        const isHome = breadcrumbsMenu.length > 0 && breadcrumbsMenu[0].toLowerCase() === 'home' 
                        || SubMainMenu.filter(x=> x.url.toLowerCase() === pathname.toLowerCase()).length > 0;
        return (
            isHome ?
            this.renderHomeSubMenu(pathname) :
            <ul className='breadcrumbsMenu sub-menu list-inline list-unstyled'>
                {this.renderIconHome(pathname)}
                {
                    breadcrumbsMenu.map((item, key) =>{
                        return (
                            <li key={key}>{item}</li>
                        );
                    })
                }
            </ul>
        );
    }

    isActiveTab = (pathname, index) => pathname.toLowerCase() === SubMainMenu[index].url.toLowerCase();

    renderHomeSubMenu = pathname =>{
        return (
            window.currentCustomer.hasCreateFeedbackPermission ?
            <ul className='breadcrumbsMenu sub-main-menu list-inline list-unstyled'>
                 {this.renderIconHome()}
                <li id="li-main" className={this.isActiveTab(pathname, 0) ? 'active' : ''}>
                    <a href={Site.resolveClientUrl('Dashboard')}>
                        {LangHelper.getResource('Main')}
                    </a>
                </li>
                <li id="li-main" className={this.isActiveTab(pathname, 1) ? 'active' : ''}>
                    <a href={Site.resolveClientUrl('CustomerInfoDetail')}>
                        {LangHelper.getResource('Detail')}
                    </a>
                </li>
                <li id="li-communication-log" className={this.isActiveTab(pathname, 2) ? 'active' : ''}>
                    <a href={Site.resolveClientUrl('CommunicationLog')}>
                        {LangHelper.getResource('CommunicationLog')}
                    </a>
                </li>
                <li id="li-special-remark" className={this.isActiveTab(pathname, 3) ? 'active' : ''}>
                    <a href={Site.resolveClientUrl('Remark')}>
                        {LangHelper.getResource('SpecialRemark')}
                    </a>
                </li>
                <li id="li-redemption" className={this.isActiveTab(pathname, 4) ? 'active' : ''}>
                    <a href={Site.resolveClientUrl('Redemption')}>
                        {LangHelper.getResource('Redemption')}
                    </a>
                </li>
                <li id="li-activity-log" className={this.isActiveTab(pathname, 5) ? 'active' : ''}>
                    <a href={Site.resolveClientUrl('ActionLog')}>
                        {LangHelper.getResource('ActivityLog')}
                    </a>
                </li>
            </ul> :
            <ul className='breadcrumbsMenu sub-main-menu list-inline list-unstyled'>
                 {this.renderIconHome()}
                <li id="li-main" className='active'><a href={Site.resolveClientUrl('Dashboard')}>{LangHelper.getResource('Main')}</a></li>
            </ul>
        );
    };

    handleMenuDashboardClick = event =>{
        event.preventDefault();
        window.location = Site.resolveClientUrl('Dashboard/Index');
    }

    handleConcatMenu = menus => {
        let menusArr = [];
        menus.forEach(menu => {
            menusArr.push(menu);
            if(Array.isArray(menu.subMenus) && menu.subMenus.length > 0){
               const subMenus = this.handleConcatMenu(menu.subMenus);
               menusArr = [...menusArr, ...subMenus];
            }
        });
        return menusArr;
    }

    recursiveFindParentName = (menus, parentId) =>{
        let parentNames = [];
        const index = menus.findIndex(menu => menu.id === parentId);
        const menu = menus[index];
        parentNames.push(menu.name);
        if(index >= 0 && menu.parentId > 0){
            const parent = this.recursiveFindParentName(menus, menu.parentId);
            parentNames = [...parentNames, parent[0]];
        }
        return parentNames;
    }

    render() {
        if(!this.props.menus || this.props.menus.length === 0) {
            return null;
        }
        
        const {username, customerSuggestions, isGuest, handleChange, showEmptyCustomerInfoPopup, debounceUserNameInputChange, handleChangeSuggestion,
            handleCloseEmptyCustomerInfoPopup, showEmptyConfirmPopup, handleGetCustomerIsGuest, handleCloseEmptyConfirm} = this.props;

        return (
            <div className='row-search'>
                <Form id="left-container" onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Col sm="9" md="9"  className="text-search">
                            <AutoComplete
                                value={username}
                                options={customerSuggestions}
                                placeholder='Phone or Username or Nickname'
                                onChange={value => handleChangeSuggestion(value)}
                                onInputChange={searchText => debounceUserNameInputChange(searchText)}
                            />
                            <input type="button" className="btn-search" onClick={this.handleSubmit}/>
                        </Col>
                        <Col sm="3" md="3">
                            <Form.Check className="checked-guest" type="checkbox"  name="isGuest" label={LangHelper.getResource('Guest')}
                                checked={isGuest}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Form>
                {this.renderRightContainer()}
                {
                    showEmptyCustomerInfoPopup &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            LangHelper.getResource('EmptyData')
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={handleCloseEmptyCustomerInfoPopup}>
                                {LangHelper.getResource('OK')}
                            </Button>
                        ]}
                        onClose={handleCloseEmptyCustomerInfoPopup}
                    />
                }
                {
                    showEmptyConfirmPopup &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>{LangHelper.getResource('ConfirmCustomerSearchGuest')}</div>
                        }
                        buttons={[
                            <Button size="sm" variant="primary" onClick={handleGetCustomerIsGuest}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button size="sm" variant="primary" onClick={handleCloseEmptyConfirm}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={handleCloseEmptyConfirm}
                    />
                }
            </div>
        );
    }
}