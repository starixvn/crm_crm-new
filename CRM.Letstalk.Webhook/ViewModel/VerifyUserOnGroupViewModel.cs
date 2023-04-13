namespace CRM.Letstalk.Webhook.ViewModel
{
    using System.Collections.Generic;

    public class VerifyUserOnGroupViewModel
    {
        public int BotId { get; set; }
        public string ConversationGroupId { get; set; }
        public List<string> LetstalkIds { get; set; }
    }
}