namespace CRM.Models.Customer;

using Enumerables;

public class CustomerPermissionInfo
{
    public SiteType? CustomerType { get; set; }
    public string SitePermission { get; set; }
}