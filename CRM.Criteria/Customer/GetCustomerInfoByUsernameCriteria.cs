namespace CRM.Criteria.Customer
{
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using Fanex.Data.Repository;

    public class GetCustomerInfoByUsernameCriteria : CriteriaBase
    {
        public string Username { get; set; }
        public bool IsGuest { get; set; }
        public short UserRole { get; } = Constants.UserRole;
        public short LicenseeType { get; set; } = (short)SitePermission.Both;
        public int ErrCode { get; set; }
        public string ErrMsg { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CustomerSearch";

        public override bool IsValid() => true;
    }
}
