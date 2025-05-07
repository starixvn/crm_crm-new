using System;
using CRM.Models;

namespace CRM.Criteria.ManageSMAFeedback
{
    public class EditSmaFeedbackCommand : BaseNonQueryCommand
    {
        public int CustID { get; set; }

        public DateTime CreatedDate { get; set; }

        public int FunctionID { get; set; }

        public int ReviewStatusID { get; set; }

        public string Comment { get; set; }

        public string Discussion { get; set; }

        public override string GetSettingKey() => "Acc_CRM_SMAFeedbackInfoUpd";

        public override bool IsValid() => true;
    }
}
