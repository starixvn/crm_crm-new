namespace CRM.Criteria.InformHeadline
{
    using CRM.Core.Helpers;
    using CRM.Core.Models;
    using CRM.Models.InformHeadline;
    using Fanex.Data;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class EditContactInformsCommand : BaseNonQueryCommand
    {
        public int TitleId { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<EditInform> listInforms { get; set; } = new List<EditInform>();

        [SpParam(SqlParamName = "Content")]
        public string ContentXml
        {
            get
            {
                var stringBuilder = new StringBuilder();
                if (listInforms.Any())
                {
                    stringBuilder.Append("<Content>");
                    foreach (EditInform inform in listInforms)
                    {
                        stringBuilder.AppendFormat("<Headline HeadlineID='{0}' StatusID='{1}' Remark='{2}' Extension='{3}' ProductStatus='{4}'/>", 
                            inform.HeadlineId,
                            inform.InformHeadlineStatusId,
                            HtmlHelper.ReplaceBreaklineXml(inform.Remark), 
                            inform.Extension, 
                            inform.ProductStatus);
                    }
                    stringBuilder.Append("</Content>");
                }

                return stringBuilder.ToString();
            }
        }

        public override string GetSettingKey() => "Acc_CRM_InformHeadlineUpd";

        public override bool IsValid() => true;
    }
}
