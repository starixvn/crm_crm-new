import LanguageHelper from './langHelper';

export const PAGING_SIZES = [100, 200, 300, 400, 500, 1000];

export const DefaultPageSize = 100;

export const DateFormat = 'MM/dd/yyyy';

export const DateTimeFormat = 'MM/dd/yyyy hh:mm:ss a';

export const TimeFormat = 'hh:mm:ss a';

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

export const borderStyle = {
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