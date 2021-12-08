namespace CRM.Criteria.Dashboard
{
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetCommunicationLogsCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "CustId")]
        public int CustomerId { get; set; }

        public short UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_MainInformationCommunicationLogSel";

        public override bool IsValid() => true;
    }
}
