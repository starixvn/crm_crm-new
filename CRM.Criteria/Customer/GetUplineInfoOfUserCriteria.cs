namespace CRM.Criteria.Customer
{
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetUplineInfoOfUserCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "custid")]
        public int CustId { get; set; }
        public short UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_CustomerGetUplineList";

        public override bool IsValid() => true;
    }
}
