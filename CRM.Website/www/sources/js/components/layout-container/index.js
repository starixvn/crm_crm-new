import React, {PureComponent, lazy, Suspense } from 'react';
import LayoutNavigation from './components/Layout';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Site from '@jsroot/common/site';
import { RemovePageUrl } from '@jsroot/common/constants';

const DashboardComponent = lazy(() => import(/* webpackChunkName: 'dashboard' */ '@jsroot/pages/dashboard/index'));
const AccountDetailComponent = lazy(() => import(/* webpackChunkName: 'AccountDetail' */ '@jsroot/pages/customer/account-detail/index'));

const NotificationListComponent  = lazy(() => import(/* webpackChunkName: 'notification-list' */ '@jsroot/pages/notification-list/index'));
const NotificationTemplateComponent = lazy(() => import(/* webpackChunkName: 'notification-template' */ '@jsroot/pages/notification-template/index'));
const ChatTypeMappingComponent = lazy(() => import(/* webpackChunkName: 'chat-type-mapping' */ '@jsroot/pages/chat-type-mapping/index'));
const NotificationTypeComponent = lazy(() => import(/* webpackChunkName: 'notification-type' */ '@jsroot/pages/notification-type/index'));
const AnnouncementComponent = lazy(() => import(/* webpackChunkName: 'announcement' */'@jsroot/pages/announcement/index'));
const NewAnnouncementComponent = lazy(() => import(/* webpackChunkName: 'announcement' */'@jsroot/pages/announcement/newAnnouncement'));
const EditAnnouncementComponent = lazy(() => import(/* webpackChunkName: 'announcement' */'@jsroot/pages/announcement/editAnnouncement'));
const CloneAnnouncementComponent = lazy(() => import(/* webpackChunkName: 'announcement' */'@jsroot/pages/announcement/editAnnouncement'));
const SMAPersonalMessage = lazy(() => import(/* webpackChunkName: 'sma-personal-message' */ '@jsroot/pages/add-sma-personal-message/index'));
const NotificationCenter = lazy(() => import(/* webpackChunkName: 'notification-center' */ '@jsroot/pages/notification-center/index'));
const ActionNotificationComponent = lazy(() => import(/* webpackChunkName: 'notification-center' */ '@jsroot/pages/notification-center/actionNotification'));
const SMAFeedbackComponent = lazy(() => import(/* webpackChunkName: 'sma-feedback' */ '@jsroot/pages/sma-feedback/index'));

const ManagementComponent  = lazy(() => import(/* webpackChunkName: 'pic-and-headline-management' */ '@jsroot/pages/pic-and-headline/management/index'));
const PicAssignmentComponent  = lazy(() => import(/* webpackChunkName: 'pic-and-headline-pic-assignment' */ '@jsroot/pages/pic-and-headline/pic-assignment/index'));
const ChangesLogManagementComponent  = lazy(() => import(/* webpackChunkName: 'changes-log' */ '@jsroot/pages/pic-and-headline/changes-log/index'));

const CommunicationSettingComponent  = lazy(() => import(/* webpackChunkName: 'communication-setting' */ '@jsroot/pages/admin-tool/communication-setting/index'));
const FeedbackSubjectComponent  = lazy(() => import(/* webpackChunkName: 'feedback-subject' */ '@jsroot/pages/admin-tool/feedback-subject/index'));
const SettingLogComponent  = lazy(() => import(/* webpackChunkName: 'setting-log' */ '@jsroot/pages/admin-tool/setting-log/index'));
const SettingManagementComponent  = lazy(() => import(/* webpackChunkName: 'setting-management' */ '@jsroot/pages/admin-tool/setting-management/index'));
const SettingRelationComponent = lazy(() => import(/* webpackChunkName: 'setting-relation' */ '@jsroot/pages/admin-tool/setting-relation/index'));
const JobSettingManagementComponent = lazy(() => import(/* webpackChunkName: 'job-setting-management' */ '@jsroot/pages/admin-tool/job-setting-management/index'));
const CategoryClassificationComponent = lazy(() => import(/* webpackChunkName: 'remark-classification' */ '@jsroot/pages/admin-tool/category-classification/index'));

const InformHeadlineComponent = lazy(() => import(/* webpackChunkName: 'inform-headline' */ '@jsroot/pages/informheadline/index'));

const AddFeedbackComponent = lazy(() => import(/* webpackChunkName: 'add-customer-feedback' */ '@jsroot/pages/feedback/add-feedback/add-customer-feedback/index'));
const AddGuestFeedbackComponent = lazy(() => import(/* webpackChunkName: 'add-guest-feedback' */ '@jsroot/pages/feedback/add-feedback/add-guest-feedback/index'));
const LatestFeedbackV2Component = lazy(() => import(/* webpackChunkName: 'latest-feedback-v2' */ '@jsroot/pages/feedback/latest-feedback-v2/index'));
const LatestFeedbackComponent = lazy(() => import(/* webpackChunkName: 'latest-feedback' */ '@jsroot/pages/feedback/latest-feedback/index'));
const ManageFeedbackComponentV2 = lazy(() => import(/* webpackChunkName: 'manage-feedback-v2' */ '@jsroot/pages/feedback/manage-feedback-v2/index'));
const ManageFeedbackComponent = lazy(() => import(/* webpackChunkName: 'manage-feedback' */ '@jsroot/pages/feedback/manage-feedback/index'));

