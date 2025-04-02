namespace CRM.Models;

using System;
using System.Xml.Serialization;

[Serializable]
public class BaseBotModel
{
    [XmlAttribute("Id")]
    public long Id { get; set; }

    [XmlAttribute("Name")]
    public string Name { get; set; }

    public int ChannelId { get; set; }
}