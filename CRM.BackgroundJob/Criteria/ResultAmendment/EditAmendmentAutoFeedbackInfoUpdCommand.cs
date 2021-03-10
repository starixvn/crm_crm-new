using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.BackgroundJob.Criteria.ResultAmendment
{
    using Fanex.Data.Repository;
    public class EditAmendmentAutoFeedbackInfoUpdCommand : NonQueryCommand
    {
        public int LogID { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

        public override string GetSettingKey() => "Acc_CRM_AmendmentNoti_AutoFeedbackInfoUpd";

        public override bool IsValid() => LogID > 0 && !string.IsNullOrWhiteSpace(Status);
    }
}
