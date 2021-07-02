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

export const TOOLBAR = [
    { name: 'document', items: [ 'Source'] },
    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
    { name: 'basic styles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
    { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
    { name: 'links', items: [ 'Link', 'Unlink' ] },
    { name: 'styles', items: ['Format', 'Font', 'FontSize' ] },
    { name: 'insert', items: [ 'Image2', 'HorizontalRule'] },
    { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo' ] },
    { name: 'editblock', items: ['EditBlock'] }
];

export const EXTRA_TOOLBAR = "justify, font, colorbutton, colordialog, image2, editblock";