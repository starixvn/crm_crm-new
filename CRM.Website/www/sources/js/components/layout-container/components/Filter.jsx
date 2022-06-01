import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Form, Col, Row } from 'react-bootstrap';
import AutoComplete from '@jsroot/components/AutoComplete';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import Site from '@jsroot/common/site';

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
            window.location = Site.resolveClientUrl('Dashboard/Index');
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
        if(!currentMenu) {
            return null;
        }else if(currentMenu.parentId > 0){
            const parentNames = this.recursiveFindParentName(menus, currentMenu.parentId);
            breadcrumbsMenu = [...breadcrumbsMenu, ...parentNames, currentMenu.name];
        }else{
            breadcrumbsMenu = [...breadcrumbsMenu, currentMenu.name];
        }
        return (
            this.renderBreadcrumbsMenu(breadcrumbsMenu)
        );
    }

    renderBreadcrumbsMenu = breadcrumbsMenu =>{
        const isHome = breadcrumbsMenu[0].toLowerCase() === 'home';
        return (
            isHome ?
            this.renderHomeSubMenu() :
            <ul className='breadcrumbsMenu sub-menu list-inline list-unstyled'>
                <li><span className='icon-home touchable-element'/></li>
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

    renderHomeSubMenu = () =>{
        return (
            window.currentCustomer.hasCreateFeedbackPermission ?
            <ul className='breadcrumbsMenu sub-main-menu list-inline list-unstyled'>
                <li><span className='icon-home touchable-element'/></li>
                <li id="li-main" className='active'><a href={Site.resolveClientUrl('Dashboard/Index')}>{LangHelper.getResource('Main')}</a></li>
                <li id="li-communication-log">{LangHelper.getResource('CommunicationLog')}</li>
                <li id="li-special-remark">{LangHelper.getResource('SpecialRemark')}</li>
                <li id="li-redemption">{LangHelper.getResource('Redemption')}</li>
                <li id="li-activity-log">{LangHelper.getResource('ActivityLog')}</li>
            </ul> :
            <ul className='breadcrumbsMenu sub-main-menu list-inline list-unstyled'>
                <li><span className='icon-home touchable-element'/></li>
                <li id="li-main" className='active'><a href="#">{LangHelper.getResource('Main')}</a></li>
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