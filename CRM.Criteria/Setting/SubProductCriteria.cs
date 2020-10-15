namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class SubProductCriteria : CriteriaBase
    {
        public int ProductID { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_SubProductList";
        }

        public override bool IsValid() => true;
    }
}