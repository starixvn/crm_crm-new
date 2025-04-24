import React, { PureComponent } from 'react';
import {
    Link
} from 'react-router-dom';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';

export class Header extends PureComponent {
    isIgnoreMenu = item => !(item.subMenus.length === 0 && (item.url.includes('n/a') || item.url.length === 0));

    handleLogout = () => {
        window.localStorage.clear();
        window.location = Site.resolveClientUrl('Auth/LogOut');
    };

    renderListMenu = (item, index) => {
        const disabledLink = 'disabled-link';
        return (
            <li key={index + item.id} className='menu-item'>
                <div className='menu-title'>
                    <Link
                        to={item.url !== '' ? Site.resolveClientUrl(item.url.slice(1)) : ''}
                        state={item.url === '/Dashboard' ? this.props.currentCustomerInfo : this.props.currentCustomerInfo.custId}
                        className={`title ${item.url === '' ? disabledLink : ''}`}
                    >
                        {item.name}
                    </Link>
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
                                        <Link to={Site.resolveClientUrl(element.url.slice(1))}
                                            className={`title ${element.url === '' ? disabledLink : ''}`}>{element.name}
                                        </Link>
                                        {
                                            element.subMenus.length > 0 &&
                                            (
                                                <>
                                                    <span className='fa fa-caret-right icon pr-3 pt-1 float-right' />
                                                    <div className='layer-second'>
                                                        {
                                                            element.subMenus.map((ele, num) => (
                                                                <Link to={Site.resolveClientUrl(ele.url.slice(1))}
                                                                    className={`layer-first ${ele.url === '' ? disabledLink : ''}`}
                                                                    key={num}
                                                                >
                                                                    {ele.name}
                                                                </Link>
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
        const { menus, handleCollapseExpandLayout } = this.props;

        return (
            <div className='header'>
                <div className='left-header'>
                    <div className='logo-crm'
                        onClick={() => this.props.handleNavigate('Dashboard')}
                    />
                </div>
                <div className='right-header'>
                    <ul>
                        <span className='icon-bar'><i className="fa fa-bars" aria-hidden="true" onClick={handleCollapseExpandLayout} /></span>
                        {
                            menus.map((item, key) => (
                                this.isIgnoreMenu(item) && this.renderListMenu(item, key)
                            ))
                        }
                    </ul>
                    <div className='item-end float-right'>
                        <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-user.svg')} />
                        <span className='welcome'>{LangHelper.getResource('Welcome')} <span className='username'>{window.currentUsername}</span></span>
                        <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-logout.svg')} />
                        <a className='sign-out' onClick={() => this.handleLogout()}>{LangHelper.getResource('SignOut')}</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;