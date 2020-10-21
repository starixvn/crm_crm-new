namespace CRM.BackgroundJob.Criteria.WinLossLimit
{
    using Fanex.Data.Repository;
    public class GetListCustomerReachLimitCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Acc_CRM_CustWinLimitSel_xtest";

        public override bool IsValid() => true;
    }
}
