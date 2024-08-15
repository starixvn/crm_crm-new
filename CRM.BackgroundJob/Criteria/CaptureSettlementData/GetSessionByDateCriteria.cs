namespace CRM.BackgroundJob.Criteria.CaptureSettlementData
{
    using System;
    using CRM.BackgroundJob.Core.Criteria;
    using Fanex.Data.Repository;

    public class GetSessionByDateCriteria : SiteDbBaseCriteria
    {
        public string Environment { get; set; }

        public DateTime FDTime { get; set; }

        public override string GetSettingKey() => "MNC_SettlResultHist_GetSessionByDate";

        public override bool IsValid() => true;
    }
}