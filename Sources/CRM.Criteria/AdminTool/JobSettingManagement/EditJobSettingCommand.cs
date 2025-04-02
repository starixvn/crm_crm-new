namespace CRM.Criteria.AdminTool.JobSettingManagement;

using System.Collections.Generic;
using System.Linq;
using CRM.Models.AdminTool;
using Extensions.XML;
using Fanex.Data;
using Models;

public class EditJobSettingCommand : BaseNonQueryCommand
{
    [SpParam(Ignored = true)]
    public IEnumerable<JobSettingXML> Settings { get; set; }

    [SpParam(SqlParamName = "UpdateConfig")]
    public string UpdateConfig => Settings.Any() ? Settings.ToXML("ROOT").ToString() : string.Empty;
    public int UserId { get; set; }
    public string IP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_ConfigAutoFeedback_SettingUpd";

    public override bool IsValid() => !string.IsNullOrEmpty(UpdateConfig);
}