namespace CRM.Models.PicAndHeadline;

using System.Collections.Generic;
using System.Xml.Serialization;

public class PicInfoLog : ChatTypeMappingGroupInfo
{
    public BaseModel Role { get; set; }

    public BaseModel Country { get; set; }

    [XmlElement(ElementName = "Language")]
    public List<BaseModel> Languages { get; set; }

    [XmlElement(ElementName = "PicType")]
    public List<BaseModel> PicTypes { get; set; }

    [XmlElement(ElementName = "CommunicationTool")]
    public List<SettingValue> CommunicationTools { get; set; }

    [XmlElement(ElementName = "DirectAccount")]
    public List<BaseModel> DirectAccounts { get; set; }

    [XmlElement(ElementName = "Headline")]
    public List<BaseModel> Headlines { get; set; }

    [XmlAttribute("IsActive")]
    public bool IsActive { get; set; }

    [XmlAttribute("PicName")]
    public string Name { get; set; }

    [XmlAttribute("Remark")]
    public string Remark { get; set; }
}