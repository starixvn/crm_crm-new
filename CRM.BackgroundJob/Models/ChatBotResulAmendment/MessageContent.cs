namespace CRM.BackgroundJob.Models.ChatBotResulAmendment
{
    using System;
    using CRM.Core.Extensions.XML;
    [Serializable]
    [XMLName("r")]

    public class MessageContent
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }

        [XMLName("RequestId")]
        public int RequestId { get; set; }

        [XMLName("Content_en")]
        public string Content_en { get; set; }

        [XMLName("Content_cs")]
        public string Content_cs { get; set; }

        [XMLName("Content_th")]
        public string Content_th { get; set; }

        [XMLName("Content_vn")]
        public string Content_vn { get; set; }

        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }
    }
}
