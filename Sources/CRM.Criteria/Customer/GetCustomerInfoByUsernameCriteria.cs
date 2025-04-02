namespace CRM.Criteria.Customer;

public class GetCustomerInfoByUsernameCriteria : BaseSitePermisionCriteria
{
    public string SearchInfo { get; set; }
    public bool IsGuest { get; set; }
    public int ErrCode { get; set; }
    public string ErrMsg { get; set; }
    public bool IsCheckPermission { get; set; } = true;

    public override string GetSettingKey() => "Acc_CRM_NewLeftPanel_CustomerSearch";

    public override bool IsValid() => true;
}