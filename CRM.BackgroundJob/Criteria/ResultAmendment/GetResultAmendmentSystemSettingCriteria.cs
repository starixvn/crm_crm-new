namespace CRM.BackgroundJob.Criteria.ResultAmendment
{
    using Fanex.Data.Repository;
    public class GetResultAmendmentSystemSettingCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Acc_CRM_AmendmentNoti_SystemSettingSel";

        public override bool IsValid() => true;
    }
}
