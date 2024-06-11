namespace CRM.BackgroundJob.Criteria.AutoFbResultAmendment
{
    using Fanex.Data.Repository;

    public class GetMsgInfoResultAmendmentCriteria : CriteriaBase
    {
        public int LastMsgTargetId { get; set; }

        public int BatchSize { get; set; }

        public override string GetSettingKey() => "Acc_CRM_AutoFB_ResultAmendment_GetMsgInfo";

        public override bool IsValid() => true;
    }
}
