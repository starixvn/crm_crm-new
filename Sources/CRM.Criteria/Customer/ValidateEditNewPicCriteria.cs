namespace CRM.Criteria.Customer
{
    using System.Collections.Generic;
    using CRM.Core.Extensions.XML;
    using CRM.Models.PicAndHeadline;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class ValidateEditNewPicCriteria : NonQueryCommand
    {
        public int PicId { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<PicCommunicationTool> PicCommunicationTools { get; set; }

        public string CommunicationTools => XMLIO.ToXML(PicCommunicationTools, "ROOT").ToString();

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_PicUpdValidation";

        public override bool IsValid() => PicId > 0;
    }
}
