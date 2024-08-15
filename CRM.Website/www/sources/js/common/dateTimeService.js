import moment from 'moment';

const ShortDateFormat = 'MMM DD, YYYY';
const ShortDateFormatDash = 'MM/DD/YYYY';
const ShortDateTimeFormat = 'MMM DD, YYYY hh:mm A';
const LongDateTimeFormat = 'MMM DD, YYYY hh:mm:ss A';
const LongDateTime24HourFormat = 'YYYY-MM-DD HH:mm:ss';
const StartTimeRemarkPrefix = 'YYYYMMDD/hh:mmA';
const TimeFormat = 'hh:mm:ss A';

export default class DateTimeService {
    static startOfDay(date) {
        return moment(date).startOf('day');
    }

    static endOfDay(date) {
        return moment(date).endOf('day');
    }

    static yesterday(date) {
        return moment(date).add(-1, 'days');
    }

    static firstDayOfWeek(date) {
        return moment(date).startOf('week');
    }

    static lastDayOfWeek(date) {
        return moment(date).endOf('week');
    }

    static firstDayOfLastWeek(date) {
        return moment(date).subtract(1, 'weeks').startOf('week');
    }

    static LastDayOfLastWeek(date) {
        return moment(date).subtract(1, 'weeks').endOf('week');
    }

    static firstDayOfLastMonth(date) {
        return moment(date).subtract(1, 'months').startOf('months');
    }

    static lastDayOfLastMonth(date) {
        return moment(date).subtract(1, 'months').endOf('months');
    }

    static firstDayOfYear(date) {
        return moment(date).startOf('years');
    }

    static firstDayOfMonth(date) {
        return moment(date).startOf('month');
    }

    static lastDayOfMonth(date) {
        return moment(date).endOf('month');
    }

    static toClientDateTime(date) {
        date = moment(date, LongDateTimeFormat);
        return moment.utc(date).utcOffset(window.clientTimezone);
    }

    static toServerDateTime(date) {
        date = moment(date, LongDateTimeFormat);
        return moment.utc(date).utcOffset(window.serverTimezone);
    }

    static toShortDateFormat(date) {
        return moment(date).format(ShortDateFormat);
    }

    static toShortDateFormatDash(date) {
        return moment(date).format(ShortDateFormatDash);
    }

    static toShortDateTimeFormat(date) {
        return moment(date).format(ShortDateTimeFormat);
    }

    static toLongDateTimeFormat(date) {
        return moment(date).format(LongDateTimeFormat);
    }

    static toLongDateTime24HourFormat(date) {
        return moment(date).format(LongDateTime24HourFormat);
    }

    static toTimeFormat(date) {
        return moment(date).format(TimeFormat);
    }

    static toStartTimePrefix(date) {
        return moment(date).format(StartTimeRemarkPrefix);
    }
    
    static toDiffDays(date1, date2){
        return moment(date1).diff(moment(date2), 'days');
    }

    static firstMonthOfYear(date) {
        return moment(date).startOf('year');
    }

    static endMonthOfYear(date) {
        return moment(date).endOf('year');
    }
}