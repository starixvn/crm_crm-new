import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';

export class Header extends Component {
    constructor(props) {
        super(props);
    }

    isIgnoreMenu = item => !(item.subMenus.length === 0 && (item.url.includes('n/a') || item.url.length === 0));

    renderListMenu = (item, index) => {
        return (
            <li key={index + item.id} className='menu-item'>
                <div className='menu-title'>
                <a className='title' href={Site.resolveClientUrl(item.url.slice(1))}>{item.name}</a>
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
                                        <a className='title' href={Site.resolveClientUrl(element.url.slice(1))}>{element.name}</a>
                                        {
                                            element.subMenus.length > 0 &&
                                            (
                                                <>
                                                    <span className='fa fa-caret-right icon pr-3 pt-1 float-right' />
                                                    <div className='layer-second'>
                                                        {
                                                            element.subMenus.map((ele, num) => (
                                                                <a className='layer-first' key={num} href={Site.resolveClientUrl(ele.url.slice(1))}>{ele.name}</a>
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
        const { menus } = this.props;
        if (!menus || menus.length <= 0) {
            return null;
        }

        return (
            <div className='header'>
                <div className='left-header'>
                    <img src={Site.resolveClientUrl('css/images/icon/logo-crm.png')} onClick={() => window.location = Site.resolveClientUrl('Dashboard')}/>
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
                        <span className='fa fa-user fa-lg' />
                        <span className='welcome'>{LangHelper.getResource('Welcome')} <span className='username'>{window.currentUsername}</span></span>
                        <img src={Site.resolveClientUrl('css/images/icon/icon-logout.png')} />
                        <a className='sign-out' href={Site.resolveClientUrl('Auth/SignOut')}>{LangHelper.getResource('SignOut')}</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;