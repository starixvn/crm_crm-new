namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetAllStatusCriteria : CriteriaBase
    {
        public int ViewType { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_StatusList";
        }

        public override bool IsValid() => true;
    }
}