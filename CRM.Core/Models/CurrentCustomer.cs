namespace CRM.Core.Models
{
    public class CurrentCustomer
    {
        public int CustId { get; set; }
        public string Name { get; set; }
        public bool IsGuest { get; set; }
    }
}
