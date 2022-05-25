namespace CRM.Core.Models
{
    public class CustomerSession
    {
        public int CustId { get; set; }
        public bool IsGuest { get; set; }
        public string Username { get; set; }
        public int SiteId { get; set; }
        public int LicenseeType { get; set; }
    }
}
