using CRM.Models;
using Fanex.Data.Repository;

namespace CRM.Criteria.Common
{
    public class WriteLogSPCommand : NonQueryCommand
    {
        public int UserID { get; set; }

        public int CustID { get; set; }

        public int ActionID { get; set; }

        public string OldValues { get; set; }

        public string NewValues { get; set; }

        public override string GetSettingKey() => "WriteLog_UserLog_crmUserLog_RunSP";

        public override bool IsValid() => true;
    }
}
