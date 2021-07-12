
namespace CRM.BackgroundJob.Models
{
    using CRM.Core.Extensions.XML;
    using System;

    [Serializable]
    [XMLName("r")]
    public class VoidingHisMessage
    {
        [XMLName("MessageId")]
        public int MessageId { get; set; }

        [XMLName("RequestId")]
        public int RequestId { get; set; }

        [XMLName("VoidingHistoryId")]
        public int VoidingHistoryId { get; set; }

        [XMLName("UsernameList")]
        public string UsernameList { get; set; }
    }
}
