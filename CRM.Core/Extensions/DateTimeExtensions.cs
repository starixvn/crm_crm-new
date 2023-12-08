namespace CRM.Core
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    [SuppressMessage("Major Code Smell", "S109:Magic numbers should not be used", Justification = "Pending")]
    public static class DateTimeExtensions
    {
        public const string ShortDateFormatDash = "MMM_dd_yyyy";
        public const string ShortDateFormat = "MMM dd, yyyy";
        public const string ShortDateFormatNoDash = "MMddyyyy";
        public const string ShortDateTimeFormat = "MMM dd, yyyy hh:mm tt";
        public const string LongDateTimeFormat = "MMM dd, yyyy hh:mm:ss tt";
        public const string MonthYear = "MMM yyyy";

        public static DateTime ToStartOfDay(this DateTime date) => 
            new DateTimeOffset(date.Year, date.Month, date.Day,0,0,0,TimeSpan.Zero).DateTime;

        public static DateTime ToEndOfDay(this DateTime date) => 
            new DateTimeOffset(date.Year, date.Month, date.Day, 23, 59, 59, TimeSpan.Zero).DateTime;

        public static DateTime FirstDayOfWeek(this DateTime date)
        {
            int diff = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
            return date.AddDays(-1 * diff).Date;
        }

        public static DateTime LastDayOfWeek(this DateTime date) => date.FirstDayOfWeek().AddDays(6);

        public static DateTime FirstDayOfMonth(this DateTime date) => 
            new DateTimeOffset(date.Year, date.Month, 1, 0, 0, 0, TimeSpan.Zero).DateTime;

        public static DateTime LastDayOfMonth(this DateTime date) => date.FirstDayOfMonth().AddMonths(1).AddDays(-1);

        public static string ToShortDateFormat(this DateTime date) => date.ToString(ShortDateFormat);
        public static string ToShortDateFormatDash(this DateTime date) => date.ToString(ShortDateFormatDash);
        public static string ToShortDateFormatNoDash(this DateTime date) => date.ToString(ShortDateFormatNoDash);

        public static string ToShortDateTimeFormat(this DateTime date) => date.ToString(ShortDateTimeFormat);

        public static string ToLongDateTimeFormat(this DateTime date) => date.ToString(LongDateTimeFormat);

        public static string ToMonthYear(this DateTime date) => date.ToString(MonthYear);
    }
}