namespace CRM.Criteria.PicAndHeadline
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Models.PicAndHeadline;
    using Fanex.Data;

    public class CreatePicCriteria : BaseNonQueryCommand
    {
        public int PicType { get; set; }

        public string PicName { get; set; }

        public int Role { get; set; }
        public string Language { get; set; }

        public int Country { get; set; }

        public string Remark { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<PicCommunicationTool> PicCommunicationTools { get; set; }

        public string CommunicationTools => XMLIO.ToXML(PicCommunicationTools, "ROOT").ToString();

        public override string GetSettingKey() => "Acc_CRM_PicIns";

        public override bool IsValid()
        {
            return PicType > 0 && PicName.Length > 0 && Role > 0 && PicCommunicationTools.Any();
        }
    }
}
