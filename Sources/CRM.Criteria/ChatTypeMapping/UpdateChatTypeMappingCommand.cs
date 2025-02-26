namespace CRM.Criteria.ChatTypeMapping
{
    using CRM.Core.Models;

    public class UpdateChatTypeMappingCommand : BaseNonQueryCommand
    {
        public int ConversationGroupId { get; set; }

        public long BotId { get; set; }

        public string ConversationGroupName { get; set; }

        public string Username { get; set; }

        public int RecipientTypeId { get; set; }

        public byte? IsTest { get; set; }

        public string HeadlineIds { get; set; }

        public string RecipientIds { get; set; }

        public string ConversationId { get; set; }

        public int LanguageId { get; set; }

        public string Remark { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public string IgnoredNotificationTypeList { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ChatBot_ChatTypeMapping_Upd";

        private bool IsValidStringProps() => !string.IsNullOrWhiteSpace(ConversationGroupName) &&
            !string.IsNullOrWhiteSpace(RecipientIds) &&
            !string.IsNullOrWhiteSpace(ConversationId);

        private bool isValidIntProps() => BotId > 0 &&
            RecipientTypeId > 0 &&
            ConversationGroupId > 0;

        public override bool IsValid() => IsValidStringProps() &&
            isValidIntProps() &&
            UserId > 0 &&
            LanguageId > 0;
    }
}