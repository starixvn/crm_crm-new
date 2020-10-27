namespace CRM.BackgroundJob.Criteria.WinLossLimit
{
    using Fanex.Data.Repository;
    public class GetListCustomerReachLimitCriteria : CriteriaBase
    {
        public int LastLogID { get; set; }
        public int BatchSize { get; set; }
        public override string GetSettingKey() => "Acc_CRM_CustWinLimitSel";

        public override bool IsValid() => LastLogID > 0 && BatchSize > 0;
    }
}
