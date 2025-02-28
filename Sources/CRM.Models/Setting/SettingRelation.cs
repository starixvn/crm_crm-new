namespace CRM.Models.Setting;

using System;

[Serializable]
public class SettingRelation
{
    public int Id { get; set; }

    public string Value { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsChild { get; set; }

    public bool IsActive { get; set; }
}