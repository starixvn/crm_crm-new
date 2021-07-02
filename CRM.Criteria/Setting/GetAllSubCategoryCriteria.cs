namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllSubCategoryCriteria : CriteriaBase
    {
        public int? MainCategoryId { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public byte Active { get; set; }

        public override string GetSettingKey() => "Acc_CRM_SubCategoryList";

        public override bool IsValid() => true;
    }
}