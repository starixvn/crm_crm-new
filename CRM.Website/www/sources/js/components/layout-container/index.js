import React, {PureComponent, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Site from '@jsroot/common/site';

const NotificationListComponent  = lazy(() => import('@jsroot/pages/notification-list/index'));
const NotificationTemplateComponent = lazy(() => import('@jsroot/pages/notification-template/index'));
const ChatTypeMappingComponent = lazy(() => import('@jsroot/pages/chat-type-mapping/index'));
const NotificationTypeComponent = lazy(() => import('@jsroot/pages/notification-type/index'));

const ManagementComponent  = lazy(() => import('@jsroot/pages/pic-and-headline/management/index'));
const PicAssignmentComponent  = lazy(() => import('@jsroot/pages/pic-and-headline/pic-assignment/index'));
const ChangesLogManagementComponent  = lazy(() => import('@jsroot/pages/pic-and-headline/changes-log/index'));

const CommunicationSettingComponent  = lazy(() => import('@jsroot/pages/admin-tool/communication-setting/index'));
const FeedbackSubjectComponent  = lazy(() => import('@jsroot/pages/admin-tool/feedback-subject/index'));
const SettingLogComponent  = lazy(() => import('@jsroot/pages/admin-tool/setting-log/index'));
const SettingManagementComponent  = lazy(() => import('@jsroot/pages/admin-tool/setting-management/index'));
const SettingRelationComponent  = lazy(() => import('@jsroot/pages/admin-tool/setting-relation/index'));


const DashboardComponent = lazy(() => import('@jsroot/pages/dashboard/index'));

export default class Index extends PureComponent {
    render() {
        const _rootUrl = document.getElementById('RootUrl') ? document.getElementById('RootUrl').value : '/';
        console.log(_rootUrl);
        document.getElementById('RootUrl').value = _rootUrl;
        return (
            <Router basename={_rootUrl}>
                <Layout>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" />
                            <Route path="local2/NotificationList" element={<NotificationListComponent />} />
                            <Route path={Site.resolveClientUrl("/NotificationTemplate")} element={<NotificationTemplateComponent />} />
                            <Route path={Site.resolveClientUrl("/ChatTypeMapping")} element={<ChatTypeMappingComponent />} />
                            <Route path={Site.resolveClientUrl("/NotificationType")} element={<NotificationTypeComponent />} />
                            
                            <Route path="/PicManagement" element={<ManagementComponent />} />
                            <Route path="/PicOfHeadline" element={<PicAssignmentComponent />} />
                            <Route path="/ChangesLog" element={<ChangesLogManagementComponent />} />

                            <Route path="/CommunicationSetting">
                                <Route path="Index" element={<CommunicationSettingComponent />} />
                            </Route>
                            <Route path="/FeedbackSubjectManagement/Index" element={<FeedbackSubjectComponent />} />
                            <Route path="/ActionLog/SettingLog" element={<SettingLogComponent />} />
                            <Route path="/SettingManagement/Index" element={<SettingManagementComponent />} />
                            <Route path="/SettingRelation/Index" element={<SettingRelationComponent />} />

                            <Route path="/Dashboard" element={<DashboardComponent />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        );
    }
}