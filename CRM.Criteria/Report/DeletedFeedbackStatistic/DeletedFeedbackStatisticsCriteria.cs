namespace CRM.Criteria.Report.DeletedFeedbackStatisticsCriteria
{
    using System;
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;
    public class DeletedFeedbackStatisticsCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "CreatorName")]
        public string Handler { get; set; }

        [SpParam(SqlParamName = "DeletorName")]
        public string DeletedBy { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public override string GetSettingKey() => "Acc_CRM_Rpt_DeletedFeedbackStatistics";

        public override bool IsValid()
        {
            return FromDate <= ToDate && (ToDate - FromDate).Days <= Constants.DaysOfYear;
        }
    }
}
