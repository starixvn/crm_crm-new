namespace CRM.Criteria.Customer
{
    using Fanex.Data;
    using Models.Feedback.AddGuestFeedback;
    using System.Collections.Generic;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;

    public class UpdateOtherAccCommunicationInfoCommand : BaseNonQueryCommand
    {
        public int CustID { get; set; }
        public int UserID { get; set; }
        public string IP { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<NewCommunicationTool> OtherCommunicationTools { get; set; }
        public string NewCommunicationTools => XMLIO.ToXML(OtherCommunicationTools, "ROOT").ToString();

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_UpdOtherAccCommunicationInfo";

        public override bool IsValid() => UserID > 0 && !string.IsNullOrWhiteSpace(IP);
    }
}
