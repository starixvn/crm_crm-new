namespace CRM.BackgroundJob.Models
{
    using System;
    using CRM.Core.Extensions.XML;
    [Serializable]
    [XMLName("r")]

    public class MessageInfoID
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }

        [XMLName("BetTransId")]
        public string BetTransId { get; set; }

        [XMLName("ListBetTransId")]
        public string ListBetTransId { get; set; }

        [XMLName("Content_en")]
        public string Content_en { get; set; }

        [XMLName("Content_cs")]
        public string Content_cs { get; set; }

        [XMLName("Content_yn")]
        public string Content_yn { get; set; }

        [XMLName("MsgTargetId")]
        public int MsgTargetId { get; set; }

        [XMLName("TargetId")]
        public int TargetId { get; set; }

        [XMLName("MatchId")]
        public int MatchId { get; set; }

        [XMLName("CreatorName")]
        public string CreatorName { get; set; }
    }
}
