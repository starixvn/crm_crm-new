namespace CRM.BackgroundJob.Models.VoidingBetID
{
    using System;
    using CRM.Core.Extensions.XML;
    [Serializable]
    [XMLName("r")]

    public class MessageVoidBetID
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

        [XMLName("MsgTargetId")]
        public int MsgTargetId { get; set; }

        [XMLName("TargetId")]
        public int TargetId { get; set; }
    }
}
