namespace CRM.Criteria.Report.LogStatistics
{
    using System;
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class LogStatisticsCriteria : CriteriaBase
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int ProductType { get; set; }

        public int CategoryType { get; set; }

        public short SiteType { get; set; }

        public string ProductId { get; set; }

        public string MainCategoryId { get; set; }

        public string CommunicationId { get; set; }
        public short LicenseeType { get; set; } = LicenseeTypeConstants.All;

        public override string GetSettingKey()
        {
            return "Acc_CRM_Rpt_DailyStatistics";
        }

        public override bool IsValid()
        {
            return ProductId != string.Empty &&
                    MainCategoryId != string.Empty &&
                    CommunicationId != string.Empty;
        }
    }
}