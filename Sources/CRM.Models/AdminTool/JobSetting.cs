
namespace CRM.Models.AdminTool;

using System;
using System.Xml.Serialization;

[Serializable]
public class JobSetting
{
    [XmlAttribute("ID")]
    public int ID { get; set; }
    [XmlAttribute("SETTING")]
    public string SettingName { get; set; }
    [XmlAttribute("VALUE")]
    public string Value { get; set; }
    [XmlAttribute("SERVICENAME")]
    public string ServiceName { get; set; }
    public string DataType { get; set; }
}