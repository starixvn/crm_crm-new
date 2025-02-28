namespace CRM.Criteria.Customer;

using CRM.Models.PicAndHeadline;
using Extensions.XML;
using Fanex.Data;
using Fanex.Data.Repository;
using System.Collections.Generic;

public class ValidateEditNewPicCriteria : NonQueryCommand
{
    public int PicId { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<PicCommunicationTool> PicCommunicationTools { get; set; }

    public string CommunicationTools => PicCommunicationTools.ToXML("ROOT").ToString();

    public override string GetSettingKey() => "Acc_CRM_NewAccDetail_PicUpdValidation";

    public override bool IsValid() => PicId > 0;
}