namespace CRM.Criteria.NewRemark
{
    using CRM.Core.Constants;
    using CRM.Core.Models;
    public class CustomerRemarkNewCheckCommand : BaseNonQueryCommand
    {
        public int UserRole { get; } = Constants.UserRole;
        public string Username { get; set; }
        public bool IsGuest { get; set; }
        public override string GetSettingKey() => "Acc_CRM_CustomerRemarkNewCheck";

        public override bool IsValid() => !string.IsNullOrEmpty(Username);
    }
}
