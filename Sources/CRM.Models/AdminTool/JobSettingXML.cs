namespace CRM.Models.AdminTool;

using System;
using Extensions.XML;

[Serializable]
[XMLName("R")]
public class JobSettingXML
{
    [XMLName("ID")]
    public string ID { get; set; }

    [XMLName("SETTING")]
    public string SETTING { get; set; }

    [XMLName("VALUE")]
    public string VALUE { get; set; }

    [XMLName("SERVICENAME")]
    public string SERVICENAME { get; set; }
}