namespace CRM.BackgroundJob.Models.AbnormalBet
{
    using CRM.Core.Extensions.XML;
    using System;

    [Serializable]
    [XMLName("r")]

    public class VoidedInfo
    {
        [XMLName("VoidingHistoryCollectionId")]
        public int VoidingHistoryCollectionId { get; set; }
        [XMLName("RequestId")]
        public int RequestId { get; set; }
        [XMLName("MessageId")]
        public int MessageId { get; set; }
        [XMLName("IssueTypeId")]
        public int IssueTypeId { get; set; }
        [XMLName("IsParlay")]
        public bool IsParlay { get; set; }
        [XMLName("RequestBy")]
        public string RequestBy { get; set; }
        [XMLName("DecidedBy")]
        public string DecidedBy { get; set; }
        [XMLName("VoidBy")]
        public string VoidBy { get; set; }
        [XMLName("MatchId")]
        public int MatchId { get; set; }
        [XMLName("TransIdList")]
        public string TransIdList { get; set; }
        [XMLName("OriginalTransId")]
        public string OriginalTransId { get; set; }
        [XMLName("UsernameList")]
        public string UsernameList { get; set; }
    }
}
