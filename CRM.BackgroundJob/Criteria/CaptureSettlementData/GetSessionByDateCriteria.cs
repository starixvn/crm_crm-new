namespace CRM.BackgroundJob.Criteria.CaptureSettlementData
{
    using System;
    using Fanex.Data.Repository;

    public class GetSessionByDateCriteria : CriteriaBase
    {
        public string Environment { get; set; }

        public DateTime FDTime { get; set; }

        public int SiteDBGroupID { get; set; }

        public override string GetSettingKey() => "MNC_SettlResultHist_GetSessionByDate";

        public override bool IsValid() => true;
    }
}
