namespace CRM.Core.Services
{
    using System;
    using System.Configuration;

    public static class AppSetting
    {
        public static int TimeSpan => Convert.ToInt32(ConfigurationManager.AppSettings["timeSpan"]);
    }
}
