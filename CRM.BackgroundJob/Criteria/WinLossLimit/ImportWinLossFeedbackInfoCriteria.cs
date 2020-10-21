namespace CRM.BackgroundJob.Criteria.WinLossLimit
{
    using Fanex.Data.Repository;

    public class ImportWinLossFeedbackInfoCriteria : CriteriaBase
    {
        public string xml { get; set; }
        public override string GetSettingKey() => "Acc_CRM_WinLimit_AutoFeedbackInfoIns_xtest";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(xml);
    }
}
