namespace CRM.BackgroundJob.Models.AbnormalBet
{
    using System;
    using CRM.Core.Extensions.XML;
    [Serializable]
    [XMLName("r")]

    public class MessageAbnormelBet
    {
        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }

        [XMLName("MessageId")]
        public int MessageId { get; set; }

        [XMLName("Content_en")]
        public string Content_en { get; set; }

        [XMLName("Content_cs")]
        public string Content_cs { get; set; }

        [XMLName("Content_yn")]
        public string Content_yn { get; set; }
    }
}
