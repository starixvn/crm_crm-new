namespace CRM.Criteria.Common;

using Fanex.Data.Repository;

public class WriteLogSPCommand : NonQueryCommand
{
    public int UserID { get; set; }

    public string IP { get; set; }

    public int CustID { get; set; }

    public int ActionID { get; set; }

    public string OldValues { get; set; }

    public string NewValues { get; set; }

    public override string GetSettingKey() => "WriteLog_UserLog_crmUserLog_RunSP";

    public override bool IsValid() => true;
}