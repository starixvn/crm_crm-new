
namespace CRM.BackgroundJob.Models
{
    using CRM.Core.Extensions.XML;
    using System;

    [Serializable]
    [XMLName("r")]
    public class VoidingHisMessage
    {
        [XMLName("MsgID")]
        public int MessageId { get; set; }

        [XMLName("ReqID")]
        public int RequestId { get; set; }

        [XMLName("VoidingHistoryId")]
        public int VoidingHistoryId { get; set; }

        [XMLName("UsernameList")]
        public int UsernameList { get; set; }
    }
}
