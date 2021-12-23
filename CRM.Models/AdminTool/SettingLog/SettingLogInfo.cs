namespace CRM.Models.AdminTool.SettingLog
{
    using CRM.Models.ActionLog;

    public class SettingLogInfo : ActionLogInfo
    {
        public int Id { get; set; }
        public string Entity { get; set; }
    }
}
