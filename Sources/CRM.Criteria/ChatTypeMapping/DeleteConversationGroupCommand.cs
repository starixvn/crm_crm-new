namespace CRM.Criteria.ChatTypeMapping
{
    using CRM.Core.Models;

    public class DeleteConversationGroupCommand : BaseNonQueryCommand
    {
        public int ConversationGroupId { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }
        public bool IsDeleted { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ChatBot_ConversationGroup_Del";

        public override bool IsValid() => ConversationGroupId > 0 && UserId > 0 && !string.IsNullOrWhiteSpace(LoginIP);
    }
}