namespace CRM.Criteria.InformHeadline;

using CRM.Models.InformHeadline;
using Fanex.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Helpers;
using Models;

public class EditInformsCommand : BaseNonQueryCommand
{
    public int TitleId { get; set; }

    public string Title { get; set; }

    [SpParam(SqlParamName = "Currency")]
    public string Currencies { get; set; }

    [SpParam(SqlParamName = "Level")]
    public string Levels { get; set; }

    [SpParam(SqlParamName = "Site")]
    public string Sites { get; set; }

    public byte TypeAccount { get; set; }

    public bool ChangeFilter { get; set; }

    public int IsVip { get; set; }

    [SpParam(SqlParamName = "ExcludeIgnored")]
    public bool ExcludeIgnoredAccounts { get; set; }


    public int UserId { get; set; }

    public string IP { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<EditInform> Informs { get; set; } = new List<EditInform>();

    [SpParam(SqlParamName = "Content")]
    public string ContentXml
    {
        get
        {
            var xml = new StringBuilder();
            if (Informs.Any())
            {
                xml.Append("<Content>");
                foreach (var inform in Informs)
                {
                    xml.AppendFormat("<Headline HeadlineID='{0}' GroupID='{1}' StatusID='{2}' Remark='{3}' Extension='{4}' ProductStatus='{5}'/>",
                        inform.HeadlineId,
                        inform.GroupId,
                        inform.InformHeadlineStatusId,
                        HtmlHelper.ReplaceBreaklineXml(inform.Remark),
                        inform.Extension,
                        inform.ProductStatus);
                }
                xml.Append("</Content>");
            }

            return xml.ToString();
        }
    }

    public override string GetSettingKey() => "Acc_CRM_InformHeadlineSearchUpd";

    public override bool IsValid() => true;
}