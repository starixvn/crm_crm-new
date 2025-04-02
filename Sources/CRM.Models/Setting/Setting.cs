namespace CRM.Models.Setting;

using System;
using System.Collections.Generic;
using System.Xml.Serialization;

[Serializable]
[XmlType("Setting")]
public class Setting
{
    public int Id { get; set; }

    public string Name { get; set; }

    [XmlAttribute("Id")]
    public int SettingId { get; set; }

    public string SettingName { get; set; }

    [XmlAttribute("Value")]
    public string SettingValue { get; set; }

    public string ExtraInfo { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public bool IsChild { get; set; }

    public int MainCategoryID { get; set; }

    public int SubCategoryId { get; set; }

    public int ParentID { get; set; }

    public string SettingSource { get; set; }

    public List<Setting> ChildSettings { get; set; } = [];

}