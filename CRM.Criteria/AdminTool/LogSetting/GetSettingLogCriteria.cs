
namespace CRM.Criteria.AdminTool.LogSetting
{
    using System;
    using Fanex.Data.Repository;

    public class GetSettingLogCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int ActionId { get; set; }

        public int PageIndex { get; set; }

        public int ItemsPerPage { get; set; }

        public override string GetSettingKey() => "Acc_CRM_LogActionSettingList";

        public override bool IsValid() => true;
    }
   
}
