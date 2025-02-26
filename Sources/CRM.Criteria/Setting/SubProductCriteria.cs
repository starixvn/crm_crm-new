namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class SubProductCriteria : CriteriaBase
    {
        public int ProductId { get; set; }
        public byte Active { get; set; }
        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() =>  "Acc_CRM_SubProductList";

        public override bool IsValid() => true;
    }
}