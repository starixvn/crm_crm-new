namespace CRM.BackgroundJob.Models.RefundSettledTicket
{
    using System;
    using CRM.Core.Extensions.XML;
    [Serializable]
    [XMLName("r")]
    public class MessageRefundSettledTicket
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }

        [XMLName("MatchId")]
        public int MatchId { get; set; }

        [XMLName("Content_en")]
        public string Content_en { get; set; }

        [XMLName("Content_cs")]
        public string Content_cs { get; set; }

        [XMLName("Content_yn")]
        public string Content_yn { get; set; }
    }
}
