namespace CRM.BackgroundJob.Criteria.RefundSettledTicket
{
    using Fanex.Data.Repository;

    public class GetRefundSystemSettingCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Acc_CRM_AutoFB_SystemSetting_Sel";

        public override bool IsValid() => true;
    }
}
