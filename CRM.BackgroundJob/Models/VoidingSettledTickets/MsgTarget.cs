namespace CRM.BackgroundJob.Models.VoidingSettledTickets
{
    using System;
    using CRM.Core.Extensions.XML;

    [Serializable]
    [XMLName("r")]
    public class MsgTarget
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }

        [XMLName("MsgTargetId")]
        public string MsgTargetId { get; set; }
    }
}