namespace CRM.Models.PicAndHeadline;

using System.Xml.Serialization;

[XmlType("PIC")]
public class PicModel
{
    [XmlAttribute("PicID")]
    public int PicId { get; set; }

    [XmlAttribute("PicName")]
    public string PicName { get; set; }

    [XmlAttribute("Role")]
    public string Role { get; set; }

    [XmlAttribute("Order")]
    public int Order { get; set; }

    [XmlAttribute("RoleId")]
    public int RoleId { get; set; }

    [XmlAttribute("Letstalk")]
    public int Letstalk { get; set; }

    [XmlAttribute("Phone")]
    public int Phone { get; set; }

    [XmlAttribute("Skype")]
    public int Skype { get; set; }

    [XmlAttribute("WeChat")]
    public int WeChat { get; set; }

    [XmlAttribute("Line")]
    public int Line { get; set; }
}