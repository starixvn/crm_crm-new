import React, {PureComponent, lazy, Suspense } from 'react';
import LayoutNavigation from './components/Layout';
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
const LatestFeedbackV2Component = lazy(() => import('@jsroot/pages/feedback/latest-feedback-v2/index'));
const LatestFeedbackComponent = lazy(() => import('@jsroot/pages/feedback/latest-feedback/index'));
const ManageFeedbackComponentV2 = lazy(() => import('@jsroot/pages/feedback/manage-feedback-v2/index'));
const ManageFeedbackComponent = lazy(() => import('@jsroot/pages/feedback/manage-feedback/index'));

const DeletedFeedbackComponent = lazy(() => import('@jsroot/pages/feedback/deleted-feedback/index'));
const MultipleLogsComponent = lazy(() => import('@jsroot/pages/feedback/multiple-logs/create/index'));

const DashboardComponent = lazy(() => import('@jsroot/pages/dashboard/index'));
const CustomerInfoDetailComponent = lazy(() => import('@jsroot/pages/customer/customer-info-detail/index'));
const CommunicationComponent = lazy(() => import('@jsroot/pages/communication-log/index'));
const SpecialRemarkComponent = lazy(() => import('@jsroot/pages/special-remark/index'));
const NewRemMarkComponent = lazy(() => import('@jsroot/pages/new-remark/index'));
const ReMarkComponent = lazy(() => import('@jsroot/pages/remark/index'));
const RedemptionComponent = lazy(() => import('@jsroot/pages/redemption/index'));
const ActionLogComponent = lazy(() => import('@jsroot/pages/action-log/index'));

const DeletedFeedbackStatisticsComponent = lazy(() => import('@jsroot/pages/report/deleted-feedback-statistic/index'));
const LogStatisticsComponent = lazy(() => import('@jsroot/pages/report/log-statistics/index'));
const StatisticReportComponent = lazy(() => import('@jsroot/pages/report/issue-statistics/index'));
const FeedbackStatisticReportComponent = lazy(() => import('@jsroot/pages/report/feedback-statistic/index'));
const RedemptionStatisticsReportComponent = lazy(() => import('@jsroot/pages/report/redemption-statistics/index'));
const CustomerReportComponent = lazy(() => import('@jsroot/pages/report/customer/index'));
const SummaryReportComponent = lazy(() => import('@jsroot/pages/report/summary/index'));
const DirectCustomerReportComponent = lazy(() => import('@jsroot/pages/report/direct/index'));
const DynamicReportComponent = lazy(() => import('@jsroot/pages/report/dynamic/index'));
const SettlementReportComponent = lazy(() => import('@jsroot/pages/report/settlement/index'));
const WagerReportComponent = lazy(() => import('@jsroot/pages/report/wager/index'));


export default class Index extends PureComponent {
    render() {
        return (
            <Router basename='/'>
                <LayoutNavigation>
                    <Suspense fallback={<div />}>
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
                            <Route path={Site.resolveClientUrl("Feedbacks/LatestFeedback")} element={<LatestFeedbackV2Component />} />
                            <Route path={Site.resolveClientUrl("LatestFeedback")} element={<LatestFeedbackComponent />} />
                            <Route path={Site.resolveClientUrl("Feedbacks/ManageFeedback")} element={<ManageFeedbackComponentV2 />} />
                            <Route path={Site.resolveClientUrl("ManageFeedback")} element={<ManageFeedbackComponent />} />
                            <Route path={Site.resolveClientUrl("Feedbacks/DeletedFeedback")} element={<DeletedFeedbackComponent />} />
                            <Route path={Site.resolveClientUrl("MultipleLogs/Create")} element={<MultipleLogsComponent />} />
                            
                            <Route path={Site.resolveClientUrl("Dashboard")} element={<DashboardComponent />} />
                            <Route path={Site.resolveClientUrl("Detail")} element={<CustomerInfoDetailComponent />} />
                            <Route path={Site.resolveClientUrl("Communication")} element={<CommunicationComponent />} />
                            <Route path={Site.resolveClientUrl("SpecialRemark")} element={<SpecialRemarkComponent />} />
                            <Route path={Site.resolveClientUrl("NewRemark")} element={<NewRemMarkComponent />} />
                            <Route path={Site.resolveClientUrl("Remark")} element={<ReMarkComponent />} />
                            <Route path={Site.resolveClientUrl("Redemption")} element={<RedemptionComponent />} />
                            <Route path={Site.resolveClientUrl("ActionLog")} element={<ActionLogComponent />} />

                            <Route path={Site.resolveClientUrl("DeletedFeedbackStatistics/Index")} element={<DeletedFeedbackStatisticsComponent />} />
                            <Route path={Site.resolveClientUrl("LogStatistics/Index")} element={<LogStatisticsComponent />} />
                            <Route path={Site.resolveClientUrl("StatisticReport/Index")} element={<StatisticReportComponent />} />
                            <Route path={Site.resolveClientUrl("FeedbackStatisticReport/Index")} element={<FeedbackStatisticReportComponent />} />
                            <Route path={Site.resolveClientUrl("RedemptionStatisticsReport/Index")} element={<RedemptionStatisticsReportComponent />} />
                            <Route path={Site.resolveClientUrl("CustomerReport/Index")} element={<CustomerReportComponent />} />
                            <Route path={Site.resolveClientUrl("SummaryReport/Index")} element={<SummaryReportComponent />} />
                            <Route path={Site.resolveClientUrl("DirectCustomerReport/Index")} element={<DirectCustomerReportComponent />} />
                            <Route path={Site.resolveClientUrl("DynamicReport/Index")} element={<DynamicReportComponent />} />
                            <Route path={Site.resolveClientUrl("SettlementReport/Index")} element={<SettlementReportComponent />} />
                            <Route path={Site.resolveClientUrl("WagerReport/Index")} element={<WagerReportComponent />} />
                        </Routes>
                    </Suspense>
                </LayoutNavigation>
            </Router>
        );
    }
}