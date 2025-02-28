namespace CRM.Models.Feedback.MultipleLogs;

using System;
using System.Xml.Serialization;
using Extensions.XML;

[Serializable]
[XMLName("Row")]
public class VerifyRelatedCustomerResult
{
    [XMLName("CustId")]
    public int HeadlineId { get; set; }

    [XMLName("RelatedCustId")]
    public int CustId { get; set; }

    public string Username { get; set; }

    [XmlIgnore]
    public byte ResultTypeId { get; set; }

    [XmlIgnore]
    public bool IsAuthorized { get; set; }
}