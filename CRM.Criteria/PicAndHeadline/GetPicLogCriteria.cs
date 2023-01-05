namespace CRM.Criteria.PicAndHeadline
{
    using System;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetPicLogCriteria : CriteriaBase
    {
        public string PicName { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string EditBy { get; set; }

        public string LetstalkName { get; set; }

        [SpParam(Ignored = true)]
        public int PageIndex { get; set; }
        [SpParam(Ignored = true)]
        public int PageSize { get; set; }

        public int TotalRows { get; set; }

        public override string GetSettingKey() => "Acc_CRM_PicLogSel";

        public override bool IsValid() => DateTime.Compare(FromDate, ToDate) < 0;
    }
}