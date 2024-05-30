namespace CRM.BackgroundJob.Models.MessageNotificationCenter
{
    public class MessageBotInfo
    {
        public string ChatGroupID { get; set; }

        public int MatchID { get; set; }

        public string MsgType { get; set; }

        public string Content { get; set; }
    }
}