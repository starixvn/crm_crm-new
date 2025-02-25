namespace CRM.Models.Report.CategoriesSummaryReport
{
    using System.Collections.Generic;

    public class AllSetting
    {
        public IList<Common.Setting> YearRange { get; set; }
        public IList<Common.Setting> SiteTypes { get; set; }
        public IEnumerable<Setting.Setting> Categories { get; set; }
    }
}
