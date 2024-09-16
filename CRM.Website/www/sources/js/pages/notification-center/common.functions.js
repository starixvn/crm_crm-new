import LangHelper from '@jsroot/common/langHelper';

export const statusOptionOST = [
    {id: 'New', name: 'New', checked: true},
    {id: 'Sent', name: 'Sent', checked: true},
    {id: 'Failed', name: 'Failed', checked: true},
    {id: 'Cancelled', name: 'Cancelled', checked: true},
    {id: 'Draft', name: 'Draft', checked: true},
    {id: 'Sending', name: 'Sending', checked: true},
];

export const statusOptionCSD = [
    {id: 'New', name: 'New', checked: true},
    {id: 'Active', name: 'Active', checked: true},
    {id: 'Inactive', name: 'Inactive', checked: true}
];

export const languageOptions = isOstUser => {
    const commonOptions = [
        {
            name: "English",
            mapLabel: "content_en"
        },
        {
            name: "Simplified Chinese",
            mapLabel: "content_cs"
        }
    ];

    if (isOstUser) {
        return [
            ...commonOptions,
            {
                name: "Traditional Chinese",
                mapLabel: "content_ch"
            },
            {
                name: "New Simplified Chinese",
                mapLabel: "content_zhcn"
            }
        ];
    } else {
        return commonOptions;
    }
};

export const isEitherExitsFromToId = filter => {
    const { fromNotificationId, toNotificationId } = filter;
    return (fromNotificationId && !toNotificationId) || (!fromNotificationId && toNotificationId);
};

export const isFromIdOverToId = filter => {
    const { fromNotificationId, toNotificationId } = filter;
    return fromNotificationId && toNotificationId && parseInt(fromNotificationId, 10) > parseInt(toNotificationId, 10);
};

export const filterAndSortSites = (sites, siteType) => {
    return sites
        .filter(item => item.siteType === siteType)
        .sort((x, y) => x.siteGroupOrd - y.siteGroupOrd);
};

export const isExceedMaxInt = filter => {
    const { fromNotificationId, toNotificationId, notificationId, matchId, messageId } = filter;
    const maxInt = 2147483647;
    const ids = [fromNotificationId, toNotificationId, notificationId, matchId, messageId];
    return ids.some(id => parseInt(id, 10) >= maxInt);
};

export const checkExceedMaxInt = (field, errMsg, isValid) => {
    const maxInt = 2147483647;
    const isExceedMaxInt = field.value ? parseInt(field.value, 10) >= maxInt : false;
    if (isExceedMaxInt) {
        isValid.value = false;
        errMsg && errMsg.push(`${field.name} ${LangHelper.getResource('ExceedsTheIntegerDatatypeRange')}`);
    }
};

export const isValidGetDataAutoRefresh = filter => {
    let isValid = { value: true };
    const { fromDate, toDate } = filter;
    const fieldsCheckMaxInt = [
        { value: filter.notificationId, name: 'Notification ID' },
        { value: filter.messageId, name: 'Message ID' },
        { value: filter.matchId, name: 'Match ID' },
        { value: filter.fromNotificationId, name: 'From Notification ID' },
        { value: filter.toNotificationId, name: 'To Notification ID' },
    ];

    if (!filter.isCompareIdEqual) {
        if (isEitherExitsFromToId(filter)) {
            isValid.value = false;
        }

        if (isFromIdOverToId(filter)) {
            isValid.value = false;
        }
    }

    if (!fromDate || !toDate) {
        isValid.value = false;
    }

    fieldsCheckMaxInt.forEach(field => checkExceedMaxInt(field, null, isValid));

    return isValid.value;
};