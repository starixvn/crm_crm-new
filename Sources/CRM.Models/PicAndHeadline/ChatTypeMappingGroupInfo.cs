
namespace CRM.Models.PicAndHeadline;

using System.Collections.Generic;
using System.Xml.Serialization;

public class ChatTypeMappingGroupInfo
{
    [XmlAttribute("Id")]
    public int Id { get; set; }
    [XmlAttribute("Name")]
    public string LetstalkName { get; set; }
    [XmlElement(ElementName = "ConversationGroup")]
    public ConversationGroup ConversationGroup { get; set; }
    [XmlElement("Bot")]
    public BaseBotModel Bot { get; set; }
    [XmlElement("Recipient")]
    public List<BaseModel> Recipients { get; set; }
    [XmlElement("ChatType")]
    public BaseModel ChatType { get; set; }
    [XmlElement("RecipientType")]
    public BaseModel RecipientType { get; set; }
}