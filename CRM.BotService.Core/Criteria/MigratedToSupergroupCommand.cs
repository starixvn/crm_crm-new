namespace CRM.BotService.Core.Criteria
{
    using CRM.Core.Models;

    public class MigratedToSupergroupCommand : BaseNonQueryCommand
    {
        public string FromConversationId { get; set; }

        public string ToConversationId { get; set; }

        public string UpdatedBy { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ChatBot_MigratedToSupergroup";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(FromConversationId)
            && !string.IsNullOrWhiteSpace(ToConversationId);
    }
}
