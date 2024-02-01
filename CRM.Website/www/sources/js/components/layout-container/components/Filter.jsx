import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Col, Row } from 'react-bootstrap';
import AutoComplete from '@jsroot/components/AutoComplete';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { SubMainMenu, DetailMenu, Policy, FunctionKey } from '@jsroot/common/constants';
import { toast } from 'react-toastify';
import BreadcrumbTime from './BreadcrumbTime';
import { getPermission } from '@jsroot/common/shareScripts';
export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remarksPolicy: null
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDownFunc, false);
        getPermission(FunctionKey.Remarks, true).then(response => {
            this.setState({ remarksPolicy: response });
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDownFunc, false);
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey) {
            const pathname = window.location.pathname;
            switch (event.key) {
                case 'm':
                    if (document.getElementById('li-main')) {
                        event.preventDefault();
                        this.isCheckActive(pathname, 0);
                        this.props.handleNavigate('Dashboard');
                    }
                    break;
                case 'd':
                    if (document.getElementById('li-detail')) {
                        event.preventDefault();
                        this.isCheckActive(pathname, 1);
                        this.props.handleNavigate('Detail');
                    }
                    break;
                case 'l':
                    if (document.getElementById('li-communication-log')) {
                        event.preventDefault();
                        this.isCheckActive(pathname, 2);
                        this.props.handleNavigate('Communication');
                    }
                    break;
                case 'k':
                    if (document.getElementById('li-special-remark')) {
                        event.preventDefault();
                        this.isCheckActive(pathname, 3);
                        this.props.handleNavigate('SpecialRemark');
                    }
                    break;
                case 'r':
                    if (document.getElementById('li-special-new-remark')) {
                        event.preventDefault();
                        this.isCheckActive(pathname, 4);
                        this.props.handleNavigate('Remark');
                    }
                    break;
                case 't':
                    if (document.getElementById('li-activity-log')) {
                        event.preventDefault();
                        this.isCheckActive(pathname, 6);
                        this.props.handleNavigate('ActionLog');
                    }
                    break;
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.props.username === '' || this.props.username === null) {
            toast.error(`${LangHelper.getResource('PleaseInputUsername')}`);
            return;
        }
        this.props.getDataGrid().then(() => {
            if (this.props.customerInfo) {
                const urlUpdateSuggestion = Site.resolveClientUrl('CustomerInfo/UpdateCustomerSuggestion');
                const paramsUpdateSuggestion = { CustID: this.props.customerInfo.custId, UserName: this.props.username };
                DataService.postDataAsync(urlUpdateSuggestion, paramsUpdateSuggestion);

                const hasReadFeedbackPermission = document.getElementById('hasReadFeedbackPermission').checked;
                const isReadRemark = this.state.remarksPolicy >= Policy.Read;
                const isHideMainMenu = this.props.customerInfo.customerType === 1 && !hasReadFeedbackPermission && !isReadRemark;
                let activeMenu = isHideMainMenu ? 'Detail' : 'Dashboard';
                this.props.handleNavigate(activeMenu);
            }
        });
    };

    renderRightContainer = () => {
        return (
            <div className='right-container'>
                <div sm="9" md="9" id="divSubMenu">
                    {this.renderSubmenu()}
                </div>
                {<BreadcrumbTime />}
            </div>
        );
    };

    getUrlPath = url => Site.resolveClientUrl(url.slice(1)).toLowerCase();

    renderSubmenu = () => {
        const pathname = window.location.pathname;
        const menus = this.handleConcatMenu(this.props.menus);
        const currentMenu = menus.filter(menu => this.getUrlPath(menu.url) === pathname.toLowerCase())[0];
        const isLefDetailMenu = DetailMenu.filter(x => this.getUrlPath(x.url).toLowerCase() === pathname.toLowerCase()).length > 0;
        const pathAnnouncement = {
            '/Announcement/NewAnnouncement': ['Headline Notification', 'Announcement', 'New Announcement'],
            '/Announcement/EditAnnouncement': ['Headline Notification', 'Announcement', 'Edit Announcement'],
            '/Announcement/CloneAnnouncement': ['Headline Notification', 'Announcement', 'Clone Announcement'],
        };
        const arrPathAnnouncement = Object.keys(pathAnnouncement);
        const selectPathAnnouncement = arrPathAnnouncement.find(x => x === pathname);

        if (isLefDetailMenu) {
            let title = DetailMenu.filter(x => this.getUrlPath(x.url).toLowerCase() === pathname.toLowerCase())[0].title;
            return this.renderDetailBreadcrumbsMenu(title);
        } else if (selectPathAnnouncement) {
            const path = pathAnnouncement[selectPathAnnouncement];
            return this.renderBreadcrumbsMenu(path, pathname);
        } else if (!currentMenu) {
            return this.renderBreadcrumbsMenu([], pathname);
        } else if (pathname === '/') {
            return null;
        } else {
            const breadcrumbsMenu = this.getBreadcrumbsMenu(currentMenu, menus);
            return this.renderBreadcrumbsMenu(breadcrumbsMenu, pathname);
        }
    };

    renderDetailBreadcrumbsMenu = pathname => {
        return (
            <ul className='breadcrumbsMenu sub-menu list-inline list-unstyled'>
                <li><a>{LangHelper.getResource(pathname)}</a></li>
            </ul>
        );
    };

    getBreadcrumbsMenu = (currentMenu, menus) => {
        let breadcrumbsMenu = [];
        if (currentMenu.parentId > 0) {
            const parentNames = this.recursiveFindParentName(menus, currentMenu.parentId);
            breadcrumbsMenu = [...breadcrumbsMenu, ...parentNames, currentMenu.name];
        } else {
            breadcrumbsMenu = [...breadcrumbsMenu, currentMenu.name];
        }
        return breadcrumbsMenu;
    };

    renderIconHome = () => <li><span className="fa fa-home icon-home fa-lg" onClick={() => this.props.handleNavigate('Dashboard')} /></li>;

    renderBreadcrumbsMenu = (breadcrumbsMenu, pathname) => {
        return (
                <ul className='breadcrumbsMenu sub-menu list-inline list-unstyled'>
                {breadcrumbsMenu.length !== 0 && this.renderIconHome()}
                    {
                        breadcrumbsMenu.map((item, key) =>
                            <li key={key}>{item}</li>
                        )
                    }
                </ul>
        );
    };

    isActiveTab = (pathname, index) => pathname.toLowerCase() === this.getUrlPath(SubMainMenu[index].url);

    isCheckActive = (pathname, index) => {
        if (this.isActiveTab(pathname, index)) {
            return 'active';
        }
        return '';
    };





    handleConcatMenu = menus => {
        let menusArr = [];
        menus.forEach(menu => {
            menusArr.push(menu);
            if (Array.isArray(menu.subMenus) && menu.subMenus.length > 0) {
                const subMenus = this.handleConcatMenu(menu.subMenus);
                menusArr = [...menusArr, ...subMenus];
            }
        });
        return menusArr;
    };

    recursiveFindParentName = (menus, parentId) => {
        let parentNames = [];
        const index = menus.findIndex(menu => menu.id === parentId);
        const menu = menus[index];
        parentNames.push(menu.name);
        if (index >= 0 && menu.parentId > 0) {
            const parent = this.recursiveFindParentName(menus, menu.parentId);
            parentNames.unshift(parent[0]);
        }
        return parentNames;
    };



    render() {
        const hasCustomerInfoPermission = document.getElementById('hasReadCustomerInfo').checked;

        if (!hasCustomerInfoPermission) {
            return null;
        }

        const { username, customerSuggestions, isGuest, handleChange, debounceUserNameInputChange, handleChangeSuggestion} = this.props;

        return (
            <div className='row-search'>
                <Form id="left-container" onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} className="align-items-center">
                        <Col sm="9" md="9" className="text-search">
                            <AutoComplete
                                value={username}
                                options={customerSuggestions}
                                placeholder='Phone or Username or Nickname'
                                onChange={value => handleChangeSuggestion(value)}
                                onInputChange={searchText => debounceUserNameInputChange(searchText)}
                            />
                            <input type="button" className="btn-search" onClick={this.handleSubmit} />
                            {
                                username != '' && username != null &&
                                <i className="fa fa-times icon-clear" onClick={value => handleChangeSuggestion('')}></i>
                            }
                        </Col>
                        <Col sm="3" md="3">
                            <Form.Check className="checked-guest" type="checkbox" name="isGuest" label={LangHelper.getResource('Guest')}
                                checked={isGuest}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Form>
                {this.renderRightContainer()}
            </div>
        );
    }
}