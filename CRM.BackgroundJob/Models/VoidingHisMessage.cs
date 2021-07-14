
namespace CRM.BackgroundJob.Models
{
    using CRM.Core.Extensions.XML;
    using System;

    [Serializable]
    [XMLName("r")]
    public class VoidingHisMessage
    {
        [XMLName("MessageID")]
        public int MessageId { get; set; }
        [XMLName("RequestID")]
        public int RequestId { get; set; }
        [XMLName("VoidingHistoryID")]
        public int VoidingHistoryId { get; set; }
        [XMLName("UsernameList")]
        public string UsernameList { get; set; }
    }
}