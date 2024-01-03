namespace CRM.Criteria.NewRemark
{
    public class CustomerRemarkNewCheckCriteria : BaseSitePermisionCriteria
    {
        public string Username { get; set; }
        public bool IsGuest { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CustomerRemarkNewCheck";

        public override bool IsValid() => !string.IsNullOrEmpty(Username);
    }
}