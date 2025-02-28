
namespace CRM.Models;

using System;
using System.Xml.Serialization;

[Serializable]
public class BaseSetting
{
    [XmlAttribute("Id")]
    public int Id { get; set; }

    [XmlAttribute("Name")]
    public string Name { get; set; }
}