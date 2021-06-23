namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetAllStatusCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "type")]
        public int ViewType { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey()
        {
            return "Acc_CRM_StatusList";
        }

        public override bool IsValid() => true;
    }
}