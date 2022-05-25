import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';

const location = window.location.origin;

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menus: []
        };
    }

    componentDidMount() {
        if(window.menus !== null){
            this.initDataMenu(window.menus);
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

    isIgnoreMenu = item => !(item.subMenus.length === 0 && (item.url.includes('n/a') || item.url.length === 0));

    renderListMenu = (item, index) => {
        return (
            <li key={index + item.id} className='menu-item'>
                <div className='menu-title'>
                <a className='title' href={ location + item.url}>{item.name}</a>
                    {
                        item.subMenus.length > 0 && <span className='fa fa-caret-down icon' />
                    }
                </div>
                {
                    item.subMenus.length > 0 &&
                    (
                        <div className='menu-sub'>
                            {
                                item.subMenus.map((element, key) => (
                                    <div key={key} className='layer-first'>
                                        <a className='title' href={location + element.url}>{element.name}</a>
                                        {
                                            element.subMenus.length > 0 &&
                                            (
                                                <>
                                                    <span className='fa fa-caret-right icon pr-3 pt-1 float-right' />
                                                    <div className='layer-second'>
                                                        {
                                                            element.subMenus.map((ele, num) => (
                                                                <a className='layer-first' key={num} href={location + ele.url}>{ele.name}</a>
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
            <div className='header'>
                <div className='left-header'>
                    <img src='../../css/images/icon/logo-crm.png' />
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
                        <img src='../../css/images/icon/user.png' />
                        <span className='welcome'>{LangHelper.getResource('Welcome')} <span className='username'>{window.currentUsername}</span></span>
                        <img src='../../css/images/icon/icon-logout.png' />
                        <a className='sign-out' href={location + '/Auth/SignOut'}>{LangHelper.getResource('SignOut')}</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;