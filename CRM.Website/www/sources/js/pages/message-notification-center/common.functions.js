import DateTimeService from '@jsroot/common/dateTimeService';

export const statusOptionOST = [
    {id: 'New', name: 'New', checked: true},
    {id: 'Sent', name: 'Sent', checked: true},
    {id: 'Failed', name: 'Failed', checked: true},
    {id: 'Cancelled', name: 'Cancelled', checked: true},
    {id: 'Draft', name: 'Draft', checked: true}
];

export const statusOptionCSD = [
    {id: 'New', name: 'New', checked: true},
    {id: 'Active', name: 'Active', checked: true},
    {id: 'Inactive', name: 'Inactive', checked: true}
];

export const isEitherExitsFromToId = filter => {
    const { fromNotificationId, toNotificationId } = filter;
    return (fromNotificationId && !toNotificationId) || (!fromNotificationId && toNotificationId);
};

export const isFromIdOverToId = filter => {
    const { fromNotificationId, toNotificationId } = filter;
    return fromNotificationId && toNotificationId && parseInt(fromNotificationId, 10) > parseInt(toNotificationId, 10);
};