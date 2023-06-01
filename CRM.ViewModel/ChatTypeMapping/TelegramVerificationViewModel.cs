namespace CRM.ViewModels.ChatTypeMapping
{
    using System.Collections.Generic;
    using CRM.Models.ChatTypeMapping;

    public class TelegramVerificationViewModel
    {
        public long BotId { get; set; }

        public string GroupConversationId { get; set; }

        public List<string> ChatIdMembers { get; set; }
    }
}