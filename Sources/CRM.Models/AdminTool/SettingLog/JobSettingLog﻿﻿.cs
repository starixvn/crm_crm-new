
using System.Collections.Generic;
using System.Xml.Serialization;

namespace CRM.Models.AdminTool.SettingLog
{
    public class JobSettingLog
    {
        [XmlElement(ElementName = "UpdateConfig")]
        public List<JobSetting> updateConfigs { get; set; }
    }
}