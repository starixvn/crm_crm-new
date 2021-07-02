namespace CRM.Models.Feedback.MultipleLogs
{
    using System.Xml.Serialization;

    [XmlType("Row")]
    public class VerifyRelatedCustomerResult
    {
        [XmlAttribute("CustId")]
        public int HeadlineId { get; set; }

        [XmlAttribute("RelatedCustId")]
        public int CustId { get; set; }

        public string Username { get; set; }

        [XmlIgnore]
        public byte ResultTypeId { get; set; }
    }
}