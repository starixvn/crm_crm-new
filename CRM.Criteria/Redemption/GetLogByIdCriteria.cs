namespace CRM.Criteria.Redemption
{
    using Fanex.Data.Repository;

    public class GetLogByIdCriteria : CriteriaBase
    {
        public int Id { get; set; }

        public override string GetSettingKey() => "Acc_CRM_RedemptionSel";

        public override bool IsValid() => true;
    }
}
