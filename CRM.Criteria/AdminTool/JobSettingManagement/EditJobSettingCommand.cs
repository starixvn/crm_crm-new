namespace CRM.Criteria.AdminTool.JobSettingManagement
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Models.AdminTool;
    using Fanex.Data;
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
}