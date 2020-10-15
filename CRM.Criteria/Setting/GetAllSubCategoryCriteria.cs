namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetAllSubCategoryCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "MainCategoryID")]
        public int ParentId { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_SubCategoryList";

        public override bool IsValid() => true;
    }
}