const DeletedFeedbackComponent = lazy(() => import(/* webpackChunkName: 'deleted-feedback' */ '@jsroot/pages/feedback/deleted-feedback/index'));
const MultipleLogsComponent = lazy(() => import(/* webpackChunkName: 'multiple-logs' */ '@jsroot/pages/feedback/multiple-logs/create/index'));

const CustomerInfoDetailComponent = lazy(() => import(/* webpackChunkName: 'customer-info-detail' */ '@jsroot/pages/customer/customer-info-detail/index'));
const CommunicationComponent = lazy(() => import(/* webpackChunkName: 'communication-log' */ '@jsroot/pages/communication-log/index'));
const SpecialRemarkComponent = lazy(() => import(/* webpackChunkName: 'special-remark' */ '@jsroot/pages/special-remark/index'));
const NewRemMarkComponent = lazy(() => import(/* webpackChunkName: 'new-remark' */ '@jsroot/pages/new-remark/index'));
const ReMarkComponent = lazy(() => import(/* webpackChunkName: 'remark' */ '@jsroot/pages/remark/index'));
const RedemptionComponent = lazy(() => import(/* webpackChunkName: 'redemption' */ '@jsroot/pages/redemption/index'));
const ActionLogComponent = lazy(() => import(/* webpackChunkName: 'action-log' */ '@jsroot/pages/action-log/index'));

const DeletedFeedbackStatisticsComponent = lazy(() => import(/* webpackChunkName: 'deleted-feedback-statistic' */ '@jsroot/pages/report/deleted-feedback-statistic/index'));
const LogStatisticsComponent = lazy(() => import(/* webpackChunkName: 'log-statistics' */ '@jsroot/pages/report/log-statistics/index'));
const StatisticReportComponent = lazy(() => import(/* webpackChunkName: 'issue-statistics' */ '@jsroot/pages/report/issue-statistics/index'));
const FeedbackStatisticReportComponent = lazy(() => import(/* webpackChunkName: 'feedback-statistic' */ '@jsroot/pages/report/feedback-statistic/index'));
const RedemptionStatisticsReportComponent = lazy(() => import(/* webpackChunkName: 'redemption-statistics' */ '@jsroot/pages/report/redemption-statistics/index'));
const CustomerReportComponent = lazy(() => import(/* webpackChunkName: 'customer-report' */ '@jsroot/pages/report/customer/index'));
const SummaryReportComponent = lazy(() => import(/* webpackChunkName: 'summary-report' */ '@jsroot/pages/report/summary/index'));
const DirectCustomerReportComponent = lazy(() => import(/* webpackChunkName: 'direct-report' */ '@jsroot/pages/report/direct/index'));
const DynamicReportComponent = lazy(() => import(/* webpackChunkName: 'dynamic-report' */ '@jsroot/pages/report/dynamic/index'));
const SettlementReportComponent = lazy(() => import(/* webpackChunkName: 'settlement-report' */ '@jsroot/pages/report/settlement/index'));
const WagerReportComponent = lazy(() => import(/* webpackChunkName: 'wager-report' */ '@jsroot/pages/report/wager/index'));

const MenuRouteArray = [
    { url: 'Home', component: DashboardComponent},
    { url: 'NotificationList', component: NotificationListComponent },
    { url: 'NotificationTemplate', component: NotificationTemplateComponent },
    { url: 'ChatTypeMapping', component: ChatTypeMappingComponent },
    { url: 'NotificationType', component: NotificationTypeComponent },
    { url: 'SMAPersonalMessage', component: SMAPersonalMessage },
    { url: 'NotificationCenter', component: NotificationCenter },
    { url: 'Announcement', component: AnnouncementComponent },
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
    { url: 'AccountDetail', component: AccountDetailComponent },
    { url: 'Communication', component: CommunicationComponent },
    { url: 'SpecialRemark', component: SpecialRemarkComponent },
    { url: 'NewRemark', component: NewRemMarkComponent },
    { url: 'Remark', component: ReMarkComponent },
    { url: 'CategoryClassification', component: CategoryClassificationComponent },
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
    { url: 'WagerReport', component: WagerReportComponent, nestedUrl: 'Index' },
    { url: 'Announcement/NewAnnouncement', component: NewAnnouncementComponent },
    { url: 'Announcement/EditAnnouncement', component: EditAnnouncementComponent },
    { url: 'Announcement/CloneAnnouncement', component: CloneAnnouncementComponent },
    { url: 'NotificationCenter/Action', component: ActionNotificationComponent },
    { url: 'ManageSmaFeedback', component: SMAFeedbackComponent },
];

export default class Index extends PureComponent {
    getRoutesBaseUrl = () => {
        const menusActive = MenuRouteArray.filter(x => !RemovePageUrl.includes(x.url));
        return (
            menusActive.map(menu =>{
                const nestedPath = menu.hasOwnProperty('nestedUrl') ? menu.nestedUrl : 'Index';
                const id = `menu-${menu.url}`;
                return(
                    <Route key={id} path={Site.resolveClientUrl(menu.url)} element={<menu.component />}>
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