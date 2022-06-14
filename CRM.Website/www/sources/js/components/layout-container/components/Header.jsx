import React, { Component, lazy  } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import loadable from '@loadable/component';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import Home from './Home';
//const Home =  import(/* webpackPrefetch: true */ './Home');

// const LoadableComponent = React.lazy(() =>
//   import("@jsroot/pages/remark/components/AppContainer").then(
//     module => ({
//       default: module.Test
//     })
//   )
// );
//import Test1 from '@jsroot/pages/remark/components/AppContainer';

// const LoadableComponent = loadable(() => import('@jsroot/pages/remark/components/AppContainer'));
//const TestComponent = loadable(() => import('@jsroot/pages/chat-type-mapping/components/AppContainer'));
// import AppContainer from '@jsroot/pages/remark/components/AppContainer';
// import AppContainer1 from '@jsroot/pages/chat-type-mapping/components/AppContainer';

// const Topics = lazy(() => import('@jsroot/pages/chat-type-mapping'));
// const Settings = lazy(() => import('@jsroot/pages/chat-type-mapping'));

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
        <Home />
    );
    }
}

export default Header;