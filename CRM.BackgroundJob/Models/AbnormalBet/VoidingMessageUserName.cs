namespace CRM.BackgroundJob.Models.AbnormalBet
{
    using CRM.Core.Extensions.XML;
    using System;

    [Serializable]
    [XMLName("r")]
    public class VoidingMessageUserName
    {
        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("RequestId")]
        public int RequestId { get; set; }
        [XMLName("UsernameList")]
        public string UsernameList { get; set; }
        [XMLName("CustIdList")]
        public string CustIdList { get; set; }
    }
}
