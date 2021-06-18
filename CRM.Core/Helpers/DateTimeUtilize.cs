namespace CRM.Core.Helpers
{
    using CRM.Core.Services;
    using System;

    public class DateTimeUtilize
    {
        private TimeSpan _timeSpan;

        public DateTimeUtilize()
        {
            _timeSpan = new TimeSpan(AppSetting.TimeSpan, 0, 0);
        }

        public static string ChangeTimeZoneToClient(DateTime time)
        {
            var timeSpan = new DateTimeUtilize();
            return time.Add(timeSpan._timeSpan).ToString("MMM dd, yyyy hh:mm tt");
        }
    }
}
