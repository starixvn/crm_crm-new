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
const SettingRelationComponent = lazy(() => import('@jsroot/pages/admin-tool/setting-relation/index'));

const InformHeadlineComponent = lazy(() => import('@jsroot/pages/informheadline/index'));

const AddFeedbackComponent = lazy(() => import('@jsroot/pages/feedback/add-feedback/add-customer-feedback/index'));
const AddGuestFeedbackComponent = lazy(() => import('@jsroot/pages/feedback/add-feedback/add-guest-feedback/index'));
const LatestFeedbackComponent = lazy(() => import('@jsroot/pages/feedback/latest-feedback/index'));
const ManageFeedbackComponent = lazy(() => import('@jsroot/pages/feedback/manage-feedback/index'));
const DeletedFeedbackComponent = lazy(() => import('@jsroot/pages/feedback/deleted-feedback/index'));
const MultipleLogsComponent = lazy(() => import('@jsroot/pages/feedback/multiple-logs/create/index'));

const DashboardComponent = lazy(() => import('@jsroot/pages/dashboard/index'));
const CustomerInfoDetailComponent = lazy(() => import('@jsroot/pages/customer/customer-info-detail/index'));
const CommunicationComponent = lazy(() => import('@jsroot/pages/communication-log/index'));
const RemarkComponent = lazy(() => import('@jsroot/pages/remark/index'));
const RedemptionComponent = lazy(() => import('@jsroot/pages/redemption/index'));
const ActionLogComponent = lazy(() => import('@jsroot/pages/action-log/index'));

export default class Index extends PureComponent {
    render() {
        return (
            <Router basename='/'>
                <Layout>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path={Site.resolveClientUrl("")} />
                            <Route path={Site.resolveClientUrl("NotificationList")} element={<NotificationListComponent />} />
                            <Route path={Site.resolveClientUrl("NotificationTemplate")} element={<NotificationTemplateComponent />} />
                            <Route path={Site.resolveClientUrl("ChatTypeMapping")} element={<ChatTypeMappingComponent />} />
                            <Route path={Site.resolveClientUrl("NotificationType")} element={<NotificationTypeComponent />} />
                            
                            <Route path={Site.resolveClientUrl("PicManagement")} element={<ManagementComponent />} />
                            <Route path={Site.resolveClientUrl("PicOfHeadline")} element={<PicAssignmentComponent />} />
                            <Route path={Site.resolveClientUrl("ChangesLog")} element={<ChangesLogManagementComponent />} />

                            <Route path={Site.resolveClientUrl("CommunicationSetting/Index")} element={<CommunicationSettingComponent />} />
                            <Route path={Site.resolveClientUrl("FeedbackSubjectManagement/Index")} element={<FeedbackSubjectComponent />} />
                            <Route path={Site.resolveClientUrl("ActionLog/SettingLog")} element={<SettingLogComponent />} />
                            <Route path={Site.resolveClientUrl("SettingManagement/Index")} element={<SettingManagementComponent />} />
                            <Route path={Site.resolveClientUrl("SettingRelation/Index")} element={<SettingRelationComponent />} />

                            <Route path={Site.resolveClientUrl("InformHeadline")} element={<InformHeadlineComponent />} />
                            
                            <Route path={Site.resolveClientUrl("AddFeedback")} element={<AddFeedbackComponent />} />
                            <Route path={Site.resolveClientUrl("AddGuestFeedback/Index")} element={<AddGuestFeedbackComponent />} />
                            <Route path={Site.resolveClientUrl("Feedbacks/LatestFeedback")} element={<LatestFeedbackComponent />} />
                            <Route path={Site.resolveClientUrl("Feedbacks/ManageFeedback")} element={<ManageFeedbackComponent />} />
                            <Route path={Site.resolveClientUrl("Feedbacks/DeletedFeedback")} element={<DeletedFeedbackComponent />} />
                            <Route path={Site.resolveClientUrl("MultipleLogs/Create")} element={<MultipleLogsComponent />} />
                            
                            <Route path={Site.resolveClientUrl("Dashboard")} element={<DashboardComponent />} />
                            <Route path={Site.resolveClientUrl("Detail")} element={<CustomerInfoDetailComponent />} />
                            <Route path={Site.resolveClientUrl("Communication")} element={<CommunicationComponent />} />
                            <Route path={Site.resolveClientUrl("Remark")} element={<RemarkComponent />} />
                            <Route path={Site.resolveClientUrl("Redemption")} element={<RedemptionComponent />} />
                            <Route path={Site.resolveClientUrl("ActionLog")} element={<ActionLogComponent />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        );
    }
}