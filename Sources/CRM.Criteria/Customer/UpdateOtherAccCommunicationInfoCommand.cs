namespace CRM.Criteria.Customer;

using Extensions.XML;
using Fanex.Data;
using Models;
using Models.Feedback.AddGuestFeedback;
using System.Collections.Generic;

public class UpdateOtherAccCommunicationInfoCommand : BaseNonQueryCommand
{
    public int CustID { get; set; }
    public int UserID { get; set; }
    public string IP { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<NewCommunicationTool> OtherCommunicationTools { get; set; }

    public string NewCommunicationTools => OtherCommunicationTools.ToXML("ROOT").ToString();

    public override string GetSettingKey() => "Acc_CRM_NewAccDetail_UpdOtherAccCommunicationInfo";

    public override bool IsValid() => UserID > 0 && !string.IsNullOrWhiteSpace(IP);
}