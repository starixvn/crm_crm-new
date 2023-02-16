namespace Fanex.CRM.BackgroundJob.Models
{
    using System;
    using global::CRM.Core.Extensions.XML;

    [Serializable]
    [XMLName("r")]
    public class VoidingMessage
    {
        [XMLName("VoidingHistoryCollectionId")]
         public int VoidingHistoryCollectionId { get; set; }
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("RequestId")]
        public int RequestId { get; set; }

        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }
    }
}