
namespace CRM.Criteria.AdminTool.LogSetting
{
    using System;
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetSettingLogCriteria : CriteriaBase
    {
        public short UserRole { get; } = Constants.UserRole;

        public string Username { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int ActionId { get; set; }

        [SpParam(Ignored = true)]
        public int PageIndex { get; set; }

        [SpParam(Ignored = true)]

        public int PageSize { get; set; }

        public override string GetSettingKey() => "Acc_CRM_LogActionSettingList";

        public override bool IsValid() => true;
    }
   
}
