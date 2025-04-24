namespace CRM.Models;

using Enum;

public class CurrentCustomer
{
    public int CustId { get; set; }
    public string Name { get; set; }
    public bool IsGuest { get; set; }
    public SiteType? CustType { get; set; }
    public string SiteLabel { get; set; }
}