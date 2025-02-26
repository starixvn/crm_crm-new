namespace CRM.Models.Customer
{
    public class CompanyService
    {
        public int CompanyServiceID { get; set; }
        public bool IsOffered { get; set; }
        public int CommunicationID { get; set; }
        public string CommunicationValue { get; set; }
    }
}