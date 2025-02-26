namespace CRM.Criteria.NewRemark
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetLastFiveRemarksCriteria : CriteriaBase
    {
        public int UserRole { get; } = Constants.UserRole;
        public int CustId { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CustomerRemarkNewSel";

        public override bool IsValid() => true;
    }
}
