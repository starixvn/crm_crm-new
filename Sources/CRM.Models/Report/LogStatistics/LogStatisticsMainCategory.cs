namespace CRM.Models.Report.LogStatistics
{
    using System.Collections.Generic;
    public class LogStatisticsMainCategory : LogStatisticsBaseModel
    {

        public IEnumerable<LogStatisticsBaseModel> SubCategories { get; set; } = new List<LogStatisticsBaseModel>();
    }
}
