namespace CRM.Criteria.PicAndHeadline;

using CRM.Models.PicAndHeadline;
using Extensions.XML;
using Fanex.Data;
using Models;
using System.Collections.Generic;
using System.Linq;

public class EditPicCriteria : BaseNonQueryCommand
{
    public int PicType { get; set; }
    public int PicId { get; set; }

    public string PicName { get; set; }

    public int Role { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<PicCommunicationTool> PicCommunicationTools { get; set; }

    public string CommunicationTools => PicCommunicationTools.ToXML("ROOT").ToString();

    public string Language { get; set; }

    public int Country { get; set; }

    public string Remark { get; set; }

    public int UserId { get; set; }

    public string LoginIP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_PicUpd";

    public override bool IsValid()
    {
        return PicId > 0 && PicName.Length > 0 && Role > 0 && PicCommunicationTools.Any();
    }
}