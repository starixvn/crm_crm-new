namespace CRM.Criteria.InformHeadline
{
    using CRM.Core.Models;
    using CRM.Models.InformHeadline;
    using Fanex.Data;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class UpdateContentInformsCommand : BaseNonQueryCommand
    {
        public int TitleId { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<UpdateInform> Informs { get; set; } = new List<UpdateInform>();

        [SpParam(SqlParamName = "Content")]
        public string ContentXml
        {
            get
            {
                var xml = new StringBuilder();
                if (Informs.Any())
                {
                    xml.Append("<Content>");
                    foreach (UpdateInform inform in Informs)
                    {
                        xml.AppendFormat("<Headline HeadlineID='{0}' StatusID='{1}' Remark='{2}' Extension='{3}' ProductStatus='{4}'/>", 
                            inform.HeadlineId, 
                            inform.InformHeadlineStatusId,
                            inform.Remark, 
                            inform.Extension, 
                            inform.ProductStatus);
                    }
                    xml.Append("</Content>");
                }

                return xml.ToString();
            }
        }

        public static string ReplaceBreaklineXml(string xml)
        {
            if (string.IsNullOrWhiteSpace(xml))
            {
                return xml;
            }
            string[] newLine = new[] { "\n", "\r", "\n\r", "\r\n" };
            for (int index = 0; index < newLine.Length; index++)
            {
                xml = xml.Replace(newLine[index], "&#13;");
            }
            return xml;
        }

        public override string GetSettingKey()
        {
            return "Acc_CRM_InformHeadlineUpd";
        }

        public override bool IsValid() => true;
    }
}
