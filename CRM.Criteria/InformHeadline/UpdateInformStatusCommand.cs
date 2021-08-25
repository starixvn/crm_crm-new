namespace CRM.Criteria.InformHeadline
{
    using CRM.Core.Models;
    using CRM.Models.InformHeadline;
    using Fanex.Data;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    public class UpdateInformStatusCommand : BaseNonQueryCommand
    {
        public int TitleId { get; set; }

        public bool StatusType { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_InformTitleStatusUpd";

        public override bool IsValid() => TitleId > 0;
    }
}
