import React, { Component } from 'react';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';

import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menus: []
        };
    }

    async componentDidMount() {
        const url = Site.resolveClientUrl('Home/GettingUserMenu');
        await DataService.getDataAsync(url).then(response => {
            if (response.data) {
                this.initDataMenu(response.data);
            }
        }).catch(Site.handleAxiosError);
    }

    initDataMenu = menus => {
        const presentMenus = menus.filter(item => item.parent === null);
        presentMenus.sort((firstItem, secondItem) => firstItem.displayOrder - secondItem.displayOrder);
        presentMenus.forEach(item => item.subMenus = this.getSubMenus(item, menus));
        presentMenus.forEach(item => item.subMenus.forEach(element => element.subMenus = this.getSubMenus(element, menus)));

        this.setState({ menus: presentMenus });
    };

    getSubMenus = (menuItem, menus) => {
        const subMenus = menus.filter(item => item.parent !== null && item.parent.id === menuItem.id);
        subMenus.sort((firstItem, secondItem) => firstItem.displayOrder - secondItem.displayOrder);
        return subMenus;
    };

    isIgnoreMenu = item => !(item.subMenus.length === 0 && (item.url.includes('n/a') || item.url.length === 0));

    renderListMenu = (item, index) => {
        return (
            <li key={index + item.id} className='menu-item'>
                <div className='menu-title'>
                <Link to={item.url} className='title'>{item.name}</Link>
                    {
                        item.subMenus.length > 0 && <span className='fa fa-caret-down icon'></span>
                    }
                </div>
                {
                    item.subMenus.length > 0 &&
                    (
                        <div className='menu-sub'>
                            {
                                item.subMenus.map((element, key) => (
                                    <div key={key} className='layer-first'>
                                        <Link to={element.url} className='title'>{element.name}</Link>
                                        {
                                            element.subMenus.length > 0 &&
                                            (
                                                <>
                                                    <span className='fa fa-caret-right icon pr-3 pt-1 float-right'></span>
                                                    <div className='layer-second'>
                                                        {
                                                            element.subMenus.map((ele, num) => (
                                                                <Link key={num} to={ele.url} className='layer-first'>{ele.name}</Link>
                                                            ))
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </li>
        );
    };

    render() {
        const { menus } = this.state;
        if (menus.length <= 0) {
            return null;
        }

        return (
            <Router>
                <div className='header'>
                    <div className='left-header'>
                        <img src={Site.resolveClientUrl('www/dist/css/images/icon/logo-crm.png')} />
                        <span className='icon-bar'><i className="fa fa-bars" aria-hidden="true" /></span>
                    </div>
                    <div className='right-header'>
                        <ul>
                            {
                                menus.map((item, key) => (
                                    this.isIgnoreMenu(item) && this.renderListMenu(item, key)
                                ))
                            }
                        </ul>

                        <div className='item-end float-right'>
                            <img src={Site.resolveClientUrl('www/dist/css/images/icon/user.png')} />
                            <span className='welcome'>{LangHelper.getResource('Welcome')} <span className='username'>{this.props.username}</span></span>
                            <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-logout.png')} />
                            <span className='sign-out'>{LangHelper.getResource('SignOut')}</span>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Header;