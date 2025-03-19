namespace CRM.Models.Customer;

using Enum;

public class CustomerPermissionInfo
{
    public SiteType? CustomerType { get; set; }
    public string SitePermission { get; set; }
}