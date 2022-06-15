import React, { Component, lazy, Suspense  } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
const RemarkComponentPromise  = lazy(() => import('@jsroot/pages/remark/components/AppContainer'));
const ChatTypeMappingComponentPromise  = lazy(() => import('@jsroot/pages/notification-template/index'));

export class Header extends Component {
    constructor(props) {
        super(props);
    }

    isIgnoreMenu = item => !(item.subMenus.length === 0 && (item.url.includes('n/a') || item.url.length === 0));

    handleLogout = () =>{
        window.localStorage.clear();
        window.location = Site.resolveClientUrl('Auth/SignOut');
    }

    renderListMenu = (item, index) => {
        return (
            <li key={index + item.id} className='menu-item'>
                <div className='menu-title'>
                <a className='title' href={item.url !== '' ? Site.resolveClientUrl(item.url.slice(1)) : undefined}>{item.name}</a>
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
        const { menus, handleCollapseExpandLayout } = this.props;
        if (!menus || menus.length <= 0) {
            return null;
        }

    return (
        <Router>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route exact path="/" />
                <Route path="/about" element={<RemarkComponentPromise />} />
                <Route path="/dashboard" element={<ChatTypeMappingComponentPromise />} />
            </Routes>
          </Suspense>
      </Router>
    );
    }
}

export default Header;