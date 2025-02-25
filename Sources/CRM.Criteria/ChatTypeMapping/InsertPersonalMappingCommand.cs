namespace CRM.Criteria.ChatTypeMapping
{
    using CRM.Core.Models;

    public class InsertPersonalMappingCommand : BaseNonQueryCommand
    {
        public long BotId { get; set; }

        public string ConversationGroupName { get; set; }

        public int ChatTypeId { get; set; }

        public byte? IsTest { get; set; }

        public int RecipientTypeId { get; set; }

        public string HeadlineIds { get; set; }

        public int RecipientId { get; set; }

        public int ChannelId { get; set; }

        public string Username { get; set; }

        public string ConversationId { get; set; }


        public string IgnoredNotificationTypeList { get; set; }

        public int LanguageId { get; set; }

        public string Remark { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ChatBot_ChatTypeMapping_Ins";

        private bool IsValidStringProps() => !string.IsNullOrWhiteSpace(ConversationGroupName) &&
            !string.IsNullOrWhiteSpace(ConversationId);

        private bool isValidIntProps() => BotId > 0 &&
            ChatTypeId > 0 &&
            RecipientTypeId > 0 &&
            RecipientId > 0;

        public override bool IsValid() => IsValidStringProps() &&
            isValidIntProps() &&
            UserId > 0 &&
            LanguageId > 0;
    }
}