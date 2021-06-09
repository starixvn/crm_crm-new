namespace CRM.BackgroundJob.Models.ChatBotCTO
{
    using System;
    using global::CRM.Core.Extensions.XML;

    [Serializable]
    [XMLName("r")]
    public class TOReachInfor
    {
        [XMLName("LogId")]
        public long LogId { get; set; }

        [XMLName("CustId")]
        public int CustId { get; set; }

        [XMLName("MatchId")]
        public int MatchId { get; set; }
    }
}
