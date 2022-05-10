import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

export class Header extends Component {

    switchRoute = () => {
        return (
            <Routes>
                <Route exact path="/"></Route>
                <Route path="/DynamicReport"></Route>
            </Routes>
        );
    };

    render() {
        return (
            <Router>
                <div className='header'>
                    <div className='left-header'>
                        <img src='http://crm.nexdev.net/local1/Content/site/Images/logo-crm.png'></img>
                        <span className='icon-bar'><i class="fa fa-bars" aria-hidden="true"></i></span>
                    </div>
                    <div className='right-header'>
                        <ul>
                            <li className='menu-item'>
                                <div className='menu-title'>
                                    <Link to='/' className='title'>Home</Link>
                                </div>
                            </li>
                            <li className='menu-item'>
                                <div className='menu-title'>
                                    <span className='title'>Feedback</span>
                                    <span className='fa fa-caret-down icon'></span>
                                </div>
                                <div className='menu-sub'>
                                    <Link to='/AddGuessFeedback' className='layer-first'>Add Guess Feedback</Link>
                                    <Link to='/LastedFeedback' className='layer-first'>Lasted Feedback V2</Link>
                                    <Link to='/ManageFeedback' className='layer-first'>Manage Feedback</Link>
                                    <Link to='/DeletedFeedback' className='layer-first'>Deleted Feedback V2</Link>
                                    <Link to='/CreateMultipleLogs' className='layer-first'>Create Multiple Logs</Link>
                                </div>
                            </li>
                            <li className='menu-item'>
                                <div className='menu-title'>
                                    <span className='title'>Report</span>
                                    <span className='fa fa-caret-down icon'></span>
                                </div>
                                <div className='menu-sub'>
                                    <div className='layer-first'>
                                        Statistics
                                        <span className='fa fa-caret-right icon pr-3 pt-1 float-right'></span>
                                        <div className='layer-second'>
                                            <Link to='/DeletedFeedbackStatistic' className='layer-first'>Deleted Feedback Statistic</Link>
                                            <Link to='/LogStatistics' className='layer-first'>Log Statistics</Link>
                                            <Link to='/IssueStatisticsReport' className='layer-first'>Issue Statistics Report</Link>
                                            <Link to='/FeedbackStatistics' className='layer-first'>Feedback Statistics v2</Link>
                                            <Link to='/RedemptionStatistics' className='layer-first'>Redemption Statistics</Link>
                                        </div>
                                    </div>
                                    <Link to='/CategoriesSummaryReport' className='layer-first'>Categories Summary Report</Link>
                                    <Link to='/CustomerReport' className='layer-first'>Customer Report</Link>
                                    <Link to='/DirectCustomerReport' className='layer-first'>Direct Customer Report</Link>
                                    <Link to='/DynamicReport' className='layer-first'>Dynamic Report</Link>
                                    <Link to='/SettlementIssuesReport' className='layer-first'>Settlement Issues Report</Link>
                                    <Link to='/WagersRelatedReport' className='layer-first'>Wagers-Related Report</Link>
                                </div>
                            </li>
                            <li className='menu-item'>
                                <div className='menu-title'>
                                    <span className='title'>PIC and Headline</span>
                                    <span className='fa fa-caret-down icon'></span>
                                </div>
                                <div className='menu-sub'>
                                    <Link to='/PicManagement' className='layer-first'>PIC Management</Link>
                                    <Link to='/PicAssignment' className='layer-first'>PIC Assignment</Link>
                                    <Link to='/ChangesLog' className='layer-first'>Changes Log</Link>
                                </div>
                            </li>
                            <li className='menu-item'>
                                <div className='menu-title'>
                                    <span className='title'>Headline Notification</span>
                                    <span className='fa fa-caret-down icon'></span>
                                </div>
                                <div className='menu-sub'>
                                    <Link to='/NotificationList' className='layer-first'>Notification List</Link>
                                    <Link to='/ChatTypeMapping' className='layer-first'>Chat Type Mapping</Link>
                                    <Link to='/NotificationTemplate' className='layer-first'>Notification Template</Link>
                                    <Link to='/NotificationType' className='layer-first'>Notification Type</Link>
                                </div>
                            </li>
                            <li className='menu-item'>
                                <div className='menu-title'>
                                    <span className='title'>Admin Tool</span>
                                    <span className='fa fa-caret-down icon'></span>
                                </div>
                                <div className='menu-sub'>
                                    <Link to='/SettingManagement' className='layer-first'>Setting Management V2</Link>
                                    <Link to='/SettingRelation' className='layer-first'>Setting Relation V2</Link>
                                    <Link to='/FeedbackSubjectManagement' className='layer-first'>Feedback Subject Management V2</Link>
                                    <Link to='/SettingLog' className='layer-first'>Setting Log</Link>
                                    <Link to='/DefaultCommunicationSetting' className='layer-first'>Default Communication Setting</Link>
                                </div>
                            </li>
                            <li className='menu-item'>
                                <div className='menu-title'>
                                    <Link to='/InformHeadlines' className='title'>Inform Headlines</Link>
                                </div>
                            </li>
                        </ul>

                        <div className='item-end float-right'>
                            <img src='http://crm.nexdev.net/local1/Views/Home/Styles/images/user.png'></img>
                            <span className='welcome'>Welcome <span className='username'>starix1</span></span>
                            <img src='http://crm.nexdev.net/local1/Views/Home/Styles/images/icon-logout.png'></img>
                            <span className='sign-out'>Sign out</span>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Header;