namespace CRM.Models.PicAndHeadline;

using Extensions.XML;

[XMLName("CommunicationTool")]
public class PicCommunicationTool
{
    [XMLName("SettingID")]
    public int Type { get; set; }

    [XMLName("SettingValue")]
    public string Value { get; set; }
}