import LanguageHelper from './langHelper';

export const PAGING_SIZES = [100, 200, 300, 400, 500, 1000];

export const SMALL_PAGING_SIZES = [1, 5, 7, 10];

export const DefaultPageSize = 100;

export const DateFormat = 'MM/dd/yyyy';

export const DateTimeFormat = 'MM/dd/yyyy hh:mm:ss a';

export const TimeFormat = 'hh:mm:ss a';

export const BackGroundChange = 'background-change';

export const RoleIds = {
    'Member': 1,
    'CRMMember': 7000
};

export const MappingStatus = {
    'BotRemoved': 0,
    'NotMapped': 1,
    'Mapped': 2
};

export const ChatTypeMapping = {
    'Personal': 2,
    'Group': 1
};

export const MULTI_SELECT_TEXT_OPTIONS = {
    Texts: LanguageHelper.getResource('All'),
    SelectedItemCount: '# selected',
    SelectOptions: LanguageHelper.getResource('PleaseSelect'),
    NoData: LanguageHelper.getResource('NoData'),
    NA: LanguageHelper.getResource('N/A')
};

export const AUTO_REFRESH_TIMES = [90, 120, 150, 180];

export const MaximumDisplayRelatedCustomer = 20;

export const Policy = {
    None: 0,
    Read: 1,
    Host: 2
};

export const FunctionKey = {
    NotificationList: 'NotificationList',
    ChatTypeMapping: 'ChatTypeMapping',
    NotificationTemplate: 'NotificationTemplate',
    NotificationType: 'NotificationType',
    DefaultCommunicationSetting: 'DefaultCommunicationSetting',
    SettlementIssuesReport: 'SettlementIssuesReport',
    CategoriesSummaryReport: 'CategoriesSummaryReport',
    DirectCustomerReport: 'DirectCustomerReport',
    FeedbackSubject: 'FBSubjectTemplateManagement',
    PICAssignment: 'PICAssignment',
    PICManagement: 'PICManagement',
    ChangesLog: 'ChangesLog',
    LatestFeedback: 'LatestFeedback',
    DeleteFeedback: 'DeleteFeedback',
    ReviewFeedback: 'ReviewFeedback',
    CreateUpdateFeedbackAndCustomerInfo: 'CreateUpdateFeedback_CustomerInfo',
    Updateheadlineinfo: 'Updateheadlineinfo',
    InformHeadline: 'InformHeadline',
    InformHeadlineSearch: 'InformHeadlineSearch',
    InformHeadlineContact: 'InformHeadlineContact',
    SettingLog: 'ViewSettingLog',
    DeletedFeedbackStatistic: 'DeletedFeedbackStatistic',
    LogStatistics: 'LogStatistics',
    IssueStatistics: 'IssueStatistics',
    FeedbackStatistics: 'FeedbackStatistics',
    DynamicReport: 'DynamicReport',
    RedemptionStatistics: 'RedemptionStatistics',
    CustomerReport: 'CustomerReport',
    SettingRelationManagement: 'SettingRelationshipManagement',
    SettingManagement: 'SettingManagement'
};

export const BorderStyle = {
    bottom: 'border-bottom-0',
    top: 'border-top-0'
};

export const LogActions = {
    InsertNewPic: 901,
    UpdatePic: 902,
    UpdatePicStatus: 903,
    RemoveDirectAccountFromPic: 904,
    AssignDirectAccountToPic: 905,
    UpdateThePicOfAHeadline: 906,
    UpdateDefaultPicForAGroupHeadline: 907,
    RemoveDefaultPicForAGroupHeadline: 908,
    AddCustomerToCreditTermGroup: 909,
    UpdateCreditTerm: 910,
    RemoveCustomerFromCreditTermGroup: 911,
    SetCustomerToCreditTermGroup: 912,
    AddTheGeneralInformationForSuperFromExistingSuper: 913
};

export const DefaultLanguages = {
    NotApply: 0,
    English: 1200,
    Mandarin: 1201,
    Cantonese: 1202
};

export const DateTypeOption = [
    {id: 0, name: 'Today'},
    {id: 1, name: 'Yesterday'},
    {id: 2, name: 'This Week'},
    {id: 3, name: 'Last Week'},
    {id: 4, name: 'This Month'},
    {id: 5, name: 'Last Month'},
    {id: 6, name: 'This Year'},
    {id: 7, name: 'Specific Dates'}
];

export const DateType = {
    Today: 0,
    Yesterday: 1,
    ThisWeek: 2,
    LastWeek: 3,
    ThisMonth: 4,
    LastMonth: 5,
    ThisYear: 6,
    SpecificDates: 7
};


export const FeedbackSelectionType = [
    { name: 'By Creator', id: 1 },
    { name: 'By Country', id: 2 },
    { name: 'By Role', id: 3 },
    { name: 'By Site', id: 4 },
    { name: 'By Status', id: 5 },
    { name: 'By Response', id: 6 },
    { name: 'By Product', id: 7 },
    { name: 'By Category', id: 8 },
    { name: 'By Licensees', id: 9 },
    { name: 'By CommunicationTool', id: 10 }
];

export const ReportBy = [
    { name: 'Month', id: 1 },
    { name: 'Year', id: 2 }
];

export const SubMainMenu = [
    {id: 1, url: '/Dashboard'},
    {id: 2, url: '/Detail'},
    {id: 3, url: '/Communication'},
    {id: 4, url: '/Remark'},
    {id: 5, url: '/Redemption'},
    {id: 6, url: '/ActionLog'}
];

export const DetailMenu = [
    {id: 1, url: '/LatestFeedback'},
    {id: 2, url: '/AddFeedback'},
    {id: 3, url: '/ManageFeedback'}
];
