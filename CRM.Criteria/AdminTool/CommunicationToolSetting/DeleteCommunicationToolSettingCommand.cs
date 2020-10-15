namespace CRM.Criteria.AdminTool.CommunicationToolSetting
{
    using CRM.Core.Models;

    public class DeleteCommunicationToolSettingCommand : BaseNonQueryCommand
    {
        public int UserId { get; set; }
        public string IP { get; set; }
        public int DefaultCommId { get; set; }

        public override string GetSettingKey() => "Acc_CRM_DefaultCommToolDel";

        public override bool IsValid() => true;
    }
}