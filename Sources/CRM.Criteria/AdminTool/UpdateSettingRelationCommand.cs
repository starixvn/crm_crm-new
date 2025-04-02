namespace CRM.Criteria.AdminTool;

using CRM.Models.Setting;
using Fanex.Data;
using Models;
using System.Collections.Generic;

public class UpdateSettingRelationCommand : BaseNonQueryCommand
{
    public int ParentId { get; set; }

    public string SettingName { get; set; }

    public string SettingId => GetSettingId();

    [SpParam(Ignored = true)]
    public List<SettingRelation> SubSettings { get; set; }

    public int UserId { get; set; }

    public string Ip { get; set; }

    public override string GetSettingKey() => "Acc_CRM_SettingRelationUpd";

    public override bool IsValid() => true;

    private string GetSettingId()
    {
        if (SubSettings == null)
        {
            return string.Empty;
        }

        var settingId = new List<string>();
        var subSettingLength = SubSettings.Count;
        for (var i = 0; i < subSettingLength; i++)
        {
            var subSetting = SubSettings[i];
            if (subSetting.IsChild)
            {
                settingId.Add($"{subSetting.Id}_{subSetting.DisplayOrder}");
            }
        }

        return string.Join("|", settingId);
    }
}