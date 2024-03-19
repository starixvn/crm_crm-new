namespace CRM.Models.Customer
{
    public class HeadlineCompanyService
    {
        public int HeadlineID { get; set; }
        public int CompanyServiceID { get; set; }
        public string CompanyServiceName { get; set; }
        public bool IsOffered { get; set; }
        public int CommunicationID { get; set; }
        public string CommunicationName { get; set; }
        public string CommunicationValue { get; set; }
    }
}