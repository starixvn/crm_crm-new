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
const JobSettingManagementComponent = lazy(() => import('@jsroot/pages/admin-tool/job-setting-management/index'));

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

const MenuRouteArray = [
    { url: 'NotificationList', component: NotificationListComponent },
    { url: 'NotificationTemplate', component: NotificationTemplateComponent },
    { url: 'ChatTypeMapping', component: ChatTypeMappingComponent },
    { url: 'NotificationType', component: NotificationTypeComponent },
    { url: 'PicManagement', component: ManagementComponent },
    { url: 'PicOfHeadline', component: PicAssignmentComponent },
    { url: 'ChangesLog', component: ChangesLogManagementComponent },
    { url: 'CommunicationSetting', component: CommunicationSettingComponent },
    { url: 'FeedbackSubjectManagement', component: FeedbackSubjectComponent },
    { url: 'ActionLog/SettingLog', component: SettingLogComponent },
    { url: 'SettingManagement', component: SettingManagementComponent },
    { url: 'SettingRelation', component: SettingRelationComponent },
    { url: 'JobSettingManagement', component: JobSettingManagementComponent },
    { url: 'InformHeadline', component: InformHeadlineComponent },
    { url: 'AddFeedback', component: AddFeedbackComponent },
    { url: 'AddGuestFeedback', component: AddGuestFeedbackComponent },
    { url: 'Feedbacks/LatestFeedback', component: LatestFeedbackV2Component },
    { url: 'LatestFeedback', component: LatestFeedbackComponent },
    { url: 'Feedbacks/ManageFeedback', component: ManageFeedbackComponentV2 },
    { url: 'ManageFeedback', component: ManageFeedbackComponent },
    { url: 'Feedbacks/DeletedFeedback', component: DeletedFeedbackComponent },
    { url: 'MultipleLogs/Create', component: MultipleLogsComponent },
    { url: 'Dashboard', component: DashboardComponent },
    { url: 'Detail', component: CustomerInfoDetailComponent },
    { url: 'Communication', component: CommunicationComponent },
    { url: 'SpecialRemark', component: SpecialRemarkComponent },
    { url: 'NewRemark', component: NewRemMarkComponent },
    { url: 'Remark', component: ReMarkComponent },
    { url: 'Redemption', component: RedemptionComponent },
    { url: 'ActionLog', component: ActionLogComponent },
    { url: 'DeletedFeedbackStatistics', component: DeletedFeedbackStatisticsComponent },
    { url: 'LogStatistics', component: LogStatisticsComponent },
    { url: 'StatisticReport', component: StatisticReportComponent },
    { url: 'FeedbackStatisticReport', component: FeedbackStatisticReportComponent },
    { url: 'RedemptionStatisticsReport', component: RedemptionStatisticsReportComponent },
    { url: 'CustomerReport', component: CustomerReportComponent },
    { url: 'SummaryReport', component: SummaryReportComponent },
    { url: 'DirectCustomerReport', component: DirectCustomerReportComponent },
    { url: 'DynamicReport', component: DynamicReportComponent },
    { url: 'SettlementReport', component: SettlementReportComponent },
    { url: 'WagerReport', component: WagerReportComponent, nestedUrl: 'Index' }
];

export default class Index extends PureComponent {
    getRoutesBaseUrl = () => {
        return (
            MenuRouteArray.map(menu =>{
                const nestedPath = menu.hasOwnProperty('nestedUrl') ? menu.nestedUrl : 'Index';
                return(
                    <Route path={Site.resolveClientUrl(menu.url)} element={<menu.component />}>
                    {
                        nestedPath &&
                        <Route path={nestedPath} element={<menu.component />} />
                    }
                    </Route>
                );
            })
        );
    }
    render() {
        return (
            <Router basename='/'>
                <LayoutNavigation>
                    <Suspense fallback={<div />}>
                        <Routes>
                            <Route path={Site.resolveClientUrl('')} />
                            {
                                this.getRoutesBaseUrl()
                            }
                        </Routes>
                    </Suspense>
                </LayoutNavigation>
            </Router>
        );
    }
}