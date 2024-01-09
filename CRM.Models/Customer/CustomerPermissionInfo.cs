namespace CRM.Models.Customer
{
    using CRM.Core.Enumerables;

    public class CustomerPermissionInfo
    {
        public SiteType? CustomerType { get; set; }
        public string SitePermission { get; set; }
    }
}