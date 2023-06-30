import moment from 'moment';
export const RANGE_DATE_OPTION = [
    {
        label: 'Today',
        fromDate: moment().toDate(),
        toDate: moment().toDate()
    },
    {
        label: 'Yesterday',
        fromDate: moment().subtract(1, 'days').toDate(),
        toDate: moment().subtract(1, 'days').toDate()
    },
    {
        label: 'Last 7 Days',
        fromDate: moment().subtract(6, 'days').toDate(),
        toDate: moment().toDate()
    },
    {
        label: 'Last 30 Days',
        fromDate: moment().subtract(29, 'days').toDate(),
        toDate: moment().toDate()
    },
    {
        label: 'This Month',
        fromDate: moment().startOf('month').toDate(),
        toDate: moment().endOf('month').toDate()
    },
    {
        label: 'Last Month',
        fromDate: moment().subtract(1, 'month').startOf('month').toDate(),
        toDate: moment().subtract(1, 'month').endOf('month').toDate()
    }
];