namespace CRM.Letstalk.Services.Models.SendAnnouncement
{
    using System.Collections.Generic;

    public class SendAnnouncementResult
    {
        public int AnnouncementId { get; set; }
        public string ConversationId { get; set; }
        public bool IsSuccessful { get; set; }
        public bool IsBotBlocked { get; set; }
        public bool IsOnlyRetryImage { get; set; }
        public List<string> ErrImages { get; set; } = new List<string>();
        public string ErrMsg { get; set; }
    }
}