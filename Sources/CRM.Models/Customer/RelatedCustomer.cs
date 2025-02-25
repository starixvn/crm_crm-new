namespace CRM.Models.Customer
{
    public class RelatedCustomer
    {
        public int CustId { get; set; }
        public string Val { get; set; }
        public string Username { get; set; }
        public bool IsCredit { get; set; }
        public bool IsSiteActive { get; set; }
        public bool IsLicensee { get; set; }
    }
}