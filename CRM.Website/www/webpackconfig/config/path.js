const path = require('path');

const projectRoot = path.resolve(__dirname, '../../../');

const cssPaths = {
    build: 'wwwroot/css',

    main: ['./www/sources/css/main.scss'],
    error: ['./www/sources/css/pages/error.scss'],
    notification_list: ['./www/sources/css/pages/notification-list/index.scss'],
    notification_template: ['./www/sources/css/pages/notification-template/index.scss'],
    notification_type: ['./www/sources/css/pages/notification-type/index.scss'],
    chattype_mapping: ['./www/sources/css/pages/chat-type-mapping/index.scss'],
    communication_setting: ['./www/sources/css/pages/communication-setting/index.scss'],
    pic_assignment: ['./www/sources/css/pages/pic-and-headline/pic-assignment/index.scss'],
    pic_management: ['./www/sources/css/pages/pic-and-headline/management/index.scss'],
    report_settlement: ['./www/sources/css/pages/report/settlement/index.scss'],
    feedback_subject: ['./www/sources/css/pages/feedback-subject/index.scss'],
    latest_feedback: ['./www/sources/css/pages/feedback/latest-feedback.scss'],
    add_guest_feedback: ['./www/sources/css/pages/feedback/add-guest-feedback/index.scss'],
    customer_info: ['./www/sources/css/pages/customer/customer-info/index.scss'],
    create_multiple_logs: ['./www/sources/css/pages/feedback/multiple-logs/create.scss'],
    deleted_feedback: ['./www/sources/css/pages/feedback/deleted-feedback/index.scss'],
    manage_feedback: ['./www/sources/css/pages/feedback/manage-feedback/index.scss'],
    inform_headline: ['./www/sources/css/pages/informHeadline/index.scss'],
    customer_info_detail: ['./www/sources/css/pages/customer/customer-info-detail/index.scss'],
    communication_log: ['./www/sources/css/pages/communication-log/index.scss'],
    remark: ['./www/sources/css/pages/remark/index.scss'],
    redemption: ['./www/sources/css/pages/redemption/index.scss'],
    action_log: ['./www/sources/css/pages/action-log/index.scss']
};

const scriptPaths = {
    build: 'wwwroot/js',

    language: ['./www/sources/js/common/languages/ViewResources.js'],
    main: ['./www/sources/js/main.js'],
    recheckin: ['./www/sources/js/pages/auth/recheckin.js'],
    notification_list: ['./www/sources/js/pages/notification-list/index.js'],
    notification_template: ['./www/sources/js/pages/notification-template/index.js'],
    notification_type: ['./www/sources/js/pages/notification-type/index.js'],
    chattype_mapping: ['./www/sources/js/pages/chat-type-mapping/index.js'],
    communication_setting: ['./www/sources/js/pages/communication-setting/index.js'],
    pic_assignment: ['./www/sources/js/pages/pic-and-headline/pic-assignment/index.js'],
    pic_management: ['./www/sources/js/pages/pic-and-headline/management/index.js'],
    report_settlement: ['./www/sources/js/pages/report/settlement/index.js'],
    feedback_subject: ['./www/sources/js/pages/feedback-subject/index.js'],
    latest_feedback: ['./www/sources/js/pages/feedback/latest-feedback/index.js'],
    add_guest_feedback: ['./www/sources/js/pages/feedback/add-guest-feedback/index.js'],
    customer_info: ['./www/sources/js/pages/customer/customer-info/index.js'],
    create_multiple_logs: ['./www/sources/js/pages/feedback/multiple-logs/create/index.js'],
    deleted_feedback: ['./www/sources/js/pages/feedback/deleted-feedback/index.js'],
    manage_feedback: ['./www/sources/js/pages/feedback/manage-feedback/index.js'],
    inform_headline: ['./www/sources/js/pages/informHeadline/index.js'],
    customer_info_detail: ['./www/sources/js/pages/customer/customer-info-detail/index.js'],
    communication_log: ['./www/sources/js/pages/communication-log/index.js'],
    remark: ['./www/sources/js/pages/remark/index.js'],
    redemption: ['./www/sources/js/pages/redemption/index.js'],
    action_log: ['./www/sources/js/pages/action-log/index.js']
};

module.exports = {
    projectRoot: projectRoot,
    cssPaths: cssPaths,
    scriptPaths: scriptPaths
